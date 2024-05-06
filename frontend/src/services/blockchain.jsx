import { ethers } from "ethers";
import address from "../contracts/contractAddress.json";
import dappAbi from "../contracts/MyFirstContract.json";

const toWei = (num) => ethers.parseEther(num.toString());
const fromWei = (num) => ethers.formatEther(num);

let ethereum, tx;

if (typeof window !== "undefined") ethereum = window.ethereum;

const getEthereumContracts = async () => {
  const accounts = await ethereum?.request?.({ method: "eth_accounts" });

  if (accounts?.length > 0) {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contracts = new ethers.Contract(
      address.MyFirstContract,
      dappAbi.abi,
      signer
    );

    return contracts;
  } else {
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL
    );
    const wallet = ethers.Wallet.createRandom();
    const signer = wallet.connect(provider);
    const contracts = new ethers.Contract(
      address.MyContract,
      dappAbi.abi,
      signer
    );

    return contracts;
  }
};

const getBlockChainMessage = async () => {
  const contract = await getEthereumContracts();
  const blockChainMessage = await contract.getBlockChainMessage();
  return blockChainMessage;
};

export { getBlockChainMessage };
