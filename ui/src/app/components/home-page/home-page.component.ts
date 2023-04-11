import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";

import { Component, OnChanges, SimpleChanges } from "@angular/core";
import { ContractService } from "src/app/services/contract.service";
import { LoginComponent } from "src/app/popup/login/login.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnChanges {
  constructor(
    public dialog: MatDialog,
    private contractService: ContractService
  ) {}
  
  loginAddress: string = "";
  loginForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    // address: new FormControl('', [Validators.required]),
  });
  gamStatus: any;
  leadershipBoardData = [];


  login() {
    this.contractService.openMetamask().then((resp) => {
      this.loginAddress = resp;
      this.contractService.loader$.next(false);
    });
  }

  onSubmit() {
    this.contractService.joinGame(this.loginForm.value).then((resp: any) => {
      this.contractService.loader$.next(false);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges");
    this.setLeaderBoard();
    
  }


 async setLeaderBoard() {
  let games = await this.contractService.totalGames();

  let leaderBoard: any = [];
  for (let index = 0; index < games; index++) {
    let winner = await this.contractService.winnerName(index + 1);
    leaderBoard.push([index + 1,winner]);
  }
  this.leadershipBoardData = leaderBoard;
 }


}
