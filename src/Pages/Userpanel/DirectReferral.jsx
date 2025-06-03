import React, { useEffect, useState } from 'react'
import TableComponent from '../../Components/TableComponent'
import Loader from '../../Components/Loader'
import { getDirectUsers } from '../../Api/user.api';

const DirectReferral = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const title = "Direct Referral User List";
  const headers = ["S.No", "Username", "Wallet Address", "Verified", "Referral Link", "Date"];

    
      useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await getDirectUsers();
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
    
      // const cardData = [
      //   { title: 'Total Referral', value: `${data?.totalWithdrawal || 0}`, img: 'https://img.icons8.com/3d-fluency/94/conference-call.png' },
      //   { title: 'Today Referral', value: `${data?.totalTodayWithdrawal || 0}`, img: 'https://img.icons8.com/3d-plastilina/69/share--v1.png' },
      // ];
  return (
    ///comments
    <div className='flex flex-col gap-5'>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </div> */}
     <TableComponent
        title={title}
        headers={headers}
        data={data}
        searchKeys={["id", "username", "account"]}
        searchKey={"User ID"}
        renderRow={(item, index) => (
          <>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{index + 1}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.id || item?.username}</td>
            <td className='border-r border-b border-text-white/20 p-2 md:p-3'>
              {item?.account?.slice(0, 6)}...{item?.account?.slice(-6)}
            </td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">
              {item?.active?.isVerified ? "Yes" : "No"}
            </td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.referralLink}</td>
            <td className="border-b border-text-white/40 p-2 md:p-3 text-center">
              {new Date(item?.createdAt).toLocaleString()}
            </td>
          </>
        )}
      />
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default DirectReferral