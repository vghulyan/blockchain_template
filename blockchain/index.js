const { ethers } = require("ethers");
require("dotenv").config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.PROXY_CONTRACT;

// import the ABI of contractV1
const {
  abi,
} = require("./artifacts/contracts/UpgradableContractV1.sol/UpgradableContractV1.json");

const UpgradableContractV2_JSON = require("./artifacts/contracts/UpgradableContractV2.sol/UpgradableContractV2.json");
const UpgradableContractV3_JSON = require("./artifacts/contracts/UpgradableContractV3.sol/UpgradableContractV3.json");

const provider = new ethers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// create an instance of the upgradeable contract
const upgradableContractV1Instance = new ethers.Contract(
  CONTRACT_ADDRESS,
  abi,
  signer
);

const main_v1 = async () => {
  let b = await upgradableContractV1Instance.getValue();
  console.log("Contract 1: Initial Value: ", parseInt(b));

  const tx = await upgradableContractV1Instance.setValue(25);
  await tx.wait();

  let a = await upgradableContractV1Instance.getValue();
  console.log("Contract 2: After Setting the value: ", parseInt(a));
};

// ====================================================
// *** CONTRACT UPGRADED 2
// ====================================================
const upgradableContractV2Instance = new ethers.Contract(
  CONTRACT_ADDRESS,
  UpgradableContractV2_JSON?.abi,
  signer
);
const main_v2 = async () => {
  let b = await upgradableContractV2Instance.getValue();
  console.log("Contract 2: Coming from blockchain: ", parseInt(b));

  const tx = await upgradableContractV2Instance.increaseValue(250);
  await tx.wait();

  let a = await upgradableContractV2Instance.getValue();
  console.log(
    "Contract 2: After calling upgraded contracts increase(): ",
    parseInt(a)
  );
};

// ====================================================
// *** CONTRACT UPGRADED 3
// ====================================================
const upgradableContractV3Instance = new ethers.Contract(
  CONTRACT_ADDRESS,
  UpgradableContractV3_JSON?.abi,
  signer
);
const main_v3 = async () => {
  let b = await upgradableContractV3Instance.getValue();
  console.log("Contract 3: Coming from blockchain: ", parseInt(b));

  const tx = await upgradableContractV3Instance.increaseValue(999);
  await tx.wait();

  let a = await upgradableContractV3Instance.getValue();
  console.log(
    "Contract 3: After calling upgraded contracts increase(): ",
    parseInt(a)
  );
};

// ==============================
// ******* HOW TO RUN ***********
// 1. Uncomment: main_v1() then run
// 2. Then comment out the v1 and execute v2
// ==============================
// main_v1();
// main_v2();
main_v3();
