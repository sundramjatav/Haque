import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import { updateRequestStatus, withdrawalHistory } from '../../../Api/admin.api';
import Loader from '../../../Components/Loader';
import Swal from 'sweetalert2';

const WithdrawalHistory = () => {
  const title = "Withdrawal History";
  const headers = ["S.No", "Request ID", "From Address", "To Address", "Username", "Amount ($)", "Date", "Status", "Action"];
  const [data, setData] = useState([]);
  const [todayWithdrawal, setTodayWithdrawal] = useState([]);
  const [totalWithdrawal, setTotalWithdrawal] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchWithdrawalData = async () => {
    try {
      const response = await withdrawalHistory();

      if (response.success) {
        setData(response?.data);
        setTodayWithdrawal(response?.todayByStatus || {});
        setTotalWithdrawal(response?.totalByStatus || {});
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
    {
      title: 'Today Approved',
      value: todayWithdrawal?.approved?.toFixed(3) || 0,
      img: 'https://img.icons8.com/3d-fluency/94/approval.png'
    },
    {
      title: 'Today Pending',
      value: todayWithdrawal?.pending?.toFixed(3) || 0,
      img: 'https://img.icons8.com/3d-fluency/94/clock--v1.png'
    },
    {
      title: 'Today Rejected',
      value: todayWithdrawal?.rejected?.toFixed(3) || 0,
      img: 'https://img.icons8.com/3d-fluency/94/cancel.png'
    },
    {
      title: 'Total Approved',
      value: totalWithdrawal?.approved?.toFixed(3) || 0,
      img: 'https://img.icons8.com/3d-fluency/94/approval.png'
      // img: 'https://img.icons8.com/3d-fluency/94/thumb-up.png'
    },
    {
      title: 'Total Pending',
      value: totalWithdrawal?.pending?.toFixed(3) || 0,
      img: 'https://img.icons8.com/3d-fluency/94/alarm-clock.png'
    },
    {
      title: 'Total Rejected',
      value: totalWithdrawal?.rejected?.toFixed(3) || 0,
      img: 'https://img.icons8.com/3d-fluency/94/cancel.png'
      // img: 'https://img.icons8.com/3d-fluency/94/delete-sign.png'
    }
  ];

  const adminWalletAddress = import.meta.env.VITE_WITHDRAWAL_ADDRESS;


  const handleAction = async (id, item) => {
    try {
      setLoading(true);
      const payload = {
        id,
        status: item
      }
      console.log(payload);
      const response = await updateRequestStatus(payload)
      if (response?.success) {
        await fetchWithdrawalData();
        Swal.fire({
          text: response?.message || 'Status Updated Successfully !',
          icon: 'success',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          timerProgressBar: true
        })
      } else {
        Swal.fire({
          text: response?.message || 'Status Updated Failed !',
          icon: 'error',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          timerProgressBar: true
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };
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
        searchKeys={["withdrawId", "walletAddress", "userId.name"]}
        searchKey={"Withdrawal ID , Username or wallet Address"}
        renderRow={(item, index) => (
          <>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{index + 1}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.withdrawId}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">
              {adminWalletAddress?.slice(0, 6)}...{adminWalletAddress?.slice(-6)}
            </td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">
              {item?.walletAddress?.slice(0, 6)}...{item?.walletAddress?.slice(-6)}
            </td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.userId?.name}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.amount}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{new Date(item.date).toLocaleString()}</td>
            <td className="border-b border-r border-text-white/40 p-2 md:p-3 text-center capitalize">
              {item?.status}
            </td>
            <td className="border-b border-text-white/40 p-2 md:p-3 text-center">
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => handleAction(item._id, "approved")}
                  disabled={item?.status !== "pending"}
                  className={`bg-[#ffffff13] backdrop-blur-md flex items-center justify-center text-white bg-bg-color text-xs cursor-pointer px-2 p-1 rounded-md border border-white/40 ${item?.status !== "pending" ? "cursor-not-allowed opacity-70" : ""
                    }`}
                >
                  Approved
                </button>
                <button
                  onClick={() => handleAction(item._id, "rejected")}
                  disabled={item?.status !== "pending"}
                  className={`bg-[#ffffff13] backdrop-blur-md flex items-center justify-center text-white bg-red-500 text-xs cursor-pointer px-2 p-1 rounded-md border border-white/40 ${item?.status !== "pending" ? "cursor-not-allowed opacity-70" : ""
                    }`}
                >
                  Rejected
                </button>
              </div>
            </td>

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
