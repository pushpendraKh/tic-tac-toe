import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ContractService } from "src/app/services/contract.service";

@Component({
  selector: "app-game-page",
  templateUrl: "./game-page.component.html",
  styleUrls: ["./game-page.component.scss"],
})
export class GamePageComponent implements OnInit {
  board: any;
  isGameRunning: boolean = false;
  winner: boolean = false;
  activePlayer: string = "X";
  isGameOver: boolean = false;
  turnCount = 0;
  display: any;
  winnerName: any;
  isValidGame: boolean = false;

  room: any;

  gameId: number = -1;

  constructor(private route: ActivatedRoute, private contractService: ContractService) {
    console.log("constructor");
    
    this.gameId = route.snapshot.params['id'];
    this.checkGameState();

  }

  ngOnInit(): void {
    this.contractService.gameStartedObject$.subscribe((data) => {
      console.log("gameStartedObject",data);
      this.room = data;
      this.newGame();
      this.timer(2);
    });
    this.contractService.moveIndex$.subscribe((data) => {
      console.log("Move Index",data);
      if(data) {
        this.room = data;
        this.newGame();
        this.timer(2);
      }
    });
  }


  checkGameState = async () => {
    this.isGameRunning = await this.contractService.isGameRunning(this.gameId);
    // console.log(await this.contractService.getRoom(this.gameId));
  }

  newGame() {
    this.board = this.createBoard();
    console.log(this.board);
  }

  createBoard() {
    let board = [];
    console.log(this.room, "room");
    
    for (let i = 0; i < this.room.board.length; i++) {
      board.push({ id: i, state: this.room.board[i] == '1' ? "X" : this.room.board[i] == '2' ? "0" : null});
    }    
    return board;
  }

  async squareClicked(object: any) {    
    if(this.isGameRunning) {
      try {        
        await this.contractService.move(this.gameId, object.id);
        this.contractService.loader$.next(false);
      } catch(e) {
        alert("Error while playing move");
      }
    } 
  }

  // changePlayer(square: any) {
  //   if (this.isGameRunning && square.state === null) {
  //     this.contractService.move(this.gameId, square.id).then((resp) => {
  //       this.contractService.loader$.next(false);
  //       // this.winnerName = resp;
  //       this.changePlayerTurn(square);
  //     });
  //     square.state = this.activePlayer;
  //   }
  // }

  // private changePlayerTurn(squareClicked: any) {
  //   this.updateBoard(squareClicked);
  //   if (!this.isGameOver)
  //     this.activePlayer = this.activePlayer === "X" ? "O" : "X";
  //   this.turnCount++;
  //   this.isGameOver = this.isGameOver ? true : false;
  // }

  // updateBoard(squareClicked: any) {
  //   this.board[squareClicked.id].state = squareClicked.state;
  //   if (this.isWinner) {
  //     this.winner = true;
  //     this.isGameRunning = false;
  //     this.isGameOver = true;
  //   }
  // }

  // get isWinner(): boolean {
  //   return this.checkDiag() ||
  //     this.checkRows(this.board, "row") ||
  //     this.checkRows(this.board, "col")
  //     ? true
  //     : false;
  // }

  // checkDiag() {
  //   const timesRun = 2,
  //     midSquare = this.board[4].state;

  //   for (let i = 0; i <= timesRun; i += 2) {
  //     let upperCorner = this.board[i].state,
  //       lowerCorner = this.board[8 - i].state;

  //     if (midSquare && upperCorner && lowerCorner) {
  //       if (midSquare === upperCorner && upperCorner === lowerCorner)
  //         return true;
  //     }
  //   }

  //   return false;
  // }

  // checkRows(board: any, mode: any): boolean {
  //   const ROW = mode === "row" ? true : false,
  //     DIST = ROW ? 1 : 3,
  //     INC = ROW ? 3 : 1,
  //     NUMTIMES = ROW ? 7 : 3;

  //   for (let i = 0; i < NUMTIMES; i += INC) {
  //     let firstSquare = board[i].state,
  //       secondSquare = board[i + DIST].state,
  //       thirdSquare = board[i + DIST * 2].state;

  //     if (firstSquare && secondSquare && thirdSquare) {
  //       if (firstSquare === secondSquare && secondSquare === thirdSquare)
  //         return true;
  //     }
  //   }
  //   return false;
  // }

  timer(minute: number) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
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
      }
    }, 1000);
  }
}
