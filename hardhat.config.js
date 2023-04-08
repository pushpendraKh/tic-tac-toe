require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-solhint");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {},
    polygon_testnet: {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: ["0x9bf975c2a5b4beb904f2f01dc91b87d979aa29007c1d4b58bd381c8d82cf05dd"]
    },
    local: {
      url: "http://127.0.0.1:8545",
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"], //this is temporary
    },
    polygon: {
      url: "https://rpc-mainnet.maticvigil.com/",
      accounts: ["a809eb8bee25fdbff28ab7e61d3f8c3bfdaaa9a059715452d6ff0c4f8a5bdb23"],
      gasPrice: 8000000000
    },
    avax_testnet: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: ["01648c840511a5c6d513a73a3392562f03ac654ec47a94ef20cc0fc059df8313"]
    },
    kovan: {
      url: "https://kovan.infura.io/v3/62c36671929247c28067de709013b0ef",
      accounts: ["01648c840511a5c6d513a73a3392562f03ac654ec47a94ef20cc0fc059df8313"]
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/76db5d9ad2524f0c9797e6d1e68330f6",
      accounts: [process.env.SEPOLIA_PRIVATE_KEY]
    }
  }
};