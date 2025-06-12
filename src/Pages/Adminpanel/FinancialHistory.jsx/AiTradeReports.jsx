import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import Loader from '../../../Components/Loader';
import { getAiTradeReports } from '../../../Api/admin.api';

const AiTradeReportsAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAiTradeReports();
        console.log(response?.trades);   
        if (response?.success) {
          setData(response?.trades);
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
  const title = "AI Trade History";
  const headers = [
    "S.No",
    "Username",
    "Trade Investment",
    "Trade Percent %",
    "Trade Amount",
    "Collect Trade Amount",
    "Date",
  ];

console.log(data);

  return (
    <>
      {loading && (
        <Loader />
      )}
      <div className='flex flex-col gap-5'>
       
        <TableComponent
          title={title}
          headers={headers}
          data={data || []}
          searchKeys={["userId.name"]}
          searchKey={"User  Username"}
          renderRow={(item, index) => (
            <>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{index + 1}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.userId?.name}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.investedAmount.toFixed(4)}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.Percent.toFixed(1)}%</td>
              <td className="border-b border-r border-text-white/40  p-2 text-center">{item?.roiEarned.toFixed(4)}</td>
              <td className="border-b border-r border-text-white/40  p-2 text-center">{item?.finalized ? "Yes" : "No"}</td>
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

export default AiTradeReportsAdmin;