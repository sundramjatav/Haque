import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import Loader from '../../../Components/Loader';
import { getDirectUsers } from '../../../Api/user.api';

const Referrals = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const title = "Recent Referral User List";
  const headers = ["S.No", "User ID", "Wallet Address", "Verified", "Referral Link", "Date"];


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
    <>
      {loading && <Loader />}
      <div>
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
              <td className='border-b border-text-white/20 p-2 md:p-3'>{new Date(item?.createdAt).toLocaleString()}</td>
            </>
          )}
        />

        {loading && (
          <div className="">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default Referrals;
