import React, { useEffect, useState } from 'react'
import TableComponent from '../../Components/TableComponent'
import Loader from '../../Components/Loader'
import { getInvestmentReports } from '../../Api/user.api';

const InvestmentReports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const title = "Investment Reports";
  const headers = [
    "S.No",
    "Transaction ID",
    "Wallet Address",
    "Main Address",
    "Amount ($)",
    "Type",
    "Status",
    "Date"
  ];


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getInvestmentReports();
        if (response?.success) {
          setData(response?.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    };
    fetchData();
  }, []);

  const cardData = [
    {
      title: 'Total Investment',
      value: `$${data?.totalIncome || 0}`,
      img: 'https://img.icons8.com/3d-fluency/94/conference-call.png'
    },
    {
      title: 'Today Investment',
      value: `$${data?.todayTotal || 0}`,
      img: 'https://img.icons8.com/3d-plastilina/69/share--v1.png'
    }
  ];
  return (
    <div className='flex flex-col gap-5'>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardData?.map((card, idx) => (
          <div
            key={idx}
            className="bg-[#ffffff13] backdrop-blur-md rounded-xl p-4 flex justify-between items-center shadow-md"
          >
            <div>
              <h4 className="text-sm">{card.title}</h4>
              <p className="text-xl font-semibold">{typeof card.value === 'number' ? card.value.toFixed(3) : card.value}</p>
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
        data={data?.history || []}
        searchKeys={["id", "clientAddress", "mainAddress"]}
        searchKey={"Transaction ID"}
        renderRow={(item, index) => (
          <>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{index + 1}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.id}</td>
            <td className='border-r border-b border-text-white/20 p-2 md:p-3'>
              {item?.clientAddress?.slice(0, 6)}...{item?.clientAddress?.slice(-6)}
            </td>
            <td className='border-r border-b border-text-white/20 p-2 md:p-3'>
              {item?.mainAddress?.slice(0, 6)}...{item?.mainAddress?.slice(-6)}
            </td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">${item?.investment}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.type}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.status}</td>
            <td className="border-b border-text-white/40 p-2 md:p-3 text-center">
              {new Date(item?.createdAt).toLocaleString()}
            </td>
          </>
        )}
      />
      {loading && (
        <div>
          <Loader/>
        </div>
      )}
    </div>
  )
}

export default InvestmentReports