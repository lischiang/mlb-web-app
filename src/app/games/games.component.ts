import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  providers: [GamesService]
})
export class GamesComponent implements OnInit {

  public favoriteTeam = 'Blue Jays';  // default favorite game
  public dataOfTheDay: Array<any>;    // data of the games in the selected day
  public gameDate;                    // selected date
  public day;                         // day of the selected date
  public month;                       // month of the selected date
  public year;                        // year of the selected date
  firstValidDay = new Date(2007,2,1); // before this date no data are available

  constructor(private _gamesService: GamesService) { }

  // filter to use in the date picker to disable the selection invalid dates
  filterOutFutureDates = (d: Date): boolean => {
    var today = new Date();  // today
    return ((d <= today) && (this.firstValidDay <= d )); 
  }

  ngOnInit():void {
    this.gameDate = new Date(); // by default the selected date is today's date;
    this.readDataOfTheDay();    // read data of the games    
  }

  // method to read the data of the games 
  readDataOfTheDay() {
    // get day, month, and year of the date
    this.day = ("0" + this.gameDate.getDate()).slice(-2);
    this.month = ("0" + (this.gameDate.getMonth()+1)).slice(-2);
    this.year = this.gameDate.getFullYear();

    // call the service method to get the data of the games
    this._gamesService.getGames(this.day, this.month, this.year) 
      .subscribe(result => {
          this.dataOfTheDay = result.data.games.game;
      });
  }

  // method to read the data of the games of the previous day
  readDataOfYesterday() {
    // make a copy of the current date and increment it
    var newDate = new Date(this.gameDate);
    newDate.setDate(newDate.getDate() - 1);
    // check if the previous day is not before the first valid date
    if( this.firstValidDay <= newDate ) 
    {
      // change the date of the game by assigning the new date
      this.gameDate = newDate;
      // read data of the day
      this.readDataOfTheDay();
    }
  }

  // method to read the data of the games of the next day
  readDataOfTomorrow() {
    // make a copy of the current date and increment it
    var newDate = new Date(this.gameDate);
    newDate.setDate(newDate.getDate() + 1);
    var today = new Date();
    // check if the next day is not beyond today
    if( newDate <= today ) 
    {
      // change the date of the game by assigning the new date
      this.gameDate = newDate;
      // read data of the day
      this.readDataOfTheDay();
    }
  }

  // method to check if the current selected date is today
  isToday(): boolean {
    var today = new Date();
    var todayDay = today.getDate();
    var todayMonth = today.getMonth();
    var todayYear = today.getFullYear();

    var selectedDateDay = this.gameDate.getDate();
    var selectedDateMonth = this.gameDate.getMonth();
    var selectedDateYear = this.gameDate.getFullYear();

    // if day, month, and year of the selected date correspond to the today's ones
    // the selected date is today
    if (todayDay == selectedDateDay && 
      todayMonth == selectedDateMonth && 
      todayYear == selectedDateYear)
      return false;
      return true;
  }

  // method to update the value of the favorite team
  handleUpdatedFavoriteTeam(favoriteTeam) {
    this.favoriteTeam = favoriteTeam;
  }
}
