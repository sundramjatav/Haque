import React, { useEffect, useRef, useState } from 'react'
import  { AuroraHero } from '../../../Layouts/AuroraHero'
import InputField from '../../../Components/InputField'
import Button from '../../../Components/Button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Routers } from '../../../Routes/Routers'
import { MainContent } from '../../../Content/MainContent'
import { ethers } from 'ethers'
import { registerUserWithWallet } from '../../../Api/user.api'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../../Redux/Reducer/authReducer'

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = useLocation();
  const walletAddRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    walletAddress: "",
    referral: ""
  });

  const alreadyReferalCode = query?.search?.split('=')[1]

  const handleNavigate = () => {
    navigate(Routers.DASHBOARD);
  };
  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await registerUserWithWallet({
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
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please try again",
        timer: 3000,
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

  useEffect(() => {
    if (alreadyReferalCode) {
      setPayload((prev) => ({ ...prev, referral: alreadyReferalCode }));
    }
  }, [alreadyReferalCode]);
  return (
    <div>
      <div className='absolute top-0 left-0 w-full h-screen -z-10 '>
        <AuroraHero />
      </div>
      <div className='w-full h-screen relative z-50 bg-bg-color1/10 md:p-10'>
        <div className='flex md:justify-start justify-center items-center h-full'>
          <div className='bg-[#ffffff13] backdrop-blur-md rounded-xl p-4 flex flex-col gap-5 shadow-md w-[90%] sm:w-[400px]'>
            <div className='flex justify-center items-center rounded p-2'>
              <img src={MainContent.AppLogo} className='h-16' alt="" />
            </div>
            <h1 className='text-2xl text-center font-semibold text-text-white'>User Register</h1>
            <form className='flex flex-col gap-5'>
              {/* <InputField type='text' label="Full Name" placeholder="Enter your Fullname" onChange={(e) => setPayload({ ...payload, username: e.target.value })} />
              <InputField type='email' label="Email" placeholder="Enter your Email" onChange={(e) => setPayload({ ...payload, email: e.target.value })} />
              <InputField type="tel" label="Mobile No." placeholder="Enter your mobile number" onChange={(e) => setPayload({ ...payload, mobile: e.target.value })} /> */}
              <InputField type="text" label="Referral code" placeholder="Enter your Referral code" value={payload.referral} onChange={(e) => setPayload({ ...payload, referral: e.target.value })} />
              <div className='flex flex-col gap-2 text-text-white'>
                <Button type="submit" title={'Connect Wallet'} className="bg-bg-color text-text-white rounded-lg p-2 shadow-md" onClick={connectWallet} disabled={loading} />
                <p className='text-sm flex gap-2'>Already have an account ? <Link to={Routers.LOGIN} className='text-bg-color'> Sign in </Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register