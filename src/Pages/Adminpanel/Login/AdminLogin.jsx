import React, { useState } from 'react';
import { AuroraHero } from '../../../Layouts/AuroraHero';
import InputField from '../../../Components/InputField';
import Button from '../../../Components/Button';
import { MainContent } from '../../../Content/MainContent';
import { loginAdmin } from '../../../Api/admin.api';
import Swal from 'sweetalert2';
import { loginSuccess } from '../../../Redux/Reducer/authReducer';
import { useDispatch } from 'react-redux';
import Navigate from '../../../Components/Navigate';
import { Routers } from '../../../Routes/Routers';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../Components/Loader';

function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ email: 'admin@gmail.com', password: 'Test@123' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await loginAdmin(formData);
            if (response?.success) {
                dispatch(loginSuccess({
                    token: response?.token,
                    role: response?.role,
                    user: response?.data,
                }));
                Swal.fire({
                    icon: "success",
                    text: response?.message,
                    timer: 3000,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timerProgressBar: true,
                }).then(() => {
                    navigate(Routers.ADMIN_DASHBOARD)
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    text: response?.message,
                    timer: 3000,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timerProgressBar: true,
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: response?.message || "Please try again",
                timer: 3000,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timerProgressBar: true,
            })
            console.error('API Error:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <div className='absolute top-0 left-0 w-full h-screen -z-10'>
                <AuroraHero />
            </div>
            <div className='w-full h-screen relative z-50 md:p-10 bg-bg-color1/10'>
                <div className='flex md:justify-start justify-center items-center h-full'>
                    <div className='bg-[#ffffff13] backdrop-blur-md rounded-xl p-4 flex flex-col gap-5 shadow-md w-[90%] sm:w-[400px]'>
                        <div className='flex justify-center items-center rounded p-2'>
                            <img src={MainContent.AppLogo} className='h-16' alt="App Logo" />
                        </div>
                        <h1 className='text-2xl text-center font-semibold text-text-white'>Admin Login</h1>
                        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                            <InputField
                                type='email'
                                name='email'
                                label="Email"
                                placeholder="Enter your Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <InputField
                                type="password"
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <div className='flex flex-col gap-2 text-text-white'>
                                <Button
                                    type="submit"
                                    title={'Login'}
                                    disabled={loading}
                                    className="bg-bg-color text-text-white rounded-lg p-2 shadow-md disabled:opacity-75"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {
                loading && (
                    <div>
                        <Loader />
                    </div>
                )
            }
        </div>
    );
}

export default AdminLogin;
