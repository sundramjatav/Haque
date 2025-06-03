import React from 'react';
import { FaGift } from 'react-icons/fa';
import img from "../../../assets/dashboard-removebg-preview.png"
const TopSection = ({ data, user }) => {

  const cards = [
    { title: 'Total Partners', value: `${Number(data?.partners ?? 0)}`, img: 'https://img.icons8.com/3d-fluency/94/conference-call.png' },
    { title: 'Active Partners', value: `${Number(data?.partnerActive ?? 0)}`, img: 'https://img.icons8.com/3d-fluency/94/ok.png' },
    { title: 'Inactive Partners', value: `${Number(data?.partnerInactive ?? 0)}`, img: 'https://img.icons8.com/3d-fluency/94/group--v3.png' },
    { title: 'Total Trading Income', value: `$ ${Number(data?.totalTrading ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/receive-cash.png' },
    { title: 'Today Trading Income', value: `$ ${Number(data?.todayTrading ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/money.png' },
    { title: 'Total Level Income', value: `$ ${Number(data?.totalLevel ?? 0).toFixed(2)}`, img: 'https://cdn-icons-png.flaticon.com/512/10102/10102408.png' },
    { title: 'Today Level Income', value: `$ ${Number(data?.todayLevel ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/isometric/50/economic-improvement--v1.png' },
    { title: 'Total Global Achievers', value: `${Number(data?.totalGlobalAchiever ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/medal.png' },
    { title: 'Today Global Achievers', value: `${Number(data?.todayGlobalAchiever ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/prize.png' },
    { title: 'Total Matching Income', value: `$ ${Number(data?.totalMatching ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/combo-chart.png' },
    { title: 'Today Matching Income', value: `$ ${Number(data?.todayMatching ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/increase.png' },
    { title: 'Total Referrals Income', value: `$ ${Number(data?.totalReferral ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/group.png' },
    { title: 'Today Referrals Income', value: `$ ${Number(data?.todayReferral ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-plastilina/69/share--v1.png' },
    { title: 'Total Transactions', value: `$ ${Number(data?.totalTransaction ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/transaction.png' },
    { title: 'Today Transactions', value: `$ ${Number(data?.todayTransaction ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/exchange.png' },
    { title: 'Total Withdrawals', value: `$ ${Number(data?.totalWithdraw ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/money-bag.png' },
    { title: 'Today Withdrawals', value: `$ ${Number(data?.todayWithdraw ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/isometric/50/card-in-use.png' },
    { title: 'Total Income', value: `$ ${Number(data?.totalIncome ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/sales-performance.png' },
    { title: 'Today Income', value: `$ ${Number(data?.todayIncome ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/money-transfer.png' },
    { title: 'Today Live A/C Income', value: `$ ${Number(data?.todayLiveTrading ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/account-1.png' },
    { title: 'Total Live A/C Income', value: `$ ${Number(data?.totalLiveTrading ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/change-user.png' },
  ];

  return (
    <div className=" text-white font-sans rounded-xl flex flex-col gap-4">
      <div className="bg-[#ffffff13] col-span-1 backdrop-blur-md p-4 rounded-xl flex items-center gap-10">
        <img src={img} className="h-60" alt="Welcome Banner" />
        <div>
          <h2 className="text-3xl font-semibold capitalize">
            <span className="text-white">Hello</span> {user?.username} 👋
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
