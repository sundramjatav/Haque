import React from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { GenerationStatus } from "../IncomeDetails/GenerationStatus";

const AboutMe = ({ user }) => {
    const location = window.location.origin;
    const referCode = `${location}/register?referral=${user?.referralLink}`;
    const notices = [
        "Platform maintenance is scheduled for Saturday, 02:00–04:00 UTC. Trading may be temporarily paused.",
        "Exciting News! We are thrilled to announce the free launch of Forest Trading – your trusted partner in smart and secure trading. At Forest Trading, we're committed to empowering every trader – from beginner to expert – with real-time insights, transparent operations, and a user-first approach. Join us today and be part of a trading revolution that values trust, growth, and community. No hidden fees. No risks. Just opportunities. Let’s grow together, naturally – with Forest Trading. Team myaiwallets",
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(referCode)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    text: 'Referral link copied to clipboard!',
                    timer: 2000,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end',
                });
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong while copying!',
                });
            });
    };


    return (
        <div className="flex flex-col lg:flex-row gap-4  rounded-lg text-white">
            <div className='flex-1 box-border-color p-1 rounded-xl'>
                <div className="background p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between w-full">
                        <h2 className="text-xl font-semibold mb-4">About Me</h2>   <GenerationStatus partners={user?.activeUsers} />

                    </div>
                    <div className="space-y-2 text-sm">
                        <p><strong>User Id :</strong> {user?._id}</p>
                        <p><strong>Sponsor Name :</strong> {user?.sponsor?.name ? user?.sponsor?.name : "N/A"}</p>
                        <p><strong>Wallet Address :</strong> {user?.walletAddress}</p>
                        {/* <p><strong>Date Of Activation:</strong> {user?.active?.activeDate ? new Date(user?.active?.activeDate).toLocaleString() : "N/A"} </p> */}
                        <p><strong>Joining Date:</strong> {new Date(user?.createdAt).toLocaleString()}</p>
                        {/* <p><strong>Level:</strong> Beginner</p> */}
                        <p><strong>Renewal Status:</strong> {user?.active?.isActive ? "Active" : "Inactive"}</p>
                    </div>

                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Your Refer Code</h3>
                        <div className="flex items-center text-sm bg-text-white/10 rounded-lg p-2">
                            <input
                                type="text"
                                readOnly
                                className="bg-transparent text-white w-full outline-none"
                                value={referCode}
                            />
                            <button onClick={handleCopy} className="copybtn bg-bg-color/80 hover:bg-bg-color p-1 rounded">
                                📋
                            </button>
                        </div>
                    </div>
                </div>
            </div>
              <div className='box-border-color p-1 rounded-xl'>
            <div className="w-full lg:w-[300px] background p-4 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Notice & Updates</h2>
                <div className="relative h-64 overflow-hidden">
                    <div className="animate-scroll-up flex flex-col gap-4 text-sm">
                        {[...notices, ...notices].map((notice, index) => (
                            <div key={index} className="p-2 rounded">
                                {notice}
                            </div>
                        ))}
                    </div>
                </div>
            </div></div>
        </div>
    );
};

export default AboutMe;
