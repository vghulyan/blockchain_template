// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract MyFirstContract {
    string public blockChainMsg = "Hello World from the Blockchain";

    function getBlockChainMessage() public view returns (string memory) {
        return blockChainMsg;
    }
}
