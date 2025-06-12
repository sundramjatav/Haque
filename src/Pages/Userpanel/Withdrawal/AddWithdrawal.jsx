import React, { useState } from 'react';
import UploadFileInput from '../../../Components/UploadFileInput';
import SelectInput from '../../../Components/SelectInput';
import InputField from '../../../Components/InputField';
import BackButton from '../../../Components/BackButton';
import Button from '../../../Components/Button';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import UsdtWithdrawal from '../../../Components/wallet/UsdtWithdrawal';
import Loader from '../../../Components/Loader';
import { setWithdrawalTransaction } from '../../../Api/user.api';


const AddWithdrawal = () => {
  const user = useSelector((state) => state.auth?.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);


  const fields = [
    { label: "Amount*", name: "amount" },
  ];


  const handleWithdrawPopup = async () => {
    if (amount > 10) {
      Swal.fire({
        icon: "error",
        text: "Minimum withdrawal $10 .",
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true

      });
    } else {
      try {
        setLoading(true);
        const res = await setWithdrawalTransaction({ amount: Number(amount) });
        if (res?.success) {
          Swal.fire({
            icon: "success",
            text: res?.message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          })
          setAmount(0);
        } else {
          Swal.fire({
            icon: "error",
            text: res?.message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          })
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "Something went wrong",
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        })
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    setAmount(0);
  }

  const renderField = (field) => {
    return (
      <InputField type='number'
        key={field.name}
        label={field.label}
        value={amount}
        name={field.name}
        onChange={(e) => setAmount(e.target.value)}
      />
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-5 ">
        <div className='flex items-center gap-3 '>
          <BackButton />
          <h1 className="text-lg font-medium ">Withdrawal</h1>
        </div>


        {/* <UsdtWithdrawal amount={amount} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> */}

        <section className="relative ">
          <div className="w-full bg-[#ffffff13] backdrop-blur-md shadow-md rounded-xl p-4 flex flex-col gap-5">
            <h1 className='text-2xl font-semibold'>Main Wallet: $ {user?.account?.totalIncome?.toFixed(3) || "0"}</h1>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              {fields.map(renderField)}
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <Button onClick={handleReset}
                title="Cancel"
                className="px-7 py-2 text-sm border-white border  rounded"
                type="reset"
              />
              <Button
                onClick={handleWithdrawPopup}
                title="Withdrawal"
                className="px-7 py-2 text-sm rounded bg-white border text-bg-color text-bg-white"
                type="submit"
              />
            </div>
          </div>
        </section>

      </div>
      {loading && (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AddWithdrawal