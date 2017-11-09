import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent {

  public dataOfThisGame: any; // data of the game boxscore
  public year: string;        // year of the date of the game
  public month: string;       // month of the date of the game
  public day: string;         // day of the date of the game
  public awayAbbrev: string;  // name abbreviation of the home team
  public homeAbbrev: string;  // name abbreviation of the away team
  public awayName: string;    // displayed name of the away team
  public homeName: string;    // displayed name of the home team
  public gameday: string;     // id of the game
  public venue: string;       // venue of the game

  constructor(
    public dialogRef: MatDialogRef<GameDetailComponent>,
    private _gameService: GameService
  ) { }

  ngOnInit() {
    this.readDataOfThisGame();  
  }

  // method to read the boxscore data of the game
  readDataOfThisGame() {
    // call the service method to get the data of the game
    this._gameService.getGameDetails(
      this.year, this.month, this.day, 
      this.gameday)
      .subscribe(result => {
          this.dataOfThisGame = result.data.boxscore;
      });
  }
}
