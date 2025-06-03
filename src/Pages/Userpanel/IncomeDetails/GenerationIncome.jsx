import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import Loader from '../../../Components/Loader';
import { getLevelIncomeHistory } from '../../../Api/user.api';
import { GenerationStatus } from './GenerationStatus';
import { useSelector } from 'react-redux';

const GenerationIncome = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getLevelIncomeHistory();
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
  const title = "Generation Income";
  const headers = [
    "S.No",
    "Level",
    "Commission %",
    "Username",
    "Investment",
    "Income from Level",
    "Date",
    // "Unlocked Status",
  ];
  const cardData = [
    { title: 'Total Income', value: `$${data?.totalIncome || "N/A"}`, img: 'https://img.icons8.com/3d-fluency/94/money-bag.png' },
    { title: 'Today Income', value: `$${data?.todayTotal || "N/A"}`, img: 'https://img.icons8.com/3d-fluency/94/approval.png' },
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
           <div
             
              className="bg-[#ffffff13] backdrop-blur-md rounded-xl p-4 flex justify-between items-center shadow-md"
            >
              <GenerationStatus partners={user?.activeUsers} inside={true} />
            
            </div>
        </div>
        <TableComponent
          title={title}
          headers={headers}
          data={data?.history || []}
          searchKeys={["id", "level"]}
          searchKey={"User ID or Username"}
          renderRow={(item, index) => (
            <>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{index + 1}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.level}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.percentage}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.fromUser?.username}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.amount}</td>

              <td className="border-b border-r border-text-white/40  p-2 text-center">{item?.income}</td>
              <td className="border-b  border-text-white/40  p-2 text-center">{new Date(item?.createdAt).toLocaleDateString()}</td>
              {/* <td className=" border-b border-text-white/40  p-2 text-center">{item.isActive ? "Active" : "Inactive"}</td> */}
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

export default GenerationIncome