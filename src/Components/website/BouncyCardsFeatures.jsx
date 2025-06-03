import React from "react";
import { motion } from "framer-motion";

export const BouncyCardsFeatures = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-7">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:px-8">
                <h2 className="max-w-2xl text-4xl font-bold md:text-5xl bg-gradient-to-br from-white to-gray-400 bg-clip-text leading-tight text-transparent">
                    Accept Crypto Payments with Our
                    <span className="text-slate-400"> All-in-One Gateway</span>
                </h2>

                {/* <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="whitespace-nowrap rounded-lg bg-bg-color px-4 py-2 font-medium text-white shadow-xl transition-colors hover:bg-bg-color/70"
                >
                    Learn more
                </motion.button> */}
            </div>
            <div className="mb-4 grid grid-cols-12 gap-4">
                <BounceCard
                    className="col-span-12 md:col-span-4"
                    bgImage="https://images.unsplash.com/photo-1635236190542-d43e4d4b9e4b?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                >
                    <CardTitle>Track your growth</CardTitle>
                    <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-violet-400 to-indigo-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
                        <span className="block text-center font-semibold text-indigo-50">
                            Get insights into your performance
                        </span>
                    </div>
                </BounceCard>
                <BounceCard 
                className="col-span-12 md:col-span-8" 
                bgImage="https://images.unsplash.com/photo-1629449709638-0a18e7837415?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                >
                    <CardTitle>Instant Crypto Payments</CardTitle>
                    <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-amber-400 to-orange-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
                        <span className="block text-center font-semibold text-orange-50">
                            Secure & Fast Transactions
                        </span>
                    </div>
                </BounceCard>
            </div>
            <div className="grid grid-cols-12 gap-4">
                <BounceCard 
                className="col-span-12 md:col-span-8"
                bgImage="https://images.unsplash.com/photo-1642483160501-a15ef5069431?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                >
                    <CardTitle>Supported Coins</CardTitle>
                    <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-green-400 to-emerald-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
                        <span className="block text-center font-semibold text-emerald-50">
                            USDT (TRC20, ERC20, BEP20)<br />Bitcoin (BTC)
                        </span>
                    </div>
                </BounceCard>

                <BounceCard 
                className="col-span-12 md:col-span-4"
                bgImage="https://images.unsplash.com/photo-1660050913083-5514bb379e78?q=80&w=1520&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                >
                    <CardTitle>Also Accepted</CardTitle>
                    <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-pink-400 to-red-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
                        <span className="block text-center font-semibold text-red-50">
                            Ethereum (ETH)<br />Litecoin (LTC)
                        </span>
                    </div>
                </BounceCard>
            </div>

        </section>
    );
};

const BounceCard = ({ className, children, bgImage }) => {
    return (
        <motion.div
            whileHover={{ scale: 0.95, rotate: "-1deg" }}
            className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-slate-100 p-8 bg-cover bg-center ${className}`}
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {children}
        </motion.div>
    );
};


const CardTitle = ({ children }) => {
    return (
        <h3 className="mx-auto text-center text-3xl font-semibold">{children}</h3>
    );
};