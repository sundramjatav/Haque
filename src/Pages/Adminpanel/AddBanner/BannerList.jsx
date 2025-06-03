import React, { useEffect, useState } from 'react'
import TableComponent from '../../../Components/TableComponent'
import { FaEdit } from 'react-icons/fa';
import { LuView } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
import { deleteBanner, getBannerList } from '../../../Api/admin.api';
import Swal from 'sweetalert2';
import { backendConfig } from '../../../Content/MainContent';
import Loader from '../../../Components/Loader';
import { Link } from 'react-router-dom';
import { Routers } from '../../../Routes/Routers';
import { truncateWords } from '../../../utils/stringHelpers';
import { FaEye } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

const BannerList = () => {
  const [loading, setLoading] = useState(false);
  const [bannerList, setBannerList] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const handleView = (item) => {
    setSelectedBanner(item);
    setShowPopup(true);
  };

  useEffect(() => {
    fetchBannerList();
  }, [])


  const fetchBannerList = async () => {
    try {
      setLoading(true);
      const response = await getBannerList();
      setBannerList(response?.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }
  const title = "All Banner List";
  const headers = [
    "S.No",
    "ID",
    "Banner Image",
    "Banner Name",
    "Discription",
    "Type",
    "Status",
    "Action"
  ];

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const response = await deleteBanner(id);
        if (response.success) {
          Swal.fire(
            {
              text: response.message,
              icon: 'success',
              timer: 3000,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timerProgressBar: true,
            });

          fetchBannerList();
        } else {
          Swal.fire({
            icon: 'error',
            text: response.message,
            timer: 3000,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Error!', 'Failed to delete the banner.', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <TableComponent
        title={title}
        headers={headers}
        data={Array.isArray(bannerList) ? bannerList : [bannerList]}
        searchKey={"Banner  Name or ID"}
        searchKeys={["title", "id"]}
        renderRow={(item, index) => (
          <>
            <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{index + 1}</td>
            <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item?.id}</td>
            <td className='border-r border-b border-text-white/40 p-2 md:p-3'>
              <img src={item?.file} className="w-auto h-10 border border-text-white/40 rounded-lg mx-auto" />
            </td>
            <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item?.title}</td>
            <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{truncateWords(item?.description, 20)}</td>
            <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item?.type}</td>
            <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item?.status ? 'Active' : 'Inactive'}</td>
            <td className='border-b border-text-white/40 p-2 md:p-3 '>
              <div className='flex items-center gap-2'>
                <div onClick={() => handleView(item)} className='bg-[#ffffff13] backdrop-blur-md flex items-center justify-center text-bg-color cursor-pointer w-8 h-8 rounded-md border border-white/40'>
                  <FaEye size={18} />
                </div>
                <Link to={`${Routers.UPDATE_BANNER}/${item?._id}`}>
                  <button className='bg-[#ffffff13] backdrop-blur-md flex items-center justify-center text-bg-color cursor-pointer w-8 h-8 rounded-md border border-white/40'>
                    <FaEdit size={18} />
                  </button>
                </Link>
                <div onClick={() => handleDelete(item?._id)} className='bg-[#ffffff13] backdrop-blur-md flex items-center justify-center text-bg-color cursor-pointer w-8 h-8 rounded-md border border-white/40'>
                  <MdDelete size={18} />
                </div>
              </div>
            </td>
          </>
        )}
      />

      {showPopup && selectedBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white text-black rounded-lg shadow-lg w-[90%] md:w-[500px] max-h-[90vh] overflow-y-auto p-6 relative">

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{selectedBanner.title}</h2>
              <button
                className="text-xl font-bold text-gray-700 hover:text-black"
                onClick={() => setShowPopup(false)}
              >
                <IoClose size={24} className='text-red-500' />
              </button>

            </div>
            <div className='w-full h-48 overflow-hidden rounded-md mb-4'>
              <img
                src={selectedBanner.file}
                alt="Banner"
                className="w-full h-full object-cover  "
              />
            </div>
            <p><strong>Type:</strong> {selectedBanner.type}</p>
            <p><strong>Description:</strong> {selectedBanner.description}</p>
          </div>
        </div>
      )}


      {loading && (
        <div className="">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default BannerList;