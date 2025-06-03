import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import { allSupportReports, updateSupportTicket } from '../../../Api/admin.api';
import Loader from '../../../Components/Loader';
import { FaEye } from 'react-icons/fa6';
import { IoClose } from "react-icons/io5";
import SelectInput from '../../../Components/SelectInput';
import Swal from 'sweetalert2';

const RaiseTicketList = () => {
    const title = "Raise Ticket History";
    const headers = ["S.No", "Support ID", "Username", "Issue", "Message", "Status", "Date", "Action"];
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const fetchALlSupportReportData = async () => {
        try {
            const response = await allSupportReports();
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

    const handleSubmitTicket = async () => {
        const payload = {
            id: selectedTicket?._id,
            status: selectedTicket?.status,
            response: selectedTicket?.response,
        };

        try {
            const res = await updateSupportTicket(selectedTicket?._id, payload);
            if (res.success) {
                Swal.fire({
                    icon: "success",
                    text: res?.message || "Ticket updated successfully",
                    timer: 3000,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timerProgressBar: true,
                });
                fetchALlSupportReportData();
                setSelectedTicket(null);
            } else {
                Swal.fire({
                    icon: 'error',
                    text: res?.message || "Failed to update ticket.",
                    timer: 3000,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                text: 'An error occurred while updating the ticket.',
                timer: 3000,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timerProgressBar: true,
            });
        }
    };

    return (
        <div>
            <TableComponent
                title={title}
                headers={headers}
                data={data}
                searchKeys={["id", "user.username"]}
                searchKey={"Support ID or Username"}
                renderRow={(item, index) => (
                    <>
                        <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{index + 1}</td>
                        <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item?.id}</td>
                        <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item?.user?.username}</td>
                        <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.natureOfComplain}</td>
                        <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.message}</td>
                        <td className={`border-r border-b border-text-white/40 p-2 md:p-3 text-center
                            ${item?.status === "Pending" ? "text-yellow-500" : ""}
                            ${item?.status === "Accepted" ? "text-green-500" : ""}
                            ${item?.status === "Rejected" ? "text-red-500" : ""}`}>
                            {item?.status}
                        </td>
                        <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">
                            {new Date(item.createdAt).toLocaleString()}
                        </td>
                        <td className="border-b border-text-white/40 p-2 md:p-3 text-center">
                            <button
                                className='bg-[#ffffff13] backdrop-blur-md flex items-center justify-center cursor-pointer w-8 h-8 rounded-md border border-white/40'
                                onClick={() => setSelectedTicket(item)}
                            >
                                <FaEye size={18} />
                            </button>
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

                        <div className='mt-4'>
                            <SelectInput
                                label="Change Status"
                                options={[
                                    { value: 'Pending', label: 'Pending' },
                                    { value: 'Accepted', label: 'Accepted' },
                                    { value: 'Rejected', label: 'Rejected' }
                                ]}
                                value={selectedTicket?.status}
                                onChange={(e) => setSelectedTicket({ ...selectedTicket, status: e.target.value })}
                            />
                        </div>

                        <div>
                            <p className="mt-4"><strong>Response:</strong></p>
                            <textarea
                                className="w-full h-24 outline-none text-sm p-2 border border-gray-300 rounded"
                                placeholder="Type your response here..."
                                value={selectedTicket?.response || ''}
                                onChange={(e) => setSelectedTicket({ ...selectedTicket, response: e.target.value })}
                            />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <button
                                className="mt-4 bg-red-500 text-white px-10 py-2 rounded hover:bg-red-500/90 transition-colors"
                                onClick={() => setSelectedTicket(null)}
                            >
                                Close
                            </button>

                            <button
                                className="mt-4 bg-bg-color text-white px-10 py-2 rounded hover:bg-bg-color/90 transition-colors"
                                onClick={handleSubmitTicket}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RaiseTicketList;
