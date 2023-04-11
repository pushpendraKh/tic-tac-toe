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
  public moveIndex$ = new BehaviorSubject<any>(null);
  public gameStartedObject$ = new BehaviorSubject<any>(null);

  window: any;

  constructor(private router: Router) {
    window.web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

    let options = {
      filter: {
          value: [],
      },
    }
    
    let contract = this.getContract();

    contract.events.GameEnded(options)
    .on('data', (response: any) => {
      let gameState = this.parseData(response.returnValues).gameState
      alert(`Game State: ${gameState}`)
      this.router.navigateByUrl(`/home`);
    });

    contract.events.GameStarted(options)
    .on('data', (response: any) => {
      console.log(response.returnValues, "GameStarted");
      this.router.navigateByUrl(`/game/${this.parseData(response.returnValues).id}`);
      this.gameStartedObject$.next(this.parseData(response.returnValues));
    });

    contract.events.GameInitiated(options)
    .on('data', (response: any) => {
      console.log(response.returnValues, "GameInitiated");
      this.router.navigateByUrl(`/game/${this.parseData(response.returnValues).id}`); 
      this.gameStartedObject$.next(this.parseData(response.returnValues));
    });

    contract.events.PlayerMoved(options)
    .on('data', (response: any) => {
      console.log(response.returnValues, "PlayerMoved");
      if(response.returnValues) {
        this.moveIndex$.next(this.parseData(response.returnValues));
      }
    });
  };


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


  // Event can be GameStarted/GameInitiated/GameEnded/PlayerMoved
  public parseData = (event: any) => {
    if(!event) return {};

    let players = event.room?.players;
    return {
      'id': event?.gameId,
      'name': players[0]?.playerName ?? "_" + "vs" + players[1]?.playerName ?? "_",
      'currentPlayerIndex': event?.room?.activePlayer,
      'currentPlayerName': players[event?.room?.activePlayer ?? 0],
      'winnerName': event?.room?.winnerPlayer?.playerName,
      'player1': players[0]?.playerName,
      'player2': players[1]?.playerName,
      'gameState': this.getState(event?.room?.state),
      'moveIndex': event?.moveIndex,
      'moveValue': event?.room?.activePlayer == 0 ? "X" : "0",
      'board': event?.room.board,
    };
  }

  private getState = (state: any) => {
    switch (state) {
      case "0":
        return "NOT STARTED";
      case "1":
        return "RUNNING";
      case "2": 
        return "GAME ENDED WITH WINNER";
      case "3":
        return "DRAW";      
      default:
        return "NOT SURE";
    }
  }

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

  public joinGame = async (data: any) => {
    this.loader$.next(true);
    let accaddress = await this.getAccounts();
    try {
      const response = await this.getContract().methods
        .joinRoom({ playerAddress: accaddress[0], playerName: data.name })
        .send({ from: accaddress[0] });
    } catch (error) {
      const errorMessage = error;
    }
  };

  public move = async (gameId: number, data: any) => {
    this.loader$.next(true);
    let accaddress = await this.getAccounts();
    try {
      const response = await this.getContract().methods
        .move(gameId, data)
        .send({ from: accaddress[0] });
      console.log("Player moved on ", response?.events?.PlayerMoved?.returnValues?.moveIndex);

      return response?.events?.PlayerMoved?.returnValues?.moveIndex;
    } catch (error) {
      console.log(error);
      
      const errorMessage = error;
    }
  };

  public ping = async (gameId: number) => {
    let accaddress = await this.getAccounts();
    try {
      const response = await this.getContract().methods
        .updateRoomIfExpired(gameId)
        .send({ from: accaddress[0] });
      console.log("Game State", response?.events?.PlayerMoved?.returnValues?.room.state);
    } catch (error) {
      const errorMessage = error;
    }
  };

  public isGameRunning = async (gameId: number) => {
    console.log("isGameRunning f");
    try {
      let accaddress = await this.getAccounts();
      if(!accaddress) return false;  
      
      const response = await this.getContract().methods
        .isGameRunning(gameId)
        .call({ from: accaddress[0] });
      
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  public isGameValid = async (gameId: any) => {
    console.log("isGameValid f");
    try {
      let accaddress = await this.getAccounts();
      
      if(!accaddress) return false;  
      
      const response = await this.getContract().methods
        .totalGames()
        .call({ from: accaddress[0] });
      
      console.log("response", response);  
      return response >= gameId;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  public getRoom = async (gameId: number) => {
    try {
      let accaddress = await this.getAccounts();
      if(!accaddress) return false;  
      
      const response = await this.getContract().methods
        .rooms(gameId)
        .call({ from: accaddress[0] });
      
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}
