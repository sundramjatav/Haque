import { useEffect, useState } from "react";
import { HiCheck } from "react-icons/hi";
import GradientHeading from "./GradientHeading";
import { getAllPlans } from "../../Api/website.api";

const AllPlans = () => {
    const [plans, setPlans] = useState([]);

    const plan = [
        {
            features: [
                "Daily ROI between 1.15% and 1.5%",
                "Profit withdrawal anytime",
                "Principal withdrawal anytime",
            ]
        },
        {
            features: [
                "Daily ROI between 1.65% and 2.5%",
                "Profit withdrawal anytime",
                "Principal withdrawal after 45 days",
            ]
        },
        {
            features: [
                "Daily ROI between 2.65% and 3.5%",
                "Profit withdrawal anytime",
                "Principal withdrawal after 90 days",
            ]
        }
    ];


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllPlans();
                const planList = response?.Plans;
                setPlans(planList);
            } catch (error) {
                console.error("Error fetching plans:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="px-4 sm:px-8 py-12 text-center relative">
            <p className="text-sm text-bg-color font-medium mb-2">Investment Plans</p>
            <GradientHeading text="Choose the Best Plan for You" />
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
                Explore our investment options tailored to your financial goals. Whether you're just starting or a seasoned investor, there's a plan for you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:p-6">
                {plans.length > 0 ? (
                    plans.map((data, index) => (
                        <div
                            key={index}
                            className="relative w-full p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-md shadow-lg border border-white/20 text-center flex flex-col items-center gap-4 sm:gap-6"
                        >
                            <h2 className="text-lg font-bold uppercase tracking-wider text-white">
                                {data?.name?.replace("_", " ")}
                            </h2>

                            <h1 className="text-3xl font-bold text-white">
                                <p className="font-semibold text-white">
                                    {data?.minROI} - {data?.maxROI} %
                                </p>
                            </h1>

                            <div className="w-full border-t border-white/20" />

                            <div className="text-sm text-white/70">
                                <p>Investment Amount</p>
                                <p className="font-semibold text-white">minimum $20</p>
                            </div>

                            <button className="bg-bg-color text-white font-semibold py-2 px-6 rounded-lg mt-2 hover:bg-bg-color/70 transition duration-300">
                                Choose Plan
                            </button>

                            <div className="w-full border-t border-white/20" />

                            <p className="text-xs uppercase text-white/60 tracking-wide">All features options</p>
                            <div className="flex flex-col gap-2 text-sm w-full">
                                {plan[index]?.features?.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 text-white justify-center">
                                        <HiCheck className="text-purple-400" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-white">No investment plans available at the moment.</p>
                )}
            </div>


            <div className="absolute top-0 md:right-0 right-60">
                <div className="w-60 h-60 rounded-full bg-bg-color blur-3xl opacity-100"></div>
            </div>
        </div>
    );
};

export default AllPlans;
