import React, { useState } from 'react';
import InputField from '../../../Components/InputField';
import TextareaField from '../../../Components/TextareaField';
import Button from '../../../Components/Button';
import Swal from 'sweetalert2';
import { getUserByUsername, liveTradeProfit } from '../../../Api/admin.api';
import Loader from '../../../Components/Loader';
import { id } from 'ethers';

const LiveAccountInvestment = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        walletAddress: '',
        amount: '',
        remark: '',
        id: '',
    });

    const [availableAmount , setAvailableAmount] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                username: formData.username,
                account: formData.account || formData.walletAddress,
                amount: formData.amount,
                remark: formData.remark,
            };
            const id = formData.id
            const response = await liveTradeProfit(id, payload);
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    text: response.message ||'Live Trade amount successfully!',
                    timer: 2000,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                });
                setFormData({
                    username: '',
                    walletAddress: '',
                    amount: '',
                    remark: '',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    text: response.message || 'Something went wrong!',
                    timer: 3000,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error('Error saving information:', error);
            Swal.fire({
                icon: 'error',
                text: 'Something went wrong while saving information.',
                timer: 3000,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!formData.username) {
            Swal.fire({
                icon: 'warning',
                title: 'Please enter a username',
                toast: true,
                timer: 2000,
                position: 'top-end',
                showConfirmButton: false,
            });
            return;
        }
        setLoading(true);
        try {

            const response = await getUserByUsername({ username: formData?.username });

            if (response && response?.data) {
                setFormData(prev => ({
                    ...prev,
                    username: response?.data?.username || formData?.username,
                    walletAddress: response?.data?.account || '',
                    id: response?.data?._id || '',
                }));
                setAvailableAmount(response?.data?.totalLivetrade || 0);
                Swal.fire({
                    icon: 'success',
                    text: response?.message || 'User data fetched successfully.',
                    toast: true,
                    timer: 3000,
                    position: 'top-end',
                    showConfirmButton: false,
                });
            } else {
                Swal.fire({
                    icon: 'info',
                    text: response?.message || 'No user found with this username.',
                    toast: true,
                    timer: 3000,
                    position: 'top-end',
                    showConfirmButton: false,
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Something went wrong while fetching user data',
                toast: true,
                timer: 3000,
                position: 'top-end',
                showConfirmButton: false,
                timerProgressBar: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="w-full bg-[#ffffff13] backdrop-blur-md shadow-md rounded-xl p-4 flex flex-col gap-5"
            >
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <InputField
                        placeholder="Enter Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <Button
                        title={loading ? 'Searching...' : 'Search Information'}
                        className="bg-bg-color text-white px-4 py-2 rounded"
                        type="button"
                        onClick={handleSearch}
                        disabled={loading}
                    />
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <InputField
                        placeholder="Enter Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        label={'Username*'}
                        disabled
                    />
                    <InputField
                        placeholder="User Wallet Address"
                        name="walletAddress"
                        value={formData.walletAddress}
                        label={'Wallet Address*'}
                        onChange={handleChange}
                        disabled
                    />
                </div>

                <p className="text-bg-color font-bold">
                    Fund (Available: ${availableAmount.toFixed(2)})
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <InputField
                        placeholder="Amount"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        label={'Amount*'}
                    />
                </div>

                <TextareaField
                    placeholder="Remark"
                    name="remark"
                    value={formData.remark}
                    onChange={handleChange}
                    rows={3}
                    label={'Remark (Optional)'}
                />

                <Button
                    title="Save Information"
                    className="w-full bg-bg-color text-white py-2 rounded"
                    type="submit"
                    disabled={loading}
                />
            </form>

            {loading && (
                <div>
                    <Loader />
                </div>
            )}
        </>
    );
};

export default LiveAccountInvestment;
