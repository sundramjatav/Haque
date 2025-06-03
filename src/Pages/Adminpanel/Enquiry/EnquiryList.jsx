import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import { allEnquiryReports} from '../../../Api/admin.api';
import Loader from '../../../Components/Loader';
import { IoClose } from "react-icons/io5";

const EnquiryList = () => {
    const title = "Enquiry History";
    const headers = ["S.No", "Enquiry ID", "Username", "Email", "Mobile Number" ,"Message", "Date"];
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const fetchALlSupportReportData = async () => {
        try {
            const response = await allEnquiryReports();
            if (response.success) {
                setData(response.data);
            }
        } catch (error) {
            console.error("Error fetching tickets:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchALlSupportReportData();
    }, []);

    return (
        <div>
            <TableComponent
                title={title}
                headers={headers}
                data={data}
                searchKeys={["id", "name"]}
                searchKey={"Enquiry ID or Username"}
                renderRow={(item, index) => (
                    <>
                        <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{index + 1}</td>
                        <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item?.id}</td>
                        <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item?.name}</td>
                        <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.email}</td>
                        <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.phone}</td>
                        <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.message}</td>
                        <td className=" border-b border-text-white/40 p-2 md:p-3 text-center">
                            {new Date(item.createdAt).toLocaleString()}
                        </td>
                        
                    </>
                )}
            />

            {loading && <Loader />}

            {selectedTicket && (
                <div className="fixed inset-0 bg-bg-color1/40 flex items-center justify-center z-50">
                    <div className="bg-white text-black w-[90%] max-w-xl max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Ticket Details</h2>
                            <button
                                className="text-xl text-gray-700 hover:text-black"
                                onClick={() => setSelectedTicket(null)}
                            >
                                <IoClose size={24} className='text-red-500' />
                            </button>
                        </div>

                        <p><strong>Support ID:</strong> {selectedTicket?.id}</p>
                        <p><strong>Username:</strong> {selectedTicket?.user?.username}</p>
                        <p><strong>Issue:</strong> {selectedTicket?.natureOfComplain}</p>
                        <p><strong>Message:</strong> {selectedTicket?.message}</p>
                        <p><strong>Status:</strong> {selectedTicket?.status}</p>
                        <p><strong>Date:</strong> {new Date(selectedTicket?.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnquiryList;
