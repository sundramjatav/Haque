import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import { allUser, BlockUser } from '../../../Api/admin.api';
import Loader from '../../../Components/Loader';
import { TbLockCancel, TbLockCheck } from 'react-icons/tb';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const title = "All User List";
  const headers = ["S.No", "Username", "Sponsor", "Wallet", "Investment", "Active Date",  "Join Date", "Status",  "Action"];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllUserData = async () => {
    try {
      const response = await allUser();
      if (response.success) {
        setData(response?.data || []);
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
                  active: {
                    ...user.active,
                    isBlocked: !user.active?.isBlocked,
                  },
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
        data={data.slice().reverse()}
        searchKeys={["account", "username", "sponsor.username"]}
        searchKey={"UserName , Sponsor or wallet"}
        renderRow={(item, index) => (
          <>
            <td className='border-r border-b border-text-white/20 p-2 md:p-3'>{index + 1}</td>
            <td className='border-r border-b border-text-white/20 p-2 md:p-3'>
              <div className='flex items-center gap-2'>
                <p>{item?.username}</p>
              </div>
            </td>
            <td className='border-r border-b border-text-white/20 p-2 md:p-3'>
                <p>{item?.sponsor?.username || " - "}</p>
            </td>
            <td className='border-r border-b border-text-white/20 p-2 md:p-3'>
              {item?.account?.slice(0, 6)}...{item?.account?.slice(-6)}
            </td>
            <td className='border-r border-b border-text-white/20 p-2 md:p-3'>
             ${item?.investment}
            </td>
            <td className={`border-r border-b border-text-white/20 p-2 md:p-3`}>
              {item?.active?.activeDate ? new Date(item?.active?.activeDate).toLocaleString() : '-'}
            </td>
            <td className='border-r border-b border-text-white/20 p-2 md:p-3'>
              {new Date(item?.createdAt).toLocaleString()}
            </td>
            <td className={`border-r border-b border-text-white/20 p-2 md:p-3 font-bold ${item?.active?.isActive ? 'text-green-500' : 'text-red-500'}`}>
              {item?.active?.isActive ? 'Active' : 'Inactive' }
            </td>
            <td className='border-b border-text-white/20 p-2 md:p-3'>
              <button
                disabled={loading}
                className={`p-2 rounded text-sm text-white ${item?.active?.isBlocked ? 'bg-red-500' : 'bg-green-500'}`}
                onClick={() => handleBlockUser(item._id)}
              >
                {item?.active?.isBlocked ? <TbLockCheck size={20} /> : <TbLockCancel size={20} />}
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
