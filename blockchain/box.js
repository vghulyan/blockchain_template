const { ethers } = require("ethers");
require("dotenv").config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.BOX_PROXY;

// import the ABI of contractV1
const { abi } = require("./artifacts/contracts/Box.sol/Box.json");

const BoxV2_JSON = require("./artifacts/contracts/BoxV2.sol/BoxV2.json");

const provider = new ethers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// create an instance of the upgradeable contract
const boxInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

const main_v1 = async () => {
  try {
    let b = await boxInstance.retrieve();
    console.log("Box: Contract 1: Initial Value: ", parseInt(b));

    const tx = await boxInstance.store(35);
    await tx.wait();

    let a = await boxInstance.retrieve();
    console.log("Box: Contract 2: After Setting the value: ", parseInt(a));
  } catch (error) {
    console.error("\n\n---- ERROR: ", error);
  }
};

// ********* Then Run main_v2

// ====================================================
// *** CONTRACT UPGRADED 2
// ====================================================
const box2Instance = new ethers.Contract(
  CONTRACT_ADDRESS,
  BoxV2_JSON?.abi,
  signer
);
const main_v2 = async () => {
  let b = await box2Instance.retrieve();
  console.log("Box 2: Contract 2: Coming from blockchain: ", parseInt(b));

  const tx = await box2Instance.increment();
  await tx.wait();

  let a = await box2Instance.retrieve();
  console.log(
    "Box 2: Contract 2: After calling upgraded contracts increase(): ",
    parseInt(a)
  );
};

// ==============================
// ******* HOW TO RUN ***********
// 1. Uncomment: main_v1() then run
// 2. Then comment out the v1 and execute v2
// ==============================
//main_v1();
main_v2();
