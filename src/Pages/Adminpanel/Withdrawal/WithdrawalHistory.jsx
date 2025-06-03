import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import { withdrawalHistory } from '../../../Api/admin.api';
import Loader from '../../../Components/Loader';

const WithdrawalHistory = () => {
  const title = "Withdrawal History";
  const headers = ["S.No", "Request ID", "From Address", "To Address", "Username", "Amount ($)", "Type", "Date", "Status"];
  const [data, setData] = useState([]);
  const [todayWithdrawal, setTodayWithdrawal] = useState([]);
  const [totalWithdrawal, setTotalWithdrawal] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchWithdrawalData = async () => {
    try {
      const response = await withdrawalHistory();
      console.log(response);
      
      if (response.success) {
        setData(response?.data?.history);
        setTodayWithdrawal(response?.data?.today);
        setTotalWithdrawal(response?.data?.total);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawalData();
  }, []);

  const cardData = [
    { title: 'Today Withdrawal', value: todayWithdrawal, img: 'https://img.icons8.com/3d-fluency/94/money-bag.png' },
    { title: 'Total Withdrawal', value: totalWithdrawal, img: 'https://img.icons8.com/3d-fluency/94/approval.png' },
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
              <p className="text-xl font-semibold">$ {card.value}</p>
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
        data={data}
        searchKeys={["id","mainAddress","user.username"]}
        searchKey={"User ID , Username or wallet Address"}
        renderRow={(item, index) => (
          <>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{index + 1}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.id}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">
              {item?.mainAddress?.slice(0, 6)}...{item?.mainAddress?.slice(-6)}
            </td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">
              {item?.clientAddress?.slice(0, 6)}...{item?.clientAddress?.slice(-6)}
            </td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.user?.username}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.investment}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.type}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{new Date(item.createdAt).toLocaleString()}</td>
            <td className="border-b border-text-white/40 p-2 md:p-3 text-center">{item?.status}</td>
          </>
        )}
      />
      {loading && (
        <div className="">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default WithdrawalHistory;
