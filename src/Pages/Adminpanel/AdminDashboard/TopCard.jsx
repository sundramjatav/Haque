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

  const cards = [
    { title: 'Total Users', value: `${Number(data?.totalPartners ?? 0)}`, img: 'https://img.icons8.com/3d-fluency/94/conference-call.png' },
    { title: 'Active Users', value: `${Number(data?.activeUsers ?? 0)}`, img: 'https://img.icons8.com/3d-fluency/94/ok.png' },
    { title: 'Inactive Users', value: `${Number(data?.inactiveUsers ?? 0)}`, img: 'https://img.icons8.com/3d-fluency/94/group--v3.png' },
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, idx) => (
        <div className='box-border-color p-1 rounded-xl'>
          <div
            key={idx}
            className="background rounded-xl p-4 flex justify-between items-center shadow-md"
          >
            <div>
              <h4 className="text-sm">{card.title}</h4>
              <p className="text-xl font-semibold">{card.value}</p>
            </div>
            <div>
              <img src={card.img} className='h-16' alt="" />
            </div>
          </div>
          </div>
      ))}
        </div>
      );
};

      export default TopCard;
