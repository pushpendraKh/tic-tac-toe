import { Injectable } from '@angular/core';
import Web3 from 'web3';
import CONSTANTS from '../constant';
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

declare const window: any;
@Injectable({
  providedIn: 'root',
})
export class ContractService {
  public loader$ = new BehaviorSubject<boolean>(false);
  public moveIndex$ = new BehaviorSubject<boolean>(false);
  public gameStarted$ = new BehaviorSubject<boolean>(false);

  window: any;

  constructor(private router: Router) {
    console.log("ContractService :: constructor");
    window.web3 = new Web3(Web3.givenProvider || 'HTTP://127.0.0.1:7545');
    this.listenForEvents();
  };

  private listenForEvents = () => {
    let options = {
      filter: {
          value: [],
      },
    }
    
    let contract = this.getContract();

    contract.events.GameInitiated(options)
    .on('data', (response: any) => {
      console.log("Event::GameInitiated", response);

      this.router.navigateByUrl(`/game/${response.returnValues?.gameId ?? 1}`);
      this.gameStarted$.next(false);
    });

    contract.events.GameStarted(options)
    .on('data', (response: any) => {
      console.log("Event::GameStarted", response);

      this.router.navigateByUrl(`/game/${response.returnValues?.gameId ?? 1}`);
      this.gameStarted$.next(true);
    });

    contract.events.PlayerMoved(options)
    .on('data', (response: any) => {
      console.log("Event::PlayerMoved", response);
      
      if(response.returnValues) {
        this.moveIndex$.next(true);
      }
    });

    contract.events.GameEnded(options)
    .on('data', (response: any) => {
      console.log("Event::GameEnded", response);
      this.router.navigateByUrl(`/dashboard`);
    });
  }

  private getAccounts = async () => {
    try {
      return await window.ethereum.request({ method: 'eth_accounts' });
    } catch (e) {
      return [];
    }
  };

  private getContract = () => {
    return new window.web3.eth.Contract(
      CONSTANTS.abi,
      CONSTANTS.contractAddress
    );
  };

  // Can be removed.
  public openMetamask = async () => {
    this.loader$.next(true);
    let addresses = await this.getAccounts();
    if (!addresses.length) {
      try {
        addresses = await window.ethereum.enable();
      } catch (e) {
        console.log("Unable to fetch address");
        return false;
      }
    }
    return addresses.length ? addresses[0] : null;
  };

  /// Contract functions

  public joinGame = async (data: any) => {
    this.loader$.next(true);
    let accaddress = await this.getAccounts();
    try {
      await this.getContract().methods
        .joinRoom({ playerAddress: accaddress[0], playerName: data.name })
        .send({ from: accaddress[0], gas: 3000000 });
    } catch (error) {
      alert(error);
      console.log("joinGame::", error);
    }
  };

  public move = async (gameId: number, data: any) => {
    this.loader$.next(true);
    let accaddress = await this.getAccounts();
    try {
      const response = await this.getContract().methods
        .move(gameId, data)
        .send({ from: accaddress[0], gas: 3000000  });
      console.log("Player moved on ",response);
    } catch (error) {
      alert(error);
      console.log("move::", error);
    }
  };

  // Used to call in order to know if game is active or expired
  public ping = async (gameId: number) => {
    let accaddress = await this.getAccounts();
    try {
      const response = await this.getContract().methods
        .updateRoomIfExpired(gameId)
        .send({ from: accaddress[0],gas: 3000000  });
      console.log("Game State", response?.events?.PlayerMoved?.returnValues?.room.state);
    } catch (error) {
      alert(error);
      console.log("Ping::", error);
    }
  };

  // In order to know current state of the game. 
  public isGameRunning = async (gameId: number) => {
    try {
      let accaddress = await this.getAccounts();
      if(!accaddress) return false;  
      
      const response = await this.getContract().methods
        .isGameRunning(gameId)
        .call({ from: accaddress[0], gas: 3000000 });

      console.log("isGameRunning", response);
      return response;
    } catch (error) {
      alert(error);
      console.log("isGameRunning::", error);
    }
  };

  // In order to know if game exists or does not. Useful when user joins the game by url
  public isGameValid = async (gameId: any) => {
    try {
      let accaddress = await this.getAccounts();
      
      if(!accaddress) return false;  
      
      const response = await this.getContract().methods
        .totalGames()
        .call({ from: accaddress[0] });
      
      console.log("Total games", response);  
      return response >= gameId;
    } catch (error) {
      alert(error);
      console.log("isGameValid::", error);
      return false;
    }
  };

  // Given a game id, exact details about the room
  public getRoom = async (gameId: number) => {
    try {
      let accaddress = await this.getAccounts();
      if(!accaddress) return false;  
      
      const response = await this.getContract().methods
        .rooms(gameId)
        .call({ from: accaddress[0] });
      
      console.log("rooms", response);
        
      return response;
    } catch (error) {
      alert(error);
      console.log("getRoom::", error);
    }
  };

  // Given game id, extract current state of the game's board
  public getCurrentBoardState = async (gameId: number) => {
    try {
      let accaddress = await this.getAccounts();
      if(!accaddress) return false;  
      
      const board = await this.getContract().methods
        .getBoard(gameId)
        .call({ from: accaddress[0] });
      
      console.log("board state::", board);
        
      return board;
    } catch (error) {
      alert(error);
      console.log("getCurrentBoardState::", error);
      return [];
    }
  };

  // Possible game state to show to user in entire game journey from not started to winning/draw
  public gameState = async (gameId: number) => {
    try {
      let accaddress = await this.getAccounts();
      if(!accaddress) return false;  
      
      const state = await this.getContract().methods
        .gameState(gameId)
        .call({ from: accaddress[0] });
      
      console.log("gameState::", state);
        
      return state;
    } catch (error) {
      alert(error);
      console.log("getCurrentBoardState::", error);
      return [];
    }
  };

  // Returns active player's name
  public currentActivePlayer = async (gameId: number) => {
    try {
      let accaddress = await this.getAccounts();
      if(!accaddress) return false;  
      
      const activePlayer = await this.getContract().methods
        .currentActivePlayer(gameId)
        .call({ from: accaddress[0] });
      
      console.log("activePlayer::", activePlayer);
        
      return activePlayer;
    } catch (error) {
      alert(error);
      console.log("currentActivePlayer::", error);
      return [];
    }
  };
  
  // Returns winner name if any for a game
  public winnerName = async (gameId: number) => {
    try {
      let accaddress = await this.getAccounts();
      if(!accaddress) return false;  
      
      const winner = await this.getContract().methods
        .winnerName(gameId)
        .call({ from: accaddress[0] });
      
      console.log("Winner Name::", winner);
        
      return winner;
    } catch (error) {
      alert(error);
      console.log("winnerName::", error);
      return [];
    }
  };

  public totalGames = async () => {
    try {
      let accaddress = await this.getAccounts();
      
      if(!accaddress) return false;  
      
      const response = await this.getContract().methods
        .totalGames()
        .call({ from: accaddress[0] });
      
      return response;
    } catch (error) {
      alert(error);
      console.log("totalGames::", error);
      return false;
    }
  };
}
