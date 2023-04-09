// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721 {
    constructor() ERC721("Tic Tack Toe NFT", "TTT") {}

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    function safeMint(address to) public returns (uint256) {
        _tokenIdCounter.increment();
        // get the current value after incrementing token id
        uint256 tokenId = _tokenIdCounter.current();

        _safeMint(to, tokenId);
        return tokenId;
    }
}

