import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import Loader from '../../../Components/Loader';
import { useSelector } from 'react-redux';
import { getDailyROIHistory } from '../../../Api/admin.api';

const DailyROIIncome1 = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getDailyROIHistory();
        if (response?.success) {
          setData(response);
        }
      } catch (error) {
        console.error("Error fetching Team A data:", error);
      }
      finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [])
  const title = "Daily ROI Income";
  const headers = [
    "S.No",
    "Username",
    "Plan Name",
    "Investment",
    "Earning Percent %",
    "Earning Amount",
    "Date",
  ];
  const cardData = [
    { title: 'Total Investment', value: `$${data?.totalInvestment?.toFixed(3) || "NA"}`, img: 'https://img.icons8.com/3d-fluency/94/money-bag.png' },
    { title: 'Total Income', value: `$${data?.totalEarned?.toFixed(3) || "NA"}`, img: 'https://img.icons8.com/3d-fluency/94/approval.png' },
  ];
console.log(data);

  return (
    <>
      {loading && (
        <Loader />
      )}
      <div className='flex flex-col gap-5'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cardData?.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#ffffff13] backdrop-blur-md rounded-xl p-4 flex justify-between items-center shadow-md"
            >
              <div>
                <h4 className="text-lg">{card.title}</h4>
                <p className="text-2xl font-semibold">{card.value}</p>
              </div>
              <div className="">
                <img src={card.img} className='h-20' alt="" />
              </div>
            </div>
          ))}
        </div>
        <TableComponent
          title={title}
          headers={headers}
          data={data?.data || []}
          searchKeys={["userId.name"]}
          searchKey={"User  Username"}
          renderRow={(item, index) => (
            <>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{index + 1}</td>
              {/* <td className="border-r border-b border-text-white/40  p-2 text-center">{item?._id}</td> */}
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.userId?.name}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center capitalize">{item?.planId?.name}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.investmentAmount.toFixed(4)}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.roiPercent}</td>
              <td className="border-b border-r border-text-white/40  p-2 text-center">{item?.earned.toFixed(4)}</td>
              <td className="border-b  border-text-white/40  p-2 text-center">{new Date(item?.date).toLocaleString()}</td>
            </>
          )}
        />
        {loading && (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        )}
      </div>
    </>
  )
}

export default DailyROIIncome1