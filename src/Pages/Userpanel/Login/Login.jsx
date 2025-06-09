import React, { useRef, useState } from 'react'
import { AuroraHero } from '../../../Layouts/AuroraHero'
import InputField from '../../../Components/InputField'
import Button from '../../../Components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { Routers } from '../../../Routes/Routers'
import { MainContent } from '../../../Content/MainContent'
import Swal from 'sweetalert2'
import { ethers } from 'ethers'
import { loginWithWallet } from '../../../Api/user.api'
import { loginSuccess } from '../../../Redux/Reducer/authReducer'
import { useDispatch } from 'react-redux'
import Loader from '../../../Components/Loader'

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    walletAddress: "",
  });
  const walletAddRef = useRef(null);
  const dispatch = useDispatch();

  const handleNavigate = () => {
    navigate(Routers.DASHBOARD);
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await loginWithWallet({
        ...payload,
        walletAddress: walletAddRef.current,
      });
      
      if (response?.success) {
        dispatch(loginSuccess({
          token: response?.token,
          role: response?.role,
          user: response?.user,
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
          handleNavigate();
        });
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
        icon: "error",
        text: "Please try again",
        timer: 3000,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
      })
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setLoading(true);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        walletAddRef.current = await signer.getAddress();
        setPayload({
          ...payload,
          walletAddress: walletAddRef.current,
        });
        handleSubmit();
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      } finally {
        setLoading(false);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please install MetaMask",
        timer: 3000,
      })
    }
  };
  return (
    <div>
      <div className='absolute top-0 left-0 w-full h-screen -z-10 '>
        <AuroraHero />
      </div>
      <div className='w-full h-screen relative z-50 md:p-10 bg-bg-color1/10'>
        <div className='flex md:justify-start justify-center items-center h-full'>
          <div className='bg-[#ffffff13] backdrop-blur-md rounded-xl p-4 flex flex-col gap-5 shadow-md w-[90%] sm:w-[400px]'>
            <div className='flex justify-center items-center rounded p-2'>
              <img src={MainContent.AppLogo} className='h-24' alt="" />
            </div>
            <h1 className='text-2xl text-center font-semibold text-text-white'> User Login </h1>
            <Button type="submit" title={'Login with wallet'} className="bg-bg-color text-text-white rounded-lg p-2 shadow-md" onClick={connectWallet} disabled={loading} />
            <p className='text-sm flex gap-2 text-white'>Don't have an account ? <Link to={Routers.REGISTER} className='text-bg-color'> Sign up </Link></p>
          </div>
        </div>
      </div>
      {loading && (
        <div>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Login