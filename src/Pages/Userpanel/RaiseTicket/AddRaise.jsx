import React, { useState } from 'react';
import InputField from '../../../Components/InputField';
import BackButton from '../../../Components/BackButton';
import Button from '../../../Components/Button';
import { raiseTicket } from '../../../Api/user.api';
import Swal from 'sweetalert2';
import Loader from '../../../Components/Loader';
const AddRaise = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);


  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await raiseTicket(formData);
      if (response?.success) {
        Swal.fire({
          icon: "success",
          text: response?.message,
          timer: 3000,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
        })
      } else {
        Swal.fire({
          icon: "error",
          text: response?.message || "Please try again",
          timer: 3000,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: "Failed to raise ticket",
        timer: 3000,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
      })
    } finally {
      setLoading(false);
      setFormData({
        message: "",
        subject: "",
      })
    }
  }
  const fields = [
    { label: "Issue*", name: "subject" },
    { label: "Message*", name: "message" },
  ];
  const renderField = (field) => {
    return (
      <InputField onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
        value={formData[field.name]}
        key={field.name}
        label={field.label}
        name={field.name}
      />
    );
  };
  return (
    <div className="flex flex-col gap-5 ">
      <div className='flex items-center gap-3 '>
        <BackButton />
        <h1 className="text-lg font-medium ">Add Raise Ticket</h1>
      </div>
      <section className="relative ">
        <div className="w-full bg-[#ffffff13] backdrop-blur-md shadow-md rounded-xl p-4 flex flex-col gap-5">
          <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
            {fields.map(renderField)}
          </div>
          <div className="flex items-center flex-wrap gap-2">
            <Button onClick={() => setFormData({ subject: "", message: "",})}
              title="Reset"
              className="px-7 py-2 text-sm border-white border  rounded"
              type="reset"
            />
            <Button onClick={handleSubmit}
              title="Submit"
              className="px-7 py-2 text-sm rounded bg-white border text-bg-color text-bg-white"
              type="submit"
            />
          </div>
        </div>
      </section>

      {loading && (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
};
export default AddRaise