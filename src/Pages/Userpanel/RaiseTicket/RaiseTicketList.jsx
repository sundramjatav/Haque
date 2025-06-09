import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import { raiseTiketList } from '../../../Api/user.api';
import Loader from '../../../Components/Loader';
const RaiseTicketList = () => {
    const [loading, setLoading] = useState(false);
    const [ticketList, setTicketList] = useState([]);
    const title = "Raise Ticket History";
    const headers = ["S.No", "Support ID", "Issue", "Description", "Status", "Date", "Response", "Response Date"];

    useEffect(() => {
        const fetchALlSupportReportData = async () => {
            try {
                setLoading(true);
                const response = await raiseTiketList();
                if (response?.success) {
                    setTicketList(response?.tickets);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchALlSupportReportData();
    }, [])

    return (
        <div>
            <TableComponent
                title={title}
                headers={headers}
                data={ticketList}
                searchKeys={["id", "status"]}
                searchKey={"Support ID"}
                renderRow={(item, index) => (
                    <>
                        <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{index + 1}</td>
                        <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item?._id}</td>
                        {/* <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item?.name}</td> */}
                        <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.subject}</td>
                        <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.message}</td>
                        <td className={`border-r border-b border-text-white/40 p-2 md:p-3 text-center
                            ${item?.status === "Pending" ? "text-yellow-500" : ""}
                            ${item?.status === "Accepted" ? "text-green-500" : ""}
                            ${item?.status === "Rejected" ? "text-red-500" : ""}`}>
                            {item?.status}
                        </td>
                        <td className=" border-b border-r border-text-white/40 p-2 md:p-3 text-center">{new Date(item?.createdAt).toDateString()}</td>
                        <td className=" border-b border-r border-text-white/40 p-2 md:p-3 text-center">{item?.response || '-'}</td>
                        <td className=" border-b border-text-white/40 p-2 md:p-3 text-center">{item?.responseDate ? new Date(item?.responseDate).toDateString() : '-'}</td>
                    </>
                )}
            />
            {loading && (
                <div className="flex justify-center items-center h-screen">
                    <Loader />
                </div>
            )}
        </div>
    );
};
export default RaiseTicketList





