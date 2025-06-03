import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import { levelIncomeHistory } from '../../../Api/admin.api';
import Loader from '../../../Components/Loader';

const LevelIncomeHistory = () => {
  const title = "Level Income History";
  const headers = [
    "S.No",
    "ID",
    "Sponsor Username",
    "Referred Username",
    "Amount",
    "Income",
     "Level",
    "Percentage",
    "Reward",
    "Date",
    "Status"
  ];
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const fetchSelfIncomeDate = async () => {
    try {
      const response = await levelIncomeHistory();
      if (response.success) {
        setData(response?.data?.history);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSelfIncomeDate();
  }, []);

  return (
    <div>
      <TableComponent
        title={title}
        headers={headers}
        data={data}
        searchKeys={["id", "user.username" ,"fromUser.username"]}
        searchKey={"User ID or Username"}
        renderRow={(item, index) => (
          <>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{index + 1}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.id || "N/A"}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.fromUser?.username || "N/A"}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.user?.username || "N/A"}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.amount || "N/A"}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.income || "N/A"}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">
              {item?.level !== null && item?.level !== undefined ? item.level : "N/A"}
            </td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">
              {item?.percentage !== null && item?.percentage !== undefined ? item.percentage : "N/A"}
            </td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.reward || "N/A"}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{new Date(item?.createdAt).toLocaleString()}</td>
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

export default LevelIncomeHistory