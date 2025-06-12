import React from 'react';
import { FaGift } from 'react-icons/fa';
import img from "../../../assets/dashboard-removebg-preview.png"
const TopSection = ({ data, user }) => {

 const cards = [
  { title: 'Total Partners', value: `${Number(data?.totalPartners ?? 0)}`, img: 'https://img.icons8.com/3d-fluency/94/conference-call.png' },
  { title: 'Active Partners', value: `${Number(data?.activeUsers ?? 0)}`, img: 'https://img.icons8.com/3d-fluency/94/ok.png' },
  { title: 'Inactive Partners', value: `${Number(data?.inactiveUsers ?? 0)}`, img: 'https://img.icons8.com/3d-fluency/94/group--v3.png' },
  { title: 'Total Investment', value: `$ ${Number(data?.totalInvestment ?? 0).toFixed(3)}`, img: 'https://img.icons8.com/3d-fluency/94/investment.png' },
  { title: 'Today Investment', value: `$ ${Number(data?.todayInvestment ?? 0).toFixed(3)}`, img: 'https://img.icons8.com/3d-fluency/94/money.png' },
  { title: 'Total Trade Amount', value: `$ ${Number(data?.totalTradeAmount ?? 0).toFixed(3)}`, img: 'https://img.icons8.com/3d-fluency/94/combo-chart.png' },
  { title: 'Today Trade Amount', value: `$ ${Number(data?.todayTradeAmount ?? 0).toFixed(3)}`, img: 'https://img.icons8.com/3d-fluency/94/increase.png' },
  { title: 'Total Trade Profit', value: `$ ${Number(data?.totalTradeProfit ?? 0).toFixed(3)}`, img: 'https://img.icons8.com/3d-fluency/94/receive-cash.png' },
  { title: 'Today Trade Profit', value: `$ ${Number(data?.todayTradeProfit ?? 0).toFixed(3)}`, img: 'https://img.icons8.com/3d-fluency/94/money.png' },
  { title: 'Total Income', value: `$ ${Number(data?.totalIncome ?? 0).toFixed(3)}`, img: 'https://img.icons8.com/3d-fluency/94/sales-performance.png' },
  { title: 'Today Income', value: `$ ${Number(data?.todayIncome ?? 0).toFixed(3)}`, img: 'https://img.icons8.com/3d-fluency/94/money-transfer.png' },
  { title: 'Total Withdrawals', value: `$ ${Number(data?.totalWithdraw ?? 0).toFixed(3)}`, img: 'https://img.icons8.com/3d-fluency/94/money-bag.png' },
  { title: 'Today Withdrawals', value: `$ ${Number(data?.todayWithdraw ?? 0).toFixed(3)}`, img: 'https://img.icons8.com/isometric/50/card-in-use.png' }
];


  return (
    <div className=" text-white font-sans rounded-xl flex flex-col gap-4">
      <div className="bg-[#ffffff13] col-span-1  backdrop-blur-md p-4 rounded-xl flex flex-col md:flex-row items-center gap-10">
        <img src={img} className="h-60" alt="Welcome Banner" />
        <div>
          <h2 className="text-3xl font-semibold capitalize">
            <span className="text-white">Hello</span> {user?.name} 👋
          </h2>
          <p className="mt-2">
            Welcome aboard!<br />
            We're excited to have you join us.<br />
            Dive into your dashboard and start exploring today! <FaGift className="inline text-yellow-400" />
          </p>
          <p className="text-2xl font-bold mt-2">Rank Beginner</p>
        </div>
      </div>


      <div className='grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:col-span-2  gap-4'>
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-[#ffffff13] backdrop-blur-md p-4 rounded-xl flex justify-between items-center"
          >
            <div>
              <h4 className="text-sm">{card.title}</h4>
              <p className="text-xl font-semibold">{card.value}</p>
            </div>
            <div className="">
              <img src={card.img} className='h-16' alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSection;
