const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MyFirstContract", (m) => {
  const myFirstContract = m.contract("MyFirstContract", []);
  return { myFirstContract };
});
