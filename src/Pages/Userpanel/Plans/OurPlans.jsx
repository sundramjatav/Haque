import React, { useEffect, useState } from 'react'
import BackButton from '../../../Components/BackButton';
import { AllPlansContent } from '../../../Content/dummy/AllPlanContent';
import TextWithIcon from '../../../Components/TextWithIcon';
import { TiTick } from 'react-icons/ti';
import { BiNoEntry } from 'react-icons/bi';
import { RxCrossCircled } from 'react-icons/rx';
import CustomPlanCard from './CustomPlanCard';
import { MainContent } from '../../../Content/MainContent';
import USDTPayment from '../../../Components/wallet/USDTPayment';
import Button from '../../../Components/Button';
import InputField from '../../../Components/InputField';
import Swal from 'sweetalert2';
import { getPackages } from '../../../Api/user.api';
import Loader from '../../../Components/Loader';

const OurPlans = () => {
    const [loading, setLoading] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [amount, setAmount] = useState(0);
    const [minimumAmount, setMinimumAmount] = useState(0);
    const [maximumAmount, setMaximumAmount] = useState(0);
    const [showAmountForm, setShowAmountForm] = useState(false);
    const [packages, setPackages] = useState([]);
    const [packageId, setPackageId] = useState('');



    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setLoading(true);
                const response = await getPackages();
                if (response?.success) {
                    setPackages(response?.data);
                } else {
                    Swal.fire({
                        icon: "error",
                        text: response?.message,
                        timer: 3000,
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timerProgressBar: true,
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    text: response?.message,
                    timer: 3000,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timerProgressBar: true,
                });
            } finally {
                setLoading(false);
            }
        }
        fetchPackages();
    }, []);

    const addAmountHandler = () => {
        const numericAmount = parseFloat(amount);

        if (!numericAmount || numericAmount <= 0) {
            Swal.fire({
                text: "Please enter an amount greater than 0",
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: "top-end",
            });
            return;
        }

        if (numericAmount < minimumAmount) {
            Swal.fire({
                icon: "error",
                text: `Topup minimum $${minimumAmount} for this plan`,
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: "top-end",
            });
            return;
        }

        if (maximumAmount !== null && numericAmount > maximumAmount) {
            Swal.fire({
                icon: "error",
                text: `Topup maximum $${maximumAmount} for this plan`,
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
                className='text-xl'
                type='number'
                value={amount}
                key={field.name}
                label={field.label}
                name={field.name}
                onChange={(e) => setAmount(e.target.value)}
            />
        );
    };

    return (
        <>
        {loading && (
            <Loader />
        )}
        <div className="flex flex-col gap-5">
            <div className='flex items-center gap-3 '>
                <BackButton />
                <h1 className="text-lg font-medium ">Our Plan</h1>
            </div>
            <h1 className="text-xl font-medium text-center ">Choose Your Perfect Plan</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl px-4 mx-auto">

                {packages?.map((el, index) => (
                    <section key={index} className="h-full">
                        <CustomPlanCard
                            data={el}
                            onChoose={() => {
                                setShowAmountForm(true); setMinimumAmount(el?.minAmount); setAmount(0); setMaximumAmount(el?.maxAmount); setPackageId(el?._id);
                                const max = Number(el?.maxAmount);
                                setMaximumAmount(isNaN(max) ? null : max);
                            }}
                        />
                    </section>
                ))}
            </div>
            {showAmountForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center  p-3 bg-black/30 backdrop-blur-sm">
                    <section className="relative">
                        <div className="w-full px-5 bg-bg-color/50 backdrop-blur-md shadow-md rounded-xl p-4 flex flex-col gap-5">
                        <h1>Invest Amount (`${minimumAmount} - {maximumAmount == 100000000000000000 ? `${minimumAmount}+` : maximumAmount}`)</h1>
                            <div >
                                {fields.map(renderField)}
                            </div>
                            <div className="flex items-center flex-wrap gap-2">
                                <Button onClick={() => { setAmount(0); setShowAmountForm(false) }}
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
                </div>
            )}

            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-text-white/10 p-3">
                    <div className=" bg-bg-color1 rounded-lg shadow-lg p-4 max-w-sm w-full">
                        <div className="flex flex-col gap-5 items-center">
                            <h4 className="text-white text-2xl leading-8 font-bold">
                                {MainContent.AppName}
                            </h4>

                            <USDTPayment
                                amount={amount}
                                packageId={packageId}
                                onSuccess={() => { setShowPaymentModal(false); setShowAmountForm(false) }}
                                onFailure={() => { setShowPaymentModal(false); setShowAmountForm(false) }}
                            />
                        </div>
                    </div>
                </div>
            )}


        </div>
        </>
    )
}

export default OurPlans