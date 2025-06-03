import { useEffect, useState } from "react";
import { HiCheck } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";
import { getAllPlans } from "../../Api/user.api";

const AllPlans = () => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllPlans();
                if (response.success) {
                    const formattedPlans = response.data.map(plan => ({
                        planName: plan.title,
                        minPrice: plan.minAmount,
                        maxPrice:
                            plan.maxAmount > 99999999999999
                                ? `Above ${plan.minAmount}`
                                : plan.maxAmount,
                        duration: getDuration(plan.title),
                        commission: `${plan.percentage}% ${plan.title === "LIVE AC" ? "On Trade" : "monthly"}`,
                        descriptionEnumList: [
                            `${plan.percentage}% ${plan.title === "LIVE AC" ? "On Trade Profit Invest" : "Commission monthly"}`,
                            "24/7 Access",
                        ],
                        notIncludedBenefits: ["No Free Trial"],
                        discount: getDiscount(plan.title),
                        popular: plan.title === "PREMIUM" || plan.title === "LIVE AC",
                    }));
                    setPlans(formattedPlans);
                }
            } catch (error) {
                console.error("Error fetching plans:", error);
            }
        };
        fetchData();
    }, []);

    const getDuration = (title) => {
        switch (title.toUpperCase()) {
            case "BASIC":
                return "1 Month";
            case "STANDARD":
                return "3 Months";
            case "PREMIUM":
            case "LIVE AC":
                return "6 Months";
            default:
                return "Custom Duration";
        }
    };

    const getDiscount = (title) => {
        switch (title.toUpperCase()) {
            case "STANDARD":
                return "42%";
            case "PREMIUM":
            case "LIVE AC":
                return "59%";
            default:
                return null;
        }
    };

    return (
        <div className="px-4 sm:px-8 py-12 text-center relative">
            <p className="text-sm text-bg-color font-medium mb-2">Investment Plans</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose the Best Plan for You</h2>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
                Explore our investment options tailored to your financial goals. Whether you're just starting or a seasoned investor, there's a plan for you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 sm:p-8">
                {plans.map((data, index) => (
                    <div
                        key={index}
                        className="relative w-full p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-md shadow-lg border border-white/20 text-center flex flex-col items-center gap-4 sm:gap-6"
                    >
                        {data?.popular && (
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-xs px-3 py-1 rounded-full text-white font-semibold shadow-md">
                                Popular
                            </div>
                        )}

                        <h2 className="text-lg font-bold uppercase tracking-wider text-white">
                            {data?.planName?.replace("_", " ")}
                        </h2>

                        <h1 className="text-3xl font-bold text-white">{data?.commission}</h1>

                        <div className="w-full border-t border-white/20" />

                        <div className="text-sm text-white/70">
                            <p>Investment Amount</p>
                            <p className="font-semibold text-white">
                                ${data?.minPrice} - ${data?.maxPrice}{index == (plans.length - 1) || index == (plans.length - 2) ? '+' : '' }
                            </p>
                        </div>

                        <button className="bg-bg-color text-white font-semibold py-2 px-6 rounded-lg mt-2 hover:bg-bg-color/70 transition duration-300">
                            Choose Plan
                        </button>

                        <div className="w-full border-t border-white/20" />

                        <p className="text-xs uppercase text-white/60 tracking-wide">All features options</p>
                        <div className="flex flex-col gap-2 text-sm w-full">
                            {data?.descriptionEnumList?.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-white justify-center">
                                    <HiCheck className="text-purple-400" />
                                    {feature}
                                </div>
                            ))}

                            {data?.notIncludedBenefits?.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-pink-300 line-through justify-center">
                                    <RiCloseFill className="text-pink-400" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="">
                <div className="w-60 h-60 rounded-full bg-bg-color absolute top-0 right-0 blur-3xl opacity-100"></div>
            </div>
        </div>
    );
};

export default AllPlans;
