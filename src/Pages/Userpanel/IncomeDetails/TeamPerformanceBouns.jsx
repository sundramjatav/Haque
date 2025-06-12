import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import Loader from '../../../Components/Loader';
import { getTeamPerformanceBouns } from '../../../Api/user.api';

const TeamPerformanceBouns = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTeamPerformanceBouns();
        console.log(response);
        
        if (response?.success) {
          setData(response);
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
  const title = "Team Performance Bouns";
  const headers = [
    "S.No",
    "ID",
    "Power Leg Business",
    "Second Leg Business",
    "Other Leg Business",
    "P. L. Bonus (50%)",
    "S. L. Bonus (30%)",
    "O. L. Bonus (20%)",
    "Date",
  ];

console.log(data);

  return (
    <>
      {loading && (
        <Loader />
      )}
      <div className='flex flex-col gap-5'>
        <TableComponent
          title={title}
          headers={headers}
          data={data?.bonuses || []}
          searchKeys={["id"]}
          searchKey={"UserID"}
          renderRow={(item, index) => (
            <>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{index + 1}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.id || '-'}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.powerLeg.toFixed(4)}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.secondLeg.toFixed(4)}</td>
              <td className="border-b border-r border-text-white/40  p-2 text-center">{item?.otherLegs.toFixed(4)}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.powerLegBonus.toFixed(4)}</td>
              <td className="border-r border-b border-text-white/40  p-2 text-center">{item?.secondLegBonus.toFixed(4)}</td>
              <td className="border-b border-r border-text-white/40  p-2 text-center">{item?.otherLegsBonus.toFixed(4)}</td>
              <td className="border-b  border-text-white/40  p-2 text-center">{new Date(item?.date).toLocaleString()}</td>
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

export default TeamPerformanceBouns