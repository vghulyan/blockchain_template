const { ethers, upgrades } = require("hardhat");

async function main() {
  const UpgradableContractV1 = await ethers.getContractFactory(
    "UpgradableContractV1"
  );
  const upgradableContractV1 = await upgrades.deployProxy(
    UpgradableContractV1,
    [42]
  );
  await upgradableContractV1.waitForDeployment();
  console.log(
    "upgradableContractV1 deployed to:",
    await upgradableContractV1.getAddress()
  );
}

main();
