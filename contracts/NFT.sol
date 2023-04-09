// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721, Ownable {
    constructor() ERC721("CoinDCX NFT", "TTT") {}

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    function _baseURI() internal pure override returns (string memory) {
        return "https://coindcx.s3.amazonaws.com/static/images/4d0a156c-0f15-4de1-b033-7ce4f5e8bb6b/complete_deposit.svg";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}