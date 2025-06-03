import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import Button from "../Button";
import { buyCloudMiningPackage } from "../../Api/user.api";
import axios from "axios";
import Loader from "../Loader";

const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
const convertUSDToUSDT = async (amountInUSD) => {
  try {
    // Fetch the current price of USDT in USD from CoinGecko API
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "tether",
          vs_currencies: "usd",
        },
      }
    );

    // Get the price of 1 USDT in USD
    const priceInUSD = response.data.tether.usd;

    // Convert the USD amount to USDT
    const amountInUSDT = amountInUSD / priceInUSD; // Since 1 USDT is roughly 1 USD
    return amountInUSDT;
  } catch (error) {
    console.error("Error fetching USDT price:", error);
    throw new Error("Failed to fetch USDT price");
  }
};
const USDT_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

// eslint-disable-next-line react/prop-types
const USDTCloudMiningPayment = ({ amount, onSuccess, onFailure }) => {
  const [loading, setLoading] = useState(false);
  const [USDTAmount, setUSDTAmount] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState(
    import.meta.env.VITE_PAYMENT_ADDRESS
  );
  useEffect(() => {
    setRecipientAddress(import.meta.env.VITE_PAYMENT_ADDRESS);
  }, []);

  const convertAndLog = async (amount) => {
    try {
      const usdtAmount = await convertUSDToUSDT(amount);
      setUSDTAmount(usdtAmount?.toFixed(2));
    } catch (error) {
      console.error("Error during conversion:", error);
    }
  };

  useEffect(() => {
    if (!amount) return;
    convertAndLog(amount);
  }, [amount]);

  const handleConnectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x38" }], // BSC Mainnet
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x38",
                    chainName: "Binance Smart Chain",
                    nativeCurrency: {
                      name: "BNB",
                      symbol: "BNB",
                      decimals: 18,
                    },
                    rpcUrls: ["https://bsc-dataseed1.binance.org/"],
                    blockExplorerUrls: ["https://bscscan.com/"],
                  },
                ],
              });
            } catch (addError) {
              console.error("Error adding BSC network:", addError);
              throw new Error("Failed to add BSC network");
            }
          } else {
            throw switchError;
          }
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        // console.log("Connected wallet address:", userAddress);

        setWalletConnected(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Connection Failed",
          text: "MetaMask is not installed.",
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
        throw new Error("MetaMask is not installed.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
        text: error.message || "Failed to connect wallet. Please try again.",
      });
    }
  };

  const transactionHandler = async (payload) => {
    try {
      await buyCloudMiningPackage(payload);
      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: `Transaction confirmed. You have successfully sent ${USDTAmount} USDT.`,
        confirmButtonText: "Ok",
        allowOutsideClick: false,
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error during USDT payment:", error);
    }
  };

  const handlePayment = async () => {
    console.log("Recipient Address:", recipientAddress);
    if (!recipientAddress) {
      Swal.fire({
        icon: "error",
        title: "Invalid Address",
        text: "Please enter a valid recipient address",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
      return;
    }

    setLoading(true);

    try {
      if (window.ethereum) {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (chainId !== "0x38") {
          throw new Error("Please connect to BSC network first");
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();

        const usdtContract = new ethers.Contract(
          USDT_ADDRESS,
          USDT_ABI,
          signer
        );

        try {
          const decimals = await usdtContract.decimals();

        } catch (error) {
          console.error("Error fetching USDT decimals:", error);
          throw new Error("Invalid USDT contract on BSC network");
        }

        const balance = await usdtContract.balanceOf(userAddress);
        const amountInUSDT = ethers.parseUnits(USDTAmount.toString(), 18);

        if (balance < amountInUSDT) {
          throw new Error("Insufficient USDT balance");
        }

        // Send USDT directly to recipient address
        const tx = await usdtContract.transfer(recipientAddress, amountInUSDT);
        await tx.wait();
        console.log("Transaction hash:", tx.hash);
        console.log(tx);

        transactionHandler({ txResponse: tx, amount: amount });
        onSuccess();
      } else {
        throw new Error("MetaMask is not installed.");
      }
    } catch (error) {
      console.error("Error during USDT transfer:", error);
      Swal.fire({
        icon: "error",
        title: "Transfer Failed",
        text: "Transfer failed. Please try again.",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
      onFailure();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (walletConnected) {
      Swal.fire({
        icon: "success",
        title: "Wallet Connected",
        text: "You are connected to the wallet.",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    }
  }, [walletConnected]);


  return (
    <div>
      <div className="">
        <h3 className="text-center text-lg font-semibold mb-4">
          Pay <b>{USDTAmount}</b> USDT
        </h3>

        <div className="flex items-center gap-5">
          {!walletConnected ? (
            <Button
              className={"w-full bg-bg-color px-10 py-2 rounded"}
              onClick={handleConnectWallet}
              title="Connect Wallet"
            />
          ) : (
            <Button
              className={"w-full bg-bg-color px-10 py-2 rounded"}
              onClick={handlePayment}
              title={"Pay USDT"}
            />
          )}

          <Button
            className="bg-red-600 text-white px-10 py-2 rounded font-semibold  hover:bg-red-700 w-auto"
            title={"Close"}
            onClick={() => onSuccess()}
          />
        </div>
      </div>

      
      {loading && (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default USDTCloudMiningPayment;
