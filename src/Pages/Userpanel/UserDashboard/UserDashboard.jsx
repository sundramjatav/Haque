import React, { useEffect, useState } from 'react'
import TopSection from './TopSection'
import AboutMe from './AboutMe'
import Referrals from './Referrals'
import { useSelector } from 'react-redux'
import { getDashboardDetail } from '../../../Api/user.api'

const UserDashboard = () => {
   const user = useSelector((state) => state.auth?.user);
   const [data,setData] = useState([]);

   useEffect(() => {
     const fetchDashboardDetails = async () => {
       try {
        const res = await getDashboardDetail();
        if(res?.success){
          setData(res?.data);
        }
       } catch (error) {
         console.error('Error fetching dashboard details:', error);
       }
     }
     fetchDashboardDetails();
   }, []);
   {console.log(data)}
  return (
    <div className='flex flex-col gap-5'>
      <TopSection data={data} user={user}/>
      <AboutMe user={user}/>
      <Referrals/>
    </div>
  )
}

export default UserDashboard