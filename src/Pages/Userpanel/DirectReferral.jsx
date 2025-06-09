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
    
  return (
    <div className='flex flex-col gap-5'>
     <TableComponent
        title={title}
        headers={headers}
        data={data}
        searchKeys={["name", "walletAddress"]}
        searchKey={"User Name or WalletAddress "}
        renderRow={(item, index) => (
          <>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 ">{index + 1}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 ">{item?.id || item?.name}</td>
            <td className='border-r border-b border-text-white/20 p-2 md:p-3'>
              {item?.walletAddress?.slice(0, 6)}...{item?.walletAddress?.slice(-6)}
            </td>
            <td className={`border-r border-b border-text-white/20 p-2 md:p-3 font-semibold ${item?.isActive ? "text-green-500":"text-red-500"} `}>
              {item?.isActive ? "Yes" : "No "}
            </td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 ">{item?.referralLink}</td>
            <td className="border-b border-text-white/40 p-2 md:p-3 ">
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