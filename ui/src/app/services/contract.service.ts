import { Injectable } from '@angular/core';
import Web3 from 'web3';

declare const window: any;
@Injectable({
  providedIn: 'root',
})
export class ContractService {
  window: any;
  gameID: any;
  Address = '0xF0f9423247f48eB62fBabE4675db511C3712a63E';
  abi = [
    {
      inputs: [],
      name: 'get',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_num',
          type: 'uint256',
        },
      ],
      name: 'set',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];

  joinGameAbi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'gameId',
          type: 'uint256',
        },
        {
          components: [
            {
              components: [
                {
                  internalType: 'address payable',
                  name: 'playerAddress',
                  type: 'address',
                },
                {
                  internalType: 'string',
                  name: 'playerName',
                  type: 'string',
                },
              ],
              internalType: 'struct TicTacToe.Player[2]',
              name: 'players',
              type: 'tuple[2]',
            },
            {
              internalType: 'uint256',
              name: 'activePlayer',
              type: 'uint256',
            },
            {
              internalType: 'bool',
              name: 'isRoomActive',
              type: 'bool',
            },
            {
              components: [
                {
                  internalType: 'address payable',
                  name: 'playerAddress',
                  type: 'address',
                },
                {
                  internalType: 'string',
                  name: 'playerName',
                  type: 'string',
                },
              ],
              internalType: 'struct TicTacToe.Player',
              name: 'winnerPlayer',
              type: 'tuple',
            },
            {
              internalType: 'uint256[9]',
              name: 'board',
              type: 'uint256[9]',
            },
            {
              internalType: 'uint256',
              name: 'lastPlayedTime',
              type: 'uint256',
            },
            {
              internalType: 'uint8',
              name: 'movedRecorded',
              type: 'uint8',
            },
            {
              internalType: 'enum TicTacToe.GameState',
              name: 'state',
              type: 'uint8',
            },
          ],
          indexed: false,
          internalType: 'struct TicTacToe.Room',
          name: 'room',
          type: 'tuple',
        },
      ],
      name: 'GameEnded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'gameId',
          type: 'uint256',
        },
        {
          components: [
            {
              components: [
                {
                  internalType: 'address payable',
                  name: 'playerAddress',
                  type: 'address',
                },
                {
                  internalType: 'string',
                  name: 'playerName',
                  type: 'string',
                },
              ],
              internalType: 'struct TicTacToe.Player[2]',
              name: 'players',
              type: 'tuple[2]',
            },
            {
              internalType: 'uint256',
              name: 'activePlayer',
              type: 'uint256',
            },
            {
              internalType: 'bool',
              name: 'isRoomActive',
              type: 'bool',
            },
            {
              components: [
                {
                  internalType: 'address payable',
                  name: 'playerAddress',
                  type: 'address',
                },
                {
                  internalType: 'string',
                  name: 'playerName',
                  type: 'string',
                },
              ],
              internalType: 'struct TicTacToe.Player',
              name: 'winnerPlayer',
              type: 'tuple',
            },
            {
              internalType: 'uint256[9]',
              name: 'board',
              type: 'uint256[9]',
            },
            {
              internalType: 'uint256',
              name: 'lastPlayedTime',
              type: 'uint256',
            },
            {
              internalType: 'uint8',
              name: 'movedRecorded',
              type: 'uint8',
            },
            {
              internalType: 'enum TicTacToe.GameState',
              name: 'state',
              type: 'uint8',
            },
          ],
          indexed: false,
          internalType: 'struct TicTacToe.Room',
          name: 'room',
          type: 'tuple',
        },
      ],
      name: 'GameInitiated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'gameId',
          type: 'uint256',
        },
        {
          components: [
            {
              components: [
                {
                  internalType: 'address payable',
                  name: 'playerAddress',
                  type: 'address',
                },
                {
                  internalType: 'string',
                  name: 'playerName',
                  type: 'string',
                },
              ],
              internalType: 'struct TicTacToe.Player[2]',
              name: 'players',
              type: 'tuple[2]',
            },
            {
              internalType: 'uint256',
              name: 'activePlayer',
              type: 'uint256',
            },
            {
              internalType: 'bool',
              name: 'isRoomActive',
              type: 'bool',
            },
            {
              components: [
                {
                  internalType: 'address payable',
                  name: 'playerAddress',
                  type: 'address',
                },
                {
                  internalType: 'string',
                  name: 'playerName',
                  type: 'string',
                },
              ],
              internalType: 'struct TicTacToe.Player',
              name: 'winnerPlayer',
              type: 'tuple',
            },
            {
              internalType: 'uint256[9]',
              name: 'board',
              type: 'uint256[9]',
            },
            {
              internalType: 'uint256',
              name: 'lastPlayedTime',
              type: 'uint256',
            },
            {
              internalType: 'uint8',
              name: 'movedRecorded',
              type: 'uint8',
            },
            {
              internalType: 'enum TicTacToe.GameState',
              name: 'state',
              type: 'uint8',
            },
          ],
          indexed: false,
          internalType: 'struct TicTacToe.Room',
          name: 'room',
          type: 'tuple',
        },
      ],
      name: 'GameStarted',
      type: 'event',
    },
    {
      inputs: [],
      name: 'GAME_TIMEOUT',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'STAKE',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'contractBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'gameId',
          type: 'uint256',
        },
      ],
      name: 'getBoardForRoom',
      outputs: [
        {
          internalType: 'uint256[9]',
          name: '',
          type: 'uint256[9]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'gameId',
          type: 'uint256',
        },
      ],
      name: 'isGameRunning',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: 'address payable',
              name: 'playerAddress',
              type: 'address',
            },
            {
              internalType: 'string',
              name: 'playerName',
              type: 'string',
            },
          ],
          internalType: 'struct TicTacToe.Player',
          name: 'player',
          type: 'tuple',
        },
      ],
      name: 'joinRoom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'gameId',
          type: 'uint256',
        },
        {
          internalType: 'uint8',
          name: 'boardIndex',
          type: 'uint8',
        },
      ],
      name: 'move',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'gameId',
          type: 'uint256',
        },
      ],
      name: 'updateRoomIfExpired',
      outputs: [
        {
          internalType: 'enum TicTacToe.GameState',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];
  constructor() {}

  private getAccounts = async () => {
    try {
      return await window.ethereum.request({ method: 'eth_accounts' });
    } catch (e) {
      return [];
    }
  };

  public openMetamask = async () => {
    window.web3 = new Web3(window.ethereum);
    let addresses = await this.getAccounts();
    if (!addresses.length) {
      try {
        addresses = await window.ethereum.enable();
      } catch (e) {
        return false;
      }
    }
    return addresses.length ? addresses[0] : null;
  };

  public joinGame = async (data: any) => {
    let accaddress = await this.getAccounts();
    try {
      const contract = new window.web3.eth.Contract(
        this.joinGameAbi,
        this.Address
      );
      const token = await contract.methods
        .joinRoom({ playerAddress: accaddress[0], playerName: data.name })
        .send({ from: accaddress[0] });
      this.gameID = token?.events?.GameStarted?.returnValues?.gameId;
      return token;
    } catch (error) {
      const errorMessage = error;
    }
  };

  public move = async (data: any) => {
    let accaddress = await this.getAccounts();
    try {
      const contract = new window.web3.eth.Contract(
        this.joinGameAbi,
        this.Address
      );
      const token = await contract.methods
        .move(this.gameID, data)
        .send({ from: accaddress[0] });
      return token?.events?.GameEnded?.returnValues?.room?.winnerPlayer
        ?.playerName;
    } catch (error) {
      const errorMessage = error;
    }
  };
}
