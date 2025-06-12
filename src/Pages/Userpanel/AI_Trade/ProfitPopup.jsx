import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';

const ProfitPopup = ({ investment, profit, onClose }) => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-3">
            <div className="bg-white rounded-xl shadow-lg p-4 w-80 relative flex flex-col gap-5">
                <div className='flex items-center justify-between gap-2'>
                    <h2 className="text-2xl font-bold text-center text-green-500">Trade Completed</h2>
                    <button
                        onClick={onClose}
                        className="text-red-600 hover:text-red-500 text-4xl font-bold"
                    >
                       <IoCloseSharp />
                    </button>
                </div>
                <div className="space-y-2 text-base text-black">
                    <p>
                        <span className="font-semibold">Investment Amount:</span> $ {investment.toFixed(2)} USDT
                    </p>
                    <p>
                        <span className="font-semibold">Profit Earned:</span> $ {profit.toFixed(2)} USDT
                    </p>
                </div>
                {/* <div className="mt-6 text-center">
                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
                    >
                        Close
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default ProfitPopup;
