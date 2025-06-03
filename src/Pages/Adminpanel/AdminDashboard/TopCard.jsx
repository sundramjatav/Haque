import React, { useEffect, useState } from 'react';
import { totalIncomeCount } from '../../../Api/admin.api';

const TopCard = () => {
  const [data, setData] = useState(null);

  const fetchTotalIncomeCountData = async () => {
    const response = await totalIncomeCount();
    if (response.success) {
      setData(response.data);
    }
  };

  useEffect(() => {
    fetchTotalIncomeCountData();
  }, []);

  const cardData = [
    { title: 'All Users', value: `${Number(data?.users ?? 0)}`, img: 'https://img.icons8.com/3d-fluency/94/group--v2.png' },
    { title: 'Active Users', value: ` ${Number(data?.userActive ?? 0)}`, img: 'https://img.icons8.com/3d-fluency/94/group.png' },
    { title: 'Inactive Users', value: ` ${Number(data?.userInactive ?? 0)}`, img: 'https://img.icons8.com/3d-fluency/94/group--v4.png' },
    { title: 'Today Income', value: `$ ${Number(data?.todayIncome ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/cash-in-hand.png' },
    { title: 'Total Income', value: `$ ${Number(data?.totalIncome ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/stack-of-coins.png' },
    { title: 'Today Referral Income', value: `$ ${Number(data?.todayReferral ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-plastilina/69/share--v1.png' },
    { title: 'Total Referral Income', value: `$ ${Number(data?.totalReferral ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-plastilina/69/share--v1.png' },
    { title: 'Today Withdraw', value: `$ ${Number(data?.todayWithdraw ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/atm.png' },
    { title: 'Total Withdraw', value: `$ ${Number(data?.totalWithdraw ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/money-bag.png' },
    { title: 'Today Level Income', value: `$ ${Number(data?.todayLevel ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/bar-chart.png' },
    { title: 'Total Level Income', value: `$ ${Number(data?.totalLevel ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/bar-chart.png' },
    { title: 'Today Matching Income', value: `$ ${Number(data?.todayMatching ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/handshake.png' },
    { title: 'Total Matching Income', value: `$ ${Number(data?.totalMatching ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/handshake.png' },
    { title: 'Today Global Achievers', value: `${Number(data?.todayGlobalAchiever ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/contract.png' },
    { title: 'Total Global Achievers', value: `${Number(data?.totalGlobalAchiever ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/contract.png' },
    { title: 'Today Transaction', value: `$ ${Number(data?.todayTransaction ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/transaction.png' },
    { title: 'Total Transaction', value: `$ ${Number(data?.totalTransaction ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/transaction.png' },
    { title: 'Today Trading', value: `$ ${Number(data?.todayTrading ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/candle-sticks.png' },
    { title: 'Total Trading', value: `$ ${Number(data?.totalTrading ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/candle-sticks.png' },
    { title: 'Today LiveTrading', value: `$ ${Number(data?.todayLiveTrading ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/radio-waves.png' },
    { title: 'Total LiveTrading', value: `$ ${Number(data?.totalLiveTrading ?? 0).toFixed(2)}`, img: 'https://img.icons8.com/3d-fluency/94/radio-waves.png' },
  ];


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cardData.map((card, idx) => (
        <div
          key={idx}
          className="bg-[#ffffff13] backdrop-blur-md rounded-xl p-4 flex justify-between items-center shadow-md"
        >
          <div>
            <h4 className="text-sm">{card.title}</h4>
            <p className="text-xl font-semibold">{card.value}</p>
          </div>
          <div>
            <img src={card.img} className='h-16' alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopCard;
