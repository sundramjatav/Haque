import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import { referralHistory } from '../../../Api/admin.api';
import Loader from '../../../Components/Loader';

const ReferralHistory = () => {
  const title = "Referral History";

  const headers = [
    "S.No",
    "ID",
    "Sponsor Username",
    "Referred Username",
    "Amount",
    "Date",
  ];

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const fetchReferralData = async () => {
    try {
      const response = await referralHistory();
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
    fetchReferralData();
  }, []);

  return (
    <div>
      <TableComponent
        title={title}
        headers={headers}
        data={data}
        searchKeys={["id", "fromUser.username", "user.username"]}
        searchKey="Request ID"
        renderRow={(item, index) => (
          <>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{index + 1}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.id}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.fromUser?.username}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.user?.username}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.amount}</td>
            <td className="border-b border-text-white/40 p-2 md:p-3 text-center">{new Date(item?.createdAt).toLocaleString()}</td>
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

export default ReferralHistory;
