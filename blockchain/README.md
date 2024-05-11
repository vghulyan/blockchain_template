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

## Box and BoxV2 !!!

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

### How to run OpenZeppelin Upgradable Contract

```
    URL: https://github.com/OpenZeppelin/openzeppelin-upgrades/tree/master/packages/plugin-hardhat
    Step 1. Install dependencies
        npm install --save-dev @openzeppelin/hardhat-upgrades
        npm install --save-dev @nomicfoundation/hardhat-ethers ethers # peer dependencies

    Step 2. Register in hardhat.config.js
        // Javascript
        require('@openzeppelin/hardhat-upgrades');

        // Typescript
        import '@openzeppelin/hardhat-upgrades';

    Step 3. Create the First Contract which is an OpenZeppelin instance of Initializer
        import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
        contract UpgradableContractV1 is Initializable {
            uint256 public value;
            function initialize(uint256 _value) public initializer {
                value = _value;
            }
            function setValue(uint256 _value) public {
                value = _value;
            }
            function getValue() public view returns (uint256) {
                return value;
            }
        }

    Step 4. Create the Second Contract which extends from: UpgradableContractV1
        import "./UpgradableContractV1.sol";
        contract UpgradableContractV2 is UpgradableContractV1 {
            function increaseValue(uint256 _value) public {
                value += _value;
            }
        }

    Step 5. Create the deployable contracts under: ./ignition/modules/UpgradableContractV1.js
        package.json - script: "deploy:UpgradableV1": "npx hardhat run ./ignition/modules/UpgradableContractV1.js --network sepolia",

        const { ethers, upgrades } = require("hardhat");
        async function main() {
            const UpgradableContractV1 = await ethers.getContractFactory("UpgradableContractV1");
            const upgradableContractV1 = await upgrades.deployProxy(UpgradableContractV1, [42]);
            await upgradableContractV1.waitForDeployment();
            console.log("upgradableContractV1 deployed to:", await upgradableContractV1.getAddress());
        }
        main();

    Step 6. Create the second deployable contract, i.e. upgradable contract: ./ignition/modules/UpgradableContractV2.js
        package.json - script: "deploy:UpgradableV2": "npx hardhat run ./ignition/modules/UpgradableContractV2.js --network sepolia",

        const { ethers, upgrades } = require("hardhat");
        const proxyAddress = process.env?.PROXY_CONTRACT;
        async function main() {
            const UpgradableContractV2 = await ethers.getContractFactory("UpgradableContractV2");
            const upgradableContractV2 = await upgrades.upgradeProxy(proxyAddress, UpgradableContractV2);
            console.log("Upgraded contract address: ", upgradableContractV2); // upgradableContractV2?.address
        }
        main().then(() => process.exit(0)).catch((error) => {
            console.error(error);
            process.exit(1);
        });

    Step 7. Compile the contracts:
        $> npm run compile

    Step 8. Deploy the first contract: i.e. UpgradableContractV1.sol
        $> npm run deploy:UpgradableV1
        >>>>>>> Grab the Address and save it in .env:PROXY_CONTRACT="paste the contract address here!!!"

    Step 9. Deploy the second contract: i.e. UpgradableContractV2.sol
        The UpgradableContractV2 contract deployed to the same address
    ------- OR ------
    Step 9.1. Deploy the third contract: ;i.e. UpgradableContractV3.sol
        This contract doesn't inheerits the: initialize() from the OpenZeppelin.
        When Upgrading, no need to initialize again a new value, use setters and getters.
            The existing value is already been initialized in the blockchain

    Step 10. Run the index.js script
        a). First uncomment the: main_v1();
        b). Then comment out the main_v1() and run: main_v2();
```
