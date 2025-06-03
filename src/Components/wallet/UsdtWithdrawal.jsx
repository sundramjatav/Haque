import { useState } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { MainContent } from "../../Content/MainContent";
import Button from "../Button";
import { setWithdrawalTransaction } from "../../Api/user.api";
import Loader from "../Loader";

const UsdtWithdrawal = ({ amount, isModalOpen, setIsModalOpen }) => {
  const user = useSelector((state) => state.auth?.user);
  const [loading, setLoading] = useState(false);

  const withdrawalAddress = import.meta.env.VITE_WITHDRAWAL_ADDRESS;
  const withdrawalPrivateKey = import.meta.env.VITE_ADMIN_PRIVATE_KEY;

  const checkMetaMask = () => {
    if (window.ethereum) {
      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "MetaMask not found",
        text: "Please install MetaMask to continue.",
      });
      return false;
    }
  };

  const handleWithdrawal = async () => {
    if (!checkMetaMask()) return;
    setLoading(true);

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);


      const signer = await provider.getSigner();
      const userWalletAddress = await signer.getAddress();

      const usdtAddress = "0x55d398326f99059fF775485246999027B3197955";
      const usdtABI = [
        "function transfer(address recipient, uint256 amount) public returns (bool)",
        "function balanceOf(address account) public view returns (uint256)",
        "function approve(address spender, uint256 amount) public returns (bool)",
        "function transferFrom(address sender, address recipient, uint256 amount) public returns (bool)"
      ];

      const usdtContract = new ethers.Contract(usdtAddress, usdtABI, provider);

      const deductionAmount = amount * 0;
      const amountInWei = ethers.parseUnits((amount - deductionAmount).toString(), 18);

      const adminBalance = await usdtContract.balanceOf(withdrawalAddress);

      if (BigInt(adminBalance) < BigInt(amountInWei)) {
        Swal.fire({
          icon: "error",
          title: "Insufficient USDT",
          text: "The admin wallet doesn't have enough USDT to complete the withdrawal.",
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
          allowOutsideClick: false,
        });
        setLoading(false);
        return;
      }

      const adminWallet = new ethers.Wallet(withdrawalPrivateKey, provider);
      const contractWithAdminSigner = usdtContract.connect(adminWallet);

      const tx = await contractWithAdminSigner.transfer(userWalletAddress, amountInWei);
      await tx.wait();

      setLoading(false);
      setWithdrawalResponse(tx);
      setIsModalOpen(false);

    } catch (error) {
      console.error("Error processing withdrawal:", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Withdrawal Failed",
        text: "Failed to process withdrawal. Please try again.",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        allowOutsideClick: false,
      });
      setIsModalOpen(false);
    }
  };

  const setWithdrawalResponse = async (res) => {
    setLoading(true);
    try {
      await setWithdrawalTransaction({ response: res, amount });
      Swal.fire({
        icon: 'success',
        title: "Withdrawal Successful",
        text: `You have successfully withdrawn ${amount} USDT!`,
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        allowOutsideClick: false,
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        allowOutsideClick: false,
        text: error?.response?.data?.message || "There was an error during the withdrawal. Please try again.",
      });
    } finally {
      setIsModalOpen(false);

      setLoading(false);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-text-white/10 p-3">
          <div className=" bg-bg-color1 rounded-lg shadow-lg p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">{MainContent.AppName}</h3>
              <p className="text-slate-200 mb-2">
                Current wallet balance: ${" "}
                <span className="font-semibold">{user?.totalIncome.toFixed(2) || "0"}</span>
              </p>
              <p className="text-slate-200 mb-6">
                Withdrawal amount:{" "}
                <span className="font-semibold">{amount} USDT</span>
              </p>

              <div className="flex gap-5 items-center justify-center">
                <Button className="bg-bg-color py-2 px-5 rounded-md text-white/80"
                  title={"Confirm Withdrawal"}
                  onClick={handleWithdrawal}
                  disabled={loading}
                />
                <Button
                  className="bg-red-500 py-2 px-5 rounded-md hover:bg-red-600 text-white"
                  title={"Cancel"}
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && <p>
        <Loader />
      </p>}
    </>
  );
};

export default UsdtWithdrawal;
