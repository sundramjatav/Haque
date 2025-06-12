import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { aiTrader, aiTraderCollectAmount } from '../../../Api/user.api';
import ProfitPopup from './ProfitPopup';

const AiTrade = () => {
  const [orderBook, setOrderBook] = useState([]);
  const [timer, setTimer] = useState(5);
  const [isTrading, setIsTrading] = useState(false);
  const [showProfitButton, setShowProfitButton] = useState(false);
  const [profitData, setProfitData] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [profitAmount, setProfitAmount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth5@100ms');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const bids = data.bids.slice(0, 5);
      const asks = data.asks.slice(0, 5);
      setOrderBook(
        bids.map((bid, i) => ({
          bidQty: parseFloat(bid[1]).toFixed(3),
          bidPrice: parseFloat(bid[0]).toFixed(2),
          askPrice: asks[i] ? parseFloat(asks[i][0]).toFixed(2) : '',
          askQty: asks[i] ? parseFloat(asks[i][1]).toFixed(3) : '',
        }))
      );
    };
    return () => ws.close();
  }, []);

  const startTrade = () => {
    setIsTrading(true);
    setTimer(5);
    setShowProfitButton(false);
  };

  useEffect(() => {
    let interval;
    if (isTrading && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTrading, timer]);

  useEffect(() => {
    const fetchAiTrade = async () => {
      try {
        const response = await aiTrader();
        console.log(response);

        if (response?.success) {
          const ProfitAmount = response?.profitEarned ?? 0;
          const InvestmentAmount = response?.investedAmount ?? 0;
          setProfitData(response.data);
          setProfitAmount(ProfitAmount);
          setInvestmentAmount(InvestmentAmount);
          setShowProfitButton(true);
          setShowPopup(true);
          Swal.fire({
            icon: 'success',
            text: response?.message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } else {
          Swal.fire({
            icon: 'error',
            text: response?.message || 'Unknown error occurred',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          setIsTrading(false);
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: 'Something went wrong!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setIsTrading(false);
      }
    };

    if (isTrading && timer === 0 && !profitData) {
      fetchAiTrade();
    }
  }, [isTrading, timer]);


  const collectProfit = async () => {
    try {
      const response = await aiTraderCollectAmount();
      if (response?.success) {
        Swal.fire({
          icon: 'success',
          text: response?.message || "Profit Collected!",
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setIsTrading(false);
        setShowProfitButton(false);
        setProfitData(null);
      } else {
        Swal.fire({
          icon: 'error',
          text: response?.message || "Failed to collect profit",
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Something went wrong!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };


  return (
    <div className=" text-white font-mono md:p-4 flex flex-col items-center">
      <div className="w-full  bg-white/5 backdrop-blur-md  md:p-4 p-3 rounded-xl shadow-lg border border-bg-color">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold tracking-wide">⚡ AI TRADE</h1>
          {/* <span className="bg-bg-color text-xl px-3 py-1 rounded-full">LEVEL 1</span> */}
        </div>
        <div className="flex justify-between text-lg text-gray-400">
          <span className="ml-3 mt-1">Profit Range:</span>
          <span className="text-green-300">1% - 1.4%</span>
        </div>
      </div>

      <div className="mt-4 w-full  text-center  space-y-6 bg-white/5 backdrop-blur-md  md:p-4 p-3 rounded-xl border border-bg-color shadow-inner">
        <div className="md:text-lg text-sm text-center text-gray-300 mb-2 text-bg-color font-bold">📈 Live BTC/USDT Order Book</div>
        <div className="grid grid-cols-4 md:text-lg text-gray-500 border-b border-gray-700 pb-1 mb-1">
          <span>Qty</span>
          <span>Price</span>
          <span>Price</span>
          <span>Qty</span>
        </div>
        {orderBook.map((item, i) => (
          <div key={i} className="grid grid-cols-4 md:text-lg text-sm py-1 animate-pulse">
            <span className="text-green-400">{item.bidQty}</span>
            <span className="text-green-300">{item.bidPrice}</span>
            <span className="text-red-300">{item.askPrice}</span>
            <span className="text-red-400">{item.askQty}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-6 items-center justify-center">
        <button
          onClick={startTrade}
          className="flex items-center gap-2 font-semibold text-white text-lg px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] transition-all duration-500 hover:translate-x-1 hover:scale-105"
        >
          🚀 Place Trade
        </button>
        {!showProfitButton && (
          <div className="text-2xl text-white font-mono">{isTrading ? `${timer}s` : ''}</div>
        )}

        {showProfitButton && (
          <button
            onClick={collectProfit}
            className="bg-bg-color hover:bg-bg-color text-white font-semibold px-5 py-3 rounded-2xl shadow-md text-lg"
          >
            💸 Collect Profit
          </button>
        )}
      </div>

      <div className="mt-4 text-center text-sm text-gray-400 py-4">
        Your trade profit will be calculated after 5 seconds based on real-time market depth.
      </div>

      {showPopup && (
        <ProfitPopup
          investment={investmentAmount}
          profit={profitAmount}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default AiTrade;
