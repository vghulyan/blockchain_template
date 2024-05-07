// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

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
