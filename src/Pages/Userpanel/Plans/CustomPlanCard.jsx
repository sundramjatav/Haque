import { HiCheck } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";

const CustomPlanCard = ({ data, onChoose }) => {

  return (
    <div className="relative w-full p-4 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 text-center flex flex-col items-center gap-4 sm:gap-6">

      {data?.isActive && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-xs px-3 py-1 rounded-full text-white font-semibold shadow-md">
          Active
        </div>
      )}

      <h2 className="text-lg font-bold uppercase tracking-wider text-white">{data?.title?.replace('_', ' ')}</h2>

      <h1 className="text-3xl font-bold text-white">{data?.percentage}{data?.title == "LIVE AC" ? "% On Trade" : "% Monthly"}</h1>

      <div className="w-full border-t border-white/20" />

      <div className="text-sm text-white/70">
        <p>Investment Amount</p>
        <p className="font-semibold text-white">${data?.minAmount} - {data?.maxAmount == 100000000000000000 ? `${data?.minAmount}+` : data?.maxAmount}</p>
      </div>

      <button
        onClick={onChoose}
        className="bg-bg-color text-white font-semibold py-2 px-6 rounded-lg mt-2 hover:bg-bg-color/70 transition duration-300"
      >
        Choose Plan
      </button>

      <div className="w-full border-t border-white/20" />

      <p className="text-xs uppercase text-white/60 tracking-wide">All features options</p>
      <div className="flex flex-col gap-2 text-sm w-full">
        <div className="flex items-center gap-2 text-white justify-center">
          <HiCheck className="text-purple-400" />
          {data?.percentage}% Commission monthly
        </div>
        <div className="flex items-center gap-2 text-white justify-center">
          <HiCheck className="text-purple-400" />
          24/7 Access
        </div>

        <div className="flex items-center gap-2 text-pink-300 line-through justify-center">
          <RiCloseFill className="text-pink-400" />
          No Free Trial
        </div>

      </div>
    </div>
  );
};

export default CustomPlanCard;
