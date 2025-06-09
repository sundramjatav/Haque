import React, { useEffect, useState } from 'react'
import BackButton from '../../../Components/BackButton';
import { TiTick } from 'react-icons/ti';
import CustomPlanCard from './CustomPlanCard';
import { MainContent } from '../../../Content/MainContent';
import USDTPayment from '../../../Components/wallet/USDTPayment';
import Button from '../../../Components/Button';
import InputField from '../../../Components/InputField';
import Swal from 'sweetalert2';
import { getPackages } from '../../../Api/user.api';
import Loader from '../../../Components/Loader';
import { HiCheck } from 'react-icons/hi';

const OurPlans = () => {
    const [loading, setLoading] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [amount, setAmount] = useState(0);
    const [minimumAmount, setMinimumAmount] = useState(0);
    const [maximumAmount, setMaximumAmount] = useState(0);
    const [showAmountForm, setShowAmountForm] = useState(false);
    const [packages, setPackages] = useState([]);
    const [packageId, setPackageId] = useState('');
    const plan = [
        {
            features: [
                "Daily ROI between 1.15% and 1.5%",
                "Profit withdrawal anytime",
                "Principal withdrawal anytime",
            ]
        },
        {
            features: [
                "Daily ROI between 1.65% and 2.5%",
                "Profit withdrawal anytime",
                "Principal withdrawal after 45 days",
            ]
        },
        {
            features: [
                "Daily ROI between 2.65% and 3.5%",
                "Profit withdrawal anytime",
                "Principal withdrawal after 90 days",
            ]
        }
    ];

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setLoading(true);
                const response = await getPackages();
                setPackages(response?.Plans);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchPackages();
    }, []);

    const addAmountHandler = () => {
        const numericAmount = parseFloat(amount);
        // if (!numericAmount || numericAmount <= 0) {
        //     Swal.fire({
        //         text: "Please enter an amount greater than 0",
        //         timer: 2000,
        //         showConfirmButton: false,
        //         toast: true,
        //         position: "top-end",
        //     });
        //     return;
        // }

        // if (numericAmount < minimumAmount) {
        //     Swal.fire({
        //         icon: "error",
        //         text: `Topup minimum $${minimumAmount} for this plan`,
        //         timer: 2000,
        //         showConfirmButton: false,
        //         toast: true,
        //         position: "top-end",
        //     });
        //     return;
        // }

        // if (maximumAmount !== null && numericAmount > maximumAmount) {
        //     Swal.fire({
        //         icon: "error",
        //         text: `Topup maximum $${maximumAmount} for this plan`,
        //         timer: 2000,
        //         showConfirmButton: false,
        //         toast: true,
        //         position: "top-end",
        //     });
        //     return;
        // }

        setShowPaymentModal(true);
    };

    const fields = [{ label: "Amount*", name: "amount" }];
    const renderField = (field) => (
        <InputField
            className="text-xl"
            type="number"
            value={amount}
            key={field.name}
            label={field.label}
            name={field.name}
            onChange={(e) => setAmount(e.target.value)}
        />
    );

    return (
        <>
            {loading && <Loader />}
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                    <BackButton />
                    <h1 className="text-lg font-medium">All Plan</h1>
                </div>
                <h1 className="text-xl font-medium text-center">Choose Your Perfect Plan</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4 mx-auto">
                    {packages?.map((el, index) => (
                        <div
                            key={index}
                            className="relative w-full p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-md shadow-lg border border-white/20 text-center flex flex-col items-center gap-4 sm:gap-6"
                        >
                            <h2 className="text-lg font-bold uppercase tracking-wider text-white">
                                {el?.name?.replace("_", " ")}
                            </h2>

                            <h1 className="text-3xl font-bold text-white">
                                <p className="font-semibold text-white">
                                    {el?.minROI} - {el?.maxROI} %
                                </p>
                            </h1>

                            <div className="w-full border-t border-white/20" />

                            <div className="text-sm text-white/70">
                                <p>Investment Amount</p>
                                <p className="font-semibold text-white">minimum $20</p>
                            </div>

                            <button
                                onClick={() => {
                                    setShowAmountForm(true);
                                    setMinimumAmount(el?.minAmount || 20);
                                    setAmount(0);
                                    const max = Number(el?.maxAmount);
                                    setMaximumAmount(isNaN(max) ? null : max);
                                    setPackageId(el?._id);
                                }}
                                className="bg-bg-color text-white font-semibold py-2 px-6 rounded-lg mt-2 hover:bg-bg-color/70 transition duration-300"
                            >
                                Choose Plan
                            </button>

                            <div className="w-full border-t border-white/20" />

                            <p className="text-xs uppercase text-white/60 tracking-wide">All features options</p>
                            <div className="flex flex-col gap-2 text-sm w-full">
                                {plan[index]?.features?.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 text-white justify-center">
                                        <HiCheck className="text-purple-400" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {showAmountForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/30 backdrop-blur-sm">
                        <section className="relative">
                            <div className="w-full px-5 bg-bg-color/50 backdrop-blur-md shadow-md rounded-xl p-4 flex flex-col gap-5">
                                <h1>
                                    Invest Amount
                                </h1>
                                <div>{fields.map(renderField)}</div>
                                <div className="flex items-center flex-wrap gap-2">
                                    <Button
                                        onClick={() => {
                                            setAmount(0);
                                            setShowAmountForm(false);
                                        }}
                                        title="Cancel"
                                        className="px-7 py-2 text-sm border-white border rounded"
                                        type="reset"
                                    />
                                    <Button
                                        onClick={addAmountHandler}
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
                        <div className="bg-bg-color1 rounded-lg shadow-lg p-4 max-w-sm w-full">
                            <div className="flex flex-col gap-5 items-center">
                                <h4 className="text-white text-2xl leading-8 font-bold">
                                    {MainContent.AppName}
                                </h4>

                                <USDTPayment
                                    amount={amount}
                                    packageId={packageId}
                                    onSuccess={() => {
                                        setShowPaymentModal(false);
                                        setShowAmountForm(false);
                                    }}
                                    onFailure={() => {
                                        setShowPaymentModal(false);
                                        setShowAmountForm(false);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default OurPlans;
