import React, { useRef, useState } from 'react';
import InputField from '../../../Components/InputField';
import BackButton from '../../../Components/BackButton';
import Button from '../../../Components/Button';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import USDTPayment from '../../../Components/wallet/USDTPayment';
import { MainContent } from '../../../Content/MainContent';


const AddTopup = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth?.user);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [amount, setAmount] = useState(0);



  const addAmountHandler = () => {
    if (!amount) {
      Swal.fire({
        title: "Error",
        text: "Please enter an amount greater than 0",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
      return;
    }
    if (amount < 0) {
      Swal.fire({
        title: "Error",
        text: "Topup minimum 50$",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
      return;
    }
    setShowPaymentModal(true);
  };


  const fields = [
    { label: "Amount*", name: "amount" },
  ];

  const renderField = (field) => {
    return (
      <InputField
        value={amount}
        key={field.name}
        label={field.label}
        name={field.name}
        onChange={(e) => setAmount(e.target.value)}
      />
    );
  };

  return (
    <div className="flex flex-col gap-5 ">
      <div className='flex items-center gap-3 '>
        <BackButton />
        <h1 className="text-lg font-medium ">Add Topup</h1>
      </div>

      <section className="relative ">
        <div className="w-full bg-[#ffffff13] backdrop-blur-md shadow-md rounded-xl p-4 flex flex-col gap-5">
          <h1 className='text-2xl font-semibold'>Main Wallet: $ {user?.totalIncome?.toFixed(2) || "0"}</h1>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {fields.map(renderField)}
          </div>
          <div className="flex items-center flex-wrap gap-2">
            <Button onClick={() => setAmount(0)}
              title="Cancel"
              className="px-7 py-2 text-sm border-white border  rounded"
              type="reset"
            />
            <Button onClick={addAmountHandler}
              title="Add Amount"
              className="px-7 py-2 text-sm rounded bg-white border text-bg-color text-bg-white"
              type="submit"
            />
          </div>
        </div>
      </section>
      {showPaymentModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-text-white/10 p-3">
          <div className=" bg-bg-color1 rounded-lg shadow-lg p-4 max-w-sm w-full">
            <div className="flex flex-col gap-5 items-center">
              <h4 className="text-white text-2xl leading-8 font-bold">
                {MainContent.AppName}
              </h4>

              <USDTPayment
                amount={amount}
                onSuccess={() => setShowPaymentModal(false)}
                onFailure={() => setShowPaymentModal(false)}
              />
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default AddTopup