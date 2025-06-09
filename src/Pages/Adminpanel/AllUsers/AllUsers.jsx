import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import { allUser, BlockUser, VerifyUser } from '../../../Api/admin.api';
import Loader from '../../../Components/Loader';
import { TbLockCancel, TbLockCheck } from 'react-icons/tb';
import Swal from 'sweetalert2';
import { FaCheck, FaCheckSquare } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { ImBlocked } from 'react-icons/im';

const AllUsers = () => {
  const title = "All User List";
  const headers = ["S.No", "Username", "Sponsor", "Wallet", "Join Date", "Status", "Action"];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllUserData = async () => {
    try {
      const response = await allUser();
      console.log(response);
      if (response.success) {
        setData(response?.user || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUserData();
  }, []);


  const handleBlockUser = async (id) => {
    try {
      setLoading(true);
      const response = await BlockUser(id);
      if (response.success) {
        Swal.fire({
          icon: 'success',
          text: response?.message || 'User block/unblock successful',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setData(prevUsers =>
          prevUsers.map(user =>
            user._id === id
              ? {
                  ...user,
                  isBanned: !user.isBanned,
                }
              : user
          )
        );
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      Swal.fire({
        icon: 'error',
        text: 'Something went wrong!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyUser = async (id) => {
    try {
      setLoading(true);
      const response = await VerifyUser(id);
      if (response.success) {
        Swal.fire({
          icon: 'success',
          text: response?.message || 'User active/isActive successful',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setData(prevUsers =>
          prevUsers.map(user =>
            user._id === id
              ? {
                  ...user,
                  isActive: !user.isActive,
                }
              : user
          )
        );
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      Swal.fire({
        icon: 'error',
        text: 'Something went wrong!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <TableComponent
        title={title}
        headers={headers}
        data={data}
        searchKeys={["name", "walletAddress"]}
        searchKey={"Name or Wallet Address"}
        renderRow={(item, index) => (
          <>
            <td className='border-r border-b border-text-white/20 p-2 md:p-3'>{index + 1}</td>
            <td className='border-r border-b border-text-white/20 p-2 md:p-3'>
              <div className='flex items-center gap-2'>
                <p>{item?.name}</p>
              </div>
            </td>
            <td className='border-r border-b border-text-white/20 p-2 md:p-3'>
              <p>{item?.sponsor?.name || " - "}</p>
            </td>
            <td className='border-r border-b border-text-white/20 p-2 md:p-3'>
              {item?.walletAddress
                ? `${item?.walletAddress?.slice(0, 6)}...${item?.walletAddress?.slice(-6)}`
                : "-"}
            </td>
            <td className='border-r border-b border-text-white/20 p-2 md:p-3'>
              {new Date(item?.createdAt).toLocaleString()}
            </td>
            <td className={`border-r border-b border-text-white/20 p-2 md:p-3 font-bold ${item?.isActive ? 'text-green-500' : 'text-red-500'}`}>
              {item?.isActive ? 'Active' : 'Inactive'}
            </td>
            <td className='border-b border-text-white/20 p-2 md:p-3 flex gap-2'>
              <button
                disabled={loading}
                className={`p-1 rounded text-sm text-white ${item?.isActive ? 'bg-green-500' : 'bg-red-500'}`}
                onClick={() => handleVerifyUser(item._id)}
              >
                {item?.isActive ? <FaCheck size={20} /> : <ImBlocked size={20} />}
              </button>
              <button
                disabled={loading}
                className={`p-1 rounded text-sm text-white ${item?.isBanned ? 'bg-red-500' : 'bg-green-500'}`}
                onClick={() => handleBlockUser(item._id)}
              >
                {!item?.isBanned ? <TbLockCheck size={20} /> : <TbLockCancel size={20} />}
              </button>
            </td>
          </>
        )}
      />

      {loading && (
        <div className="mt-4">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AllUsers;
