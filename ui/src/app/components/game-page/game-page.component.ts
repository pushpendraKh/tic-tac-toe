import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ContractService } from "src/app/services/contract.service";

@Component({
  selector: "app-game-page",
  templateUrl: "./game-page.component.html",
  styleUrls: ["./game-page.component.scss"],
})
export class GamePageComponent implements OnInit {
  // current state of board
  board: any;

  // if a game is running
  isGameRunning: boolean = false;

  // timer running text
  display: any;

  // Current state for the game
  gameState: any = '';

  // current active player who is playing
  activePlayer: string = "";

  // to check if user entered into a game which exists
  isValidGame: boolean = false;

  // defined when we have winner
  winner: string = "-";

  // current game id
  gameId: number = -1;

  constructor(private route: ActivatedRoute, private contractService: ContractService) {
    console.log("Constructor::GamePageComponent");
    this.gameId = route.snapshot.params['id'];
    this.checkGameState();
  }

  ngOnInit(): void {
    this.contractService.gameStarted$.subscribe((_) => {
        this.checkGameState();
    });

    this.contractService.moveIndex$.subscribe((didMakeAMove) => {
      if(didMakeAMove) {
        this.checkGameState();
      }
    });
  }

  private checkGameState = async () => {
    this.isValidGame = await this.contractService.isGameValid(this.gameId);
    if(this.isValidGame) {
      this.isGameRunning = await this.contractService.isGameRunning(this.gameId);
      this.gameState = await this.contractService.gameState(this.gameId);
      console.log(this.gameState);
      
      if(this.isGameRunning) {
        this.activePlayer = await this.contractService.currentActivePlayer(this.gameId);
        this.winner = await this.contractService.winnerName(this.gameId);
        this.setBoard();
        this.timer(2);
      }  
    }
  }

  async setBoard() {
    let _board = [];
    
    let currentBoard = await this.contractService.getCurrentBoardState(this.gameId);
    for (let i = 0; i < currentBoard.length; i++) {
      _board.push({ id: i, state: currentBoard[i] == '1' ? "X" : currentBoard[i] == '2' ? "0" : null}); // a hack, work fine on contract
    }    

    this.board = _board;
  }

  async squareClicked(object: any) {    
    if(this.isGameRunning) {
      try {        
        await this.contractService.move(this.gameId, object.id);
        this.contractService.loader$.next(false);
      } catch(e) {
        alert("e");
        console.log("squareClicked::", e);
      }
    } 
  }

  timer(minute: number) {
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(async () => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        this.display = "Time Up";
        clearInterval(timer);
        await this.contractService.ping(this.gameId);
      }
    }, 1000);
  }
}
