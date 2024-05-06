const fs = require("fs-extra");
const path = require("path");

/**
 * Copy Contract address to frontend/src/contracts
 */

// Update paths assuming the script is now located in the blockchain/utils directory
const sourcePath = path.join(
  __dirname,
  "../ignition/deployments/chain-11155111/deployed_addresses.json"
);
const destinationPath = path.join(
  __dirname,
  "../../frontend/src/contracts",
  "contractAddress.json"
);

// Function to copy and modify the JSON key
async function modifyJsonAndCopy() {
  try {
    // Ensure the destination directory exists
    await fs.ensureDir(path.dirname(destinationPath));

    // Read the JSON file
    const jsonData = await fs.readJson(sourcePath);

    // Modify the key
    const newKey = "MyFirstContract";
    const oldKey = `${newKey}#${newKey}`;
    if (jsonData[oldKey]) {
      jsonData[newKey] = jsonData[oldKey]; // Assign old key's value to the new key
      delete jsonData[oldKey]; // Remove the old key
    }

    // Write the modified JSON to the new location
    await fs.writeJson(destinationPath, jsonData, { spaces: 2 }); // Use { spaces: 2 } for pretty-printing
    console.log(
      `File was successfully modified and copied to: ${destinationPath}`
    );
  } catch (error) {
    console.error("Error processing JSON file:", error);
  }
}

// Run the function
modifyJsonAndCopy();
