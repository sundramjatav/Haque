import React, { useEffect, useState } from 'react';
import UploadFileInput from '../../../Components/UploadFileInput';
import SelectInput from '../../../Components/SelectInput';
import InputField from '../../../Components/InputField';
import BackButton from '../../../Components/BackButton';
import Button from '../../../Components/Button';
import Swal from 'sweetalert2';
import { addBanner } from '../../../Api/admin.api';
import convertToBase64 from '../../../utils/convertToBase64';
import Loader from '../../../Components/Loader';
import TextareaField from '../../../Components/TextareaField';

const AddBanner = () => {
  const requiredFields = ['title', 'description', 'status', 'file',];
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialData = {};
    requiredFields.forEach((field) => {
      initialData[field] = '';
    });
    setFormData(initialData);
  }, []);

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      if (files?.length > 0) {
        const base64 = await convertToBase64(files[0]);
        const mimeType = base64.split(';')[0].split(':')[1];
        setFormData((prev) => ({
          ...prev,
          [name]: base64,
          mimeType
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await addBanner(formData);
      if (response.success) {
        Swal.fire({
         icon: "success",
          text: response?.message,
          timer: 3000,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
        });
        handleReset();
      } else {
        Swal.fire({
          text: response.message,
          icon: 'error',
          timer: 3000,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add banner. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    const resetData = {};
    requiredFields.forEach((field) => {
      resetData[field] = '';
    });
    setFormData(resetData);
    setErrors({});
  };

  const renderField = (field) => {
    if (field.type === 'file') {
      return (
        <UploadFileInput
          key={field.name}
          label={field.label}
          name={field.name}
          onChange={handleChange}
          error={errors[field.name]}
          accept="image/*, image/png, image/jpeg, image/webp"
        />
      );
    }

    if (field.type === 'select') {
      const options = field.options.map((opt) =>
        typeof opt === 'object' ? opt : { label: opt, value: opt }
      );

      return (
        <div key={field.name}>
          <SelectInput
            label={field.label}
            name={field.name}
            options={options}
            value={formData[field.name]}
            onChange={handleChange}
          />
          {errors[field.name] && (
            <span className="text-red-500 text-xs">{errors[field.name]}</span>
          )}
        </div>
      );
    }

    if (field.name === 'description') {
      return (
        <div key={field.name} className="col-span-full">
          <TextareaField
            label={field.label}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            error={errors[field.name]}
            rows={4}
          />
        </div>
      );
    }

    return (
      <InputField
        key={field.name}
        {...field}
        value={formData[field.name] || ''}
        onChange={handleChange}
        error={errors[field.name]}
      />
    );
  };


  const fields = [
    { label: "Title*", name: "title" },
    { label: "Picture*", name: "file", type: "file" },
    {
      label: 'Banner Type*',
      name: 'type',
      type: 'select',
      options: [
        { label: 'User panel' , value: 'USER' },
        { label: 'Landing page' , value: 'LANDING' },
      ],
    },
    {
      label: 'Status*',
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: true },
        { label: 'Inactive', value: false },
      ],
    },
    { label: "Description*", name: "description" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <BackButton />
        <h1 className="text-lg font-medium">Add Banner</h1>
      </div>

      <section className="relative">
        <form
          onSubmit={handleSubmit}
          className="w-full bg-[#ffffff13] backdrop-blur-md shadow-md rounded-xl p-4 flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fields.map(renderField)}
          </div>
          <div className="flex items-center gap-2">
            <Button
              title="Cancel"
              className="px-8 py-2 text-sm border-white border rounded"
              type="reset"
              onClick={() =>
                setFormData({ title: '', description: '', status: '', file: null })
              }
            />
            <Button
              title={'Add Banner'}
              className="px-8 py-2 text-sm rounded bg-white border text-bg-color text-bg-white"
              type="submit"
              disabled={loading}
            />
          </div>

        </form>
      </section>
      {loading && (
        <div className="">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AddBanner;
