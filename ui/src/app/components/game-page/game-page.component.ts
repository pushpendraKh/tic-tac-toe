import { Component } from "@angular/core";
import { ContractService } from "src/app/services/contract.service";

@Component({
  selector: "app-game-page",
  templateUrl: "./game-page.component.html",
  styleUrls: ["./game-page.component.scss"],
})
export class GamePageComponent {
  board: any;
  isGameRunning: boolean = false;
  winner: boolean = false;
  activePlayer: string = "X";
  isGameOver: boolean = false;
  turnCount = 0;
  display: any;
  winnerName: any;

  constructor(private contractService: ContractService) {
    this.newGame();
    this.timer(1);
  }

  newGame() {
    this.board = this.createBoard();
  }

  createBoard() {
    let board = [];
    for (let i = 0; i < 9; i++) {
      board.push({ id: i, state: null });
    }
    return board;
  }

  changePlayer(square: any) {
    this.isGameRunning = true;

    if (this.isGameRunning && square.state === null) {
      this.contractService.move(square.id).then((resp) => {
        this.contractService.loader$.next(false);
        this.winnerName = resp;
      });
      square.state = this.activePlayer;
      this.changePlayerTurn(square);
    }
  }

  changePlayerTurn(squareClicked: any) {
    this.updateBoard(squareClicked);
    if (!this.isGameOver)
      this.activePlayer = this.activePlayer === "X" ? "O" : "X";
    this.turnCount++;
    this.isGameOver = this.isGameOver ? true : false;
  }

  updateBoard(squareClicked: any) {
    this.board[squareClicked.id].state = squareClicked.state;
    if (this.isWinner) {
      this.winner = true;
      this.isGameRunning = false;
      this.isGameOver = true;
    }
  }

  get isWinner(): boolean {
    return this.checkDiag() ||
      this.checkRows(this.board, "row") ||
      this.checkRows(this.board, "col")
      ? true
      : false;
  }

  checkDiag() {
    const timesRun = 2,
      midSquare = this.board[4].state;

    for (let i = 0; i <= timesRun; i += 2) {
      let upperCorner = this.board[i].state,
        lowerCorner = this.board[8 - i].state;

      if (midSquare && upperCorner && lowerCorner) {
        if (midSquare === upperCorner && upperCorner === lowerCorner)
          return true;
      }
    }

    return false;
  }

  checkRows(board: any, mode: any): boolean {
    const ROW = mode === "row" ? true : false,
      DIST = ROW ? 1 : 3,
      INC = ROW ? 3 : 1,
      NUMTIMES = ROW ? 7 : 3;

    for (let i = 0; i < NUMTIMES; i += INC) {
      let firstSquare = board[i].state,
        secondSquare = board[i + DIST].state,
        thirdSquare = board[i + DIST * 2].state;

      if (firstSquare && secondSquare && thirdSquare) {
        if (firstSquare === secondSquare && secondSquare === thirdSquare)
          return true;
      }
    }
    return false;
  }
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
