import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import { investmentHistory } from '../../../Api/admin.api';
import Loader from '../../../Components/Loader';

const InvestmentHistory = () => {
  const title = "Investment History";
  const headers = ["S.No", "Request ID", "From Address", "To Address", "Username", "Amount ($)", "Type", "Date", "Status"];
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const fetchInvestmentData = async () => {
    try {
      const response = await investmentHistory();
      if (response.success) {
        setData(response?.data?.history
        );
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestmentData();
  }, []);

  return (
    <div>
      <TableComponent
        title={title}
        headers={headers}
        data={data}
        searchKeys={["user.username", "id"]}
        searchKey={"Username or Request ID"}
        renderRow={(item, index) => (
          <>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{index + 1}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.id}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">
            {item?.clientAddress?.slice(0, 6)}...{item?.clientAddress?.slice(-6)} 
            </td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">
              {item?.mainAddress?.slice(0, 6)}...{item?.mainAddress?.slice(-6)}
            </td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.user?.username}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.investment}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.type}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{new Date(item.createdAt).toLocaleString()}</td>
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

export default InvestmentHistory