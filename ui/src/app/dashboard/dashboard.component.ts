import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  results: any[] = [];

  constructor(private contractService: ContractService) { }

  ngOnInit() {
    this.setResults();
  }

  async setResults() {
    let games = await this.contractService.totalGames();
  
    let leaderBoard: any = [];
    for (let index = 0; index < games; index++) {
      let winner = await this.contractService.winnerName(index + 1);
      let gameState = await this.contractService.gameState(index + 1);
      leaderBoard.push([index + 1,winner, gameState]);
    }
    this.results = leaderBoard;
   }

}





