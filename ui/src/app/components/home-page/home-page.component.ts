import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

import { Component } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';
import { LoginComponent } from 'src/app/popup/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private contractService: ContractService
  ) {}
  loginAddress: string = '';
  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    // address: new FormControl('', [Validators.required]),
  });
  gamStatus: any;

  login() {
    this.contractService.openMetamask().then((resp) => {
      this.loginAddress = resp;
    });
  }

  onSubmit() {
    this.contractService.joinGame(this.loginForm.value).then((resp: any) => {
      if (resp?.events?.GameStarted?.returnValues?.gameId) {
        this.gamStatus = 'Game had strated';

        let id = resp?.events?.GameStarted?.returnValues?.gameId;
        this.router.navigateByUrl(`/game/${id}`);
      } else {
        this.gamStatus = 'Waiting for player2 to join';
      }
    });
  }
}
