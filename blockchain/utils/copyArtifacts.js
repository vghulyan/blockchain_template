require("dotenv").config();
const fs = require("fs-extra");
const path = require("path");

/**
 * Copy abi to frontend/src/contracts
 */

const contractName = process.env.CONTRACT_NAME ?? "MyFirstContract"; // Assume CONTRACT_NAME is set in your .env

const artifactsDir = path.resolve(
  __dirname,
  `../artifacts/contracts/${contractName}.sol`
);

const frontendContractDir = path.resolve(
  __dirname,
  "../../frontend/src/contracts"
);

async function copyArtifacts() {
  try {
    await fs.ensureDir(frontendContractDir); // Ensure the target directory exists
    const filesToCopy = ["MyFirstContract.json"]; // List of files you want to copy

    for (let file of filesToCopy) {
      const sourcePath = path.join(artifactsDir, file);
      const destPath = path.join(frontendContractDir, file);
      await fs.copy(sourcePath, destPath);
      console.log(`Copied ${file} to ${frontendContractDir}`);
    }
  } catch (error) {
    console.error("Failed to copy contract artifacts:", error);
  }
}

copyArtifacts();
