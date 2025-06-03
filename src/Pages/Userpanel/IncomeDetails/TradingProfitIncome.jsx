import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import Loader from '../../../Components/Loader';
import { getTradingProfitHistory } from '../../../Api/user.api';

const TradingProfitIncome = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTradingProfitHistory();
        if (response?.success) {
          setData(response?.data?.history);

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
  const title = "Trading Profit Income";
  const headers = [
    "S.No",
    "Join Date",
    // "Total Income",
    "Package",
    "Investment",
    "Return %",
    "Return Amount",
    "Limit",
    // "Date"

  ];

  return (
    <>
      {loading && (
        <Loader />
      )}
      <div>
        <TableComponent
          title={title}
          headers={headers}
          data={data}
          searchKeys={["percentage"]}
          searchKey={"Commission %"}
          renderRow={(item, index) => (
            <>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{index + 1}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{new Date(item?.package?.createdAt).toDateString()}</td>
              {/* <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.TotalIncome}</td> */}
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.package?.title}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.amount}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.percentage}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.income}</td>
              <td className="border-b border-text-white/40  p-2 text-center">{item?.amount * 3}</td>
              {/* <td className="border-b border-text-white/40  p-2 text-center">{item?.Date}</td> */}
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

export default TradingProfitIncome