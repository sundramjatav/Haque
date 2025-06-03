import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import Loader from '../../../Components/Loader';
import { getMatchingHistory } from '../../../Api/user.api';

const MatchingIncome = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getMatchingHistory();
        if (response?.success) {
          setData(response?.data);

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
  const title = "Matching Income";
  const headers = [
    "S.No",
    "Achieved Date",
    "Left Team Business",
    "Right Team Business",
    "Total Business",
    "Matching Income",
    "Matching Bonus",
  ];

  const cardData = [
    { title: 'Total Income', value: `${data?.totalIncome || 0}`, img: 'https://img.icons8.com/3d-fluency/94/sales-performance.png' },
    { title: 'Today Income', value: `${data?.todayTotal || 0}`, img: 'https://img.icons8.com/3d-fluency/94/money-transfer.png' },
  ];

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
          data={data?.history || []}
          searchKeys={["amount","income"]}
          searchKey={"User ID or Username"}
          renderRow={(item, index) => (
            <>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{index + 1}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{new Date(item?.createdAt).toDateString() || item.createdAt}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.leftBusiness}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.rightBusiness}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.leftBusiness + item?.rightBusiness}</td> 
              <td className="border-b border-r border-text-white/40  p-2 text-center">{item?.amount}</td>
              <td className="border-b border-text-white/40  p-2 text-center">{item?.income}</td>
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

export default MatchingIncome