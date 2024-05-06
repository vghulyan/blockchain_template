require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { API_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
  // defaultNetwork: "localhost",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    // bitfinity: {
    //   url: 'https://testnet.bitfinity.network',
    //   accounts: [''],
    //   chainId: 355113,
    //   timeout: 120000,
    //   gasPrice: 10 * 10**9,
    // },
  },
  mocha: {
    timeout: 40000,
  },
};
