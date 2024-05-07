const { ethers, upgrades } = require("hardhat");

// TO DO: Place the address of your proxy here!
const proxyAddress = process.env?.PROXY_CONTRACT;

async function main() {
  const UpgradableContractV2 = await ethers.getContractFactory(
    "UpgradableContractV2"
  );
  const upgradableContractV2 = await upgrades.upgradeProxy(
    proxyAddress,
    UpgradableContractV2
  );

  console.log("Upgraded contract address: ", upgradableContractV2);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
