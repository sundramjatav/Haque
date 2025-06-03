import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import { withdrawalHistory } from '../../../Api/user.api';
import Loader from '../../../Components/Loader';

const WithdrawalHistory = () => {
  const [withdrawalList, setWithdrawalList] = useState([]);
  const [loading, setLoading] = useState(false);
  const title = "Withdrawal History";
  const headers = ["S.No", "Wallet Address", "Withdrawal Amount ($)", "Status", "Date"];

  useEffect(() => {
    const fetchWithdrawalData = async () => {
      try {
        setLoading(true);
        const response = await withdrawalHistory();
        if (response?.success) {
          setWithdrawalList(response?.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    };
    fetchWithdrawalData();
  }, []);

  const cardData = [
    { title: 'Total Withdrawal', value: `$${withdrawalList?.totalIncome || 0}`, img: 'https://img.icons8.com/3d-fluency/94/money-bag.png' },
    { title: 'Today Withdrawal', value: `$${withdrawalList?.todayTotal || 0}`, img: 'https://img.icons8.com/3d-fluency/94/approval.png' },
  ];
  return (
    <div className='flex flex-col gap-5'>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardData.map((card, idx) => (
          <div
            key={idx}
            className="bg-[#ffffff13] backdrop-blur-md rounded-xl p-4 flex justify-between items-center shadow-md"
          >
            <div>
              <h4 className="text-sm">{card.title}</h4>
              <p className="text-xl font-semibold"> {typeof card.value === 'number' ? card.value.toFixed(3) : card.value}</p>
            </div>
            <div className="">
              <img src={card.img} className='h-16' alt="" />
            </div>
          </div>
        ))}
      </div>
      <TableComponent
        title={title} 
        headers={headers}
        data={withdrawalList?.history  || []}
        searchKeys={["clientAddress"]}
        searchKey={"wallet Address"}
        renderRow={(item, index) => (
          <>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{index + 1}</td>
            <td className='border-r border-b border-text-white/20 p-2 md:p-3'>
             {item?.clientAddress?.slice(0, 6)}...{item?.clientAddress?.slice(-6)}
            </td>
            {/* <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.clientAddress}</td> */}
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.investment}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.status}</td>
            <td className=" border-b border-text-white/40 p-2 md:p-3 text-center">{new Date(item?.createdAt).toLocaleString()}</td>
          </>
        )}
      />
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default WithdrawalHistory;
