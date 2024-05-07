// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "./UpgradableContractV1.sol";

contract UpgradableContractV2 is UpgradableContractV1 {
    function increaseValue(uint256 _value) public {
        value += _value;
    }
}
