const { ethers, upgrades } = require("hardhat");

async function main() {
  const proxyAddress = process.env?.BOX_PROXY;

  const BoxV2 = await ethers.getContractFactory("BoxV2");
  console.log("Preparing upgrade...", proxyAddress);
  //const boxV2Address = await upgrades.prepareUpgrade(proxyAddress, BoxV2);
  const boxV2Address = await upgrades.upgradeProxy(proxyAddress, BoxV2);
  console.log("BoxV2 at:", boxV2Address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
