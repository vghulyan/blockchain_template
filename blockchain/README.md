# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

### Create your first contract under ./contracts/MyContract.sol

### Create the build js under ./ignition/MyContract.js

```
    const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
    module.exports = buildModule("MyContract", (m) => {
        const myContract = m.contract("MyContract", []);
        return { myContract };
    });
```

### Update hardhat.config.js

```
    const { API_URL, PRIVATE_KEY } = process.env;
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
```

### Add hardhat compile and deploy to <project root>/package.json

```
    .env
        API_URL=https://rpc2.sepolia.org
        PRIVATE_KEY=<Metamask private key>
        CONTRACT_NAME=MyContract
```

#### This will compile on sepolia network, make sure you have Metamask installed/configured

```
    $> npm install dotenv fs-extra
    $> npm run compile
    $> npm run deploy
    $> npm run copy-address
    $> npm run copy-contract
```
