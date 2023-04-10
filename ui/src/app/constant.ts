export default {
  abi: [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        },
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "address payable",
                  "name": "playerAddress",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "playerName",
                  "type": "string"
                }
              ],
              "internalType": "struct TicTacToe.Player[2]",
              "name": "players",
              "type": "tuple[2]"
            },
            {
              "internalType": "uint256",
              "name": "activePlayer",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isRoomActive",
              "type": "bool"
            },
            {
              "components": [
                {
                  "internalType": "address payable",
                  "name": "playerAddress",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "playerName",
                  "type": "string"
                }
              ],
              "internalType": "struct TicTacToe.Player",
              "name": "winnerPlayer",
              "type": "tuple"
            },
            {
              "internalType": "uint256[9]",
              "name": "board",
              "type": "uint256[9]"
            },
            {
              "internalType": "uint256",
              "name": "lastPlayedTime",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "movedRecorded",
              "type": "uint8"
            },
            {
              "internalType": "enum TicTacToe.GameState",
              "name": "state",
              "type": "uint8"
            }
          ],
          "indexed": false,
          "internalType": "struct TicTacToe.Room",
          "name": "room",
          "type": "tuple"
        }
      ],
      "name": "GameEnded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        },
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "address payable",
                  "name": "playerAddress",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "playerName",
                  "type": "string"
                }
              ],
              "internalType": "struct TicTacToe.Player[2]",
              "name": "players",
              "type": "tuple[2]"
            },
            {
              "internalType": "uint256",
              "name": "activePlayer",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isRoomActive",
              "type": "bool"
            },
            {
              "components": [
                {
                  "internalType": "address payable",
                  "name": "playerAddress",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "playerName",
                  "type": "string"
                }
              ],
              "internalType": "struct TicTacToe.Player",
              "name": "winnerPlayer",
              "type": "tuple"
            },
            {
              "internalType": "uint256[9]",
              "name": "board",
              "type": "uint256[9]"
            },
            {
              "internalType": "uint256",
              "name": "lastPlayedTime",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "movedRecorded",
              "type": "uint8"
            },
            {
              "internalType": "enum TicTacToe.GameState",
              "name": "state",
              "type": "uint8"
            }
          ],
          "indexed": false,
          "internalType": "struct TicTacToe.Room",
          "name": "room",
          "type": "tuple"
        }
      ],
      "name": "GameInitiated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        },
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "address payable",
                  "name": "playerAddress",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "playerName",
                  "type": "string"
                }
              ],
              "internalType": "struct TicTacToe.Player[2]",
              "name": "players",
              "type": "tuple[2]"
            },
            {
              "internalType": "uint256",
              "name": "activePlayer",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isRoomActive",
              "type": "bool"
            },
            {
              "components": [
                {
                  "internalType": "address payable",
                  "name": "playerAddress",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "playerName",
                  "type": "string"
                }
              ],
              "internalType": "struct TicTacToe.Player",
              "name": "winnerPlayer",
              "type": "tuple"
            },
            {
              "internalType": "uint256[9]",
              "name": "board",
              "type": "uint256[9]"
            },
            {
              "internalType": "uint256",
              "name": "lastPlayedTime",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "movedRecorded",
              "type": "uint8"
            },
            {
              "internalType": "enum TicTacToe.GameState",
              "name": "state",
              "type": "uint8"
            }
          ],
          "indexed": false,
          "internalType": "struct TicTacToe.Room",
          "name": "room",
          "type": "tuple"
        }
      ],
      "name": "GameStarted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        },
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "address payable",
                  "name": "playerAddress",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "playerName",
                  "type": "string"
                }
              ],
              "internalType": "struct TicTacToe.Player[2]",
              "name": "players",
              "type": "tuple[2]"
            },
            {
              "internalType": "uint256",
              "name": "activePlayer",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isRoomActive",
              "type": "bool"
            },
            {
              "components": [
                {
                  "internalType": "address payable",
                  "name": "playerAddress",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "playerName",
                  "type": "string"
                }
              ],
              "internalType": "struct TicTacToe.Player",
              "name": "winnerPlayer",
              "type": "tuple"
            },
            {
              "internalType": "uint256[9]",
              "name": "board",
              "type": "uint256[9]"
            },
            {
              "internalType": "uint256",
              "name": "lastPlayedTime",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "movedRecorded",
              "type": "uint8"
            },
            {
              "internalType": "enum TicTacToe.GameState",
              "name": "state",
              "type": "uint8"
            }
          ],
          "indexed": false,
          "internalType": "struct TicTacToe.Room",
          "name": "room",
          "type": "tuple"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "moveIndex",
          "type": "uint256"
        }
      ],
      "name": "PlayerMoved",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "GAME_TIMEOUT",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "STAKE",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "contractBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        }
      ],
      "name": "getBoardForRoom",
      "outputs": [
        {
          "internalType": "uint256[9]",
          "name": "",
          "type": "uint256[9]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        }
      ],
      "name": "isGameRunning",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "address payable",
              "name": "playerAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "playerName",
              "type": "string"
            }
          ],
          "internalType": "struct TicTacToe.Player",
          "name": "player",
          "type": "tuple"
        }
      ],
      "name": "joinRoom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "boardIndex",
          "type": "uint8"
        }
      ],
      "name": "move",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "rooms",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "activePlayer",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isRoomActive",
          "type": "bool"
        },
        {
          "components": [
            {
              "internalType": "address payable",
              "name": "playerAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "playerName",
              "type": "string"
            }
          ],
          "internalType": "struct TicTacToe.Player",
          "name": "winnerPlayer",
          "type": "tuple"
        },
        {
          "internalType": "uint256",
          "name": "lastPlayedTime",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "movedRecorded",
          "type": "uint8"
        },
        {
          "internalType": "enum TicTacToe.GameState",
          "name": "state",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalGames",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        }
      ],
      "name": "updateRoomIfExpired",
      "outputs": [
        {
          "internalType": "enum TicTacToe.GameState",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  contractAddress: '0x5e3Ad148730EcEFDA58fDD3e38779197e3aa5Bec',
};

