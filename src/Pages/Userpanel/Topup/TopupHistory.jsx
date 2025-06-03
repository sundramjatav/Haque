import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import { fetchTopUpList } from '../../../Api/user.api';

const TopupHistory = () => {
  const [topupList, setTopupList] = useState([]);
  const [loading, setLoading] = useState(false);
  const title = "Topup History";
  const headers = ["S.No","Request ID", "Wallet Address", "Amount ($)", "Status", "Date"];
 useEffect(() => {
    const fetchTopUpData = async () => {
      try {
        setLoading(true);
        const response = await fetchTopUpList();
        if (response?.success) {
          setTopupList(response?.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    };
    fetchTopUpData();
  }, []);
  const data = [
    {requestID:"67db041fa2d8739ccb51da62", wallet: "**** **** 7955", amount: 10, status: "Confirm", date: "Wed, 16 Apr 2025 13:10:41" },
    {requestID:"67db041fa2d8739ccb51da62", wallet: "**** **** 7955", amount: 2, status: "Confirm", date: "Wed, 16 Apr 2025 13:17:07" },
    {requestID:"67db041fa2d8739ccb51da62", wallet: "**** **** 7955", amount: 2, status: "Confirm", date: "Sat, 19 Apr 2025 15:22:20" },
    {requestID:"67db041fa2d8739ccb51da62", wallet: "**** **** 7955", amount: 1, status: "Confirm", date: "Sun, 20 Apr 2025 15:29:39" },
    {requestID:"67db041fa2d8739ccb51da62", wallet: "**** **** 7955", amount: 0.5, status: "Confirm", date: "Tue, 22 Apr 2025 08:38:03" },
  ];

  return (
    <div>
      <TableComponent
        title={title}
        headers={headers}
        data={topupList}
        searchKeys={["wallet"]}
        searchKey={"wallet Address"}
        renderRow={(item, index) => (
          <>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{index + 1}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item.requestID}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item.wallet}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item.amount}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item.status}</td>
            <td className=" border-b border-text-white/40 p-2 md:p-3 text-center">{new Date(item?.createdAt).toLocaleString()}</td>
          </>
        )}
      />
    </div>
  );
};

export default TopupHistory