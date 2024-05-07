const { ethers, upgrades } = require("hardhat");

// TO DO: Place the address of your proxy here!
const proxyAddress = process.env?.PROXY_CONTRACT;

async function main() {
  const UpgradableContractV3 = await ethers.getContractFactory(
    "UpgradableContractV3"
  );
  const upgradableContractV3 = await upgrades.upgradeProxy(
    proxyAddress,
    UpgradableContractV3
  );

  console.log("Upgraded contract address: ", upgradableContractV3);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
