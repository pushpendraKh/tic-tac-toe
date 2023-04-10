import { Component } from "@angular/core";
import { ContractService } from "./services/contract.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  loader: boolean = false;
  constructor(private contractService: ContractService) {
    this.contractService.loader$.subscribe((value) => {
      this.loader = value;
    });
  }

  title = "tic-tac-toe";
}
