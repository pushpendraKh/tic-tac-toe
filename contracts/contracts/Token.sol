// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    constructor() ERC20("Tic Tac Toe Token", "HRPP") {}

    function mint(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount);
    }
}