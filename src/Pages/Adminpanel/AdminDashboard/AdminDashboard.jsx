import React from 'react'
import TopCard from './TopCard'
import AllUsers from '../AllUsers/AllUsers'

const AdminDashboard = () => {
  return (
    <div className='flex flex-col gap-5'>
      <TopCard/>
      <AllUsers/>
    </div>
  )
}

export default AdminDashboard