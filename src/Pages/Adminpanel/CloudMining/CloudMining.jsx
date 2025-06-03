import React, { useEffect, useState } from 'react';
import TableComponent from '../../../Components/TableComponent';
import { cloudMiningHistory } from '../../../Api/admin.api';
import Loader from '../../../Components/Loader';

const CloudMining = () => {
    const title = "Cloud Mining History";
    const headers = ["S.No", "Username", "Wallet Address","Amount", "Link", "Status", "Date"];
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchALlcloudMiningHistory = async () => {
        try {
            const response = await cloudMiningHistory();
            console.log("response", response);
            
            if (response.success) {
                setData(response.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchALlcloudMiningHistory();
    }, []);
    return (
        <div>
            <TableComponent
                title={title}
                headers={headers}
                data={data}
                searchKeys={["username"]}
                searchKey={"User ID or Username"}
                renderRow={(item, index) => (
                    <>
                        <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{index + 1}</td>
                        <td className='border-r border-b border-text-white/40 p-2 md:p-3'>{item?.userId?.username}</td>
                        <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.userId?.account}</td>
                        <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.amount}</td>
                        <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.link}</td>
                        <td className="border-r border-b border-text-white/40 p-2 md:p-3 text-center">{item?.status}</td>
                        <td className=" border-b border-text-white/40 p-2 md:p-3 text-center">{new Date(item.createdAt).toLocaleString()}</td>
                    </>
                )}
            />
            {loading && (
                <div className="">
                    <Loader />
                </div>
            )}
        </div>
    );
};


export default CloudMining