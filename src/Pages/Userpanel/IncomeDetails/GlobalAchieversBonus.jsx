import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import Loader from '../../../Components/Loader';
import { getGlobalAchieverHistory } from '../../../Api/user.api';

const GlobalAchieversBonus = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const title = "Global Achievers Club Bonus";
  const headers = [
    "S.No",
    "Username",
    "Rank Name",
    "Profit Share %",
    "Investment ($)",
    "Left Team Business ($)",
    "Right Team Business ($)",
    "Total Business Volume ($)",
    "Achieved Date",
    "Achievement"
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getGlobalAchieverHistory();
        if (response?.success) {
          setData(response?.data)
        } else {
          Swal.fire({
            title: 'Error!',
            text: response?.message,
            icon: 'error',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          })
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: "Something went wrong",
          icon: 'error',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        })
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [])




  return (
    <>
      {loading && <Loader />}
      <div>
        <TableComponent
          title={title}
          headers={headers}
          data={data}
          searchKeys={["title", "id", "investment", "reward", "totalBussiness", "status"]}
          searchKey={"Rank Name"}
          renderRow={(item, index) => (
            <>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{index + 1}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.id}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.title}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.percentage}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.investment}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.leftSideBussiness}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.rightSideBussiness}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.totalBussiness}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.createdAt ? new Date(item?.createdAt).toLocaleString(): "N/A"}</td>
              <td className="border-b border-text-white/40  p-2 text-center">
                <span className="bg-yellow-400 text-bg-color1 font-semibold px-2 py-1 rounded text-xs">{item?.status}</span>
              </td>
            </>
          )}
        />
      </div>

    </>
  );
};

export default GlobalAchieversBonus