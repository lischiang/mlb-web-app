import { Component, OnInit, Input } from '@angular/core';
import { Inning } from '../../../models/inning';
import { Linescore } from '../../../models/linescore';
import { Batter } from '../../../models/batter';
 
@Component({
  selector: 'app-game-detail-reorganizing',
  templateUrl: './game-detail-reorganizing.component.html',
  styleUrls: ['./game-detail-reorganizing.component.css']
})
export class GameDetailReorganizingComponent implements OnInit {

  @Input() dataOfThisGame: any; // data of the details of the game
  @Input() homeName: string;    // home team's name
  @Input() awayName: string;    // away team's name
  @Input() homeAbbrev: string;  // home team's name abbreviation
  @Input() awayAbbrev: string;  // away team's name abbreviation

  linescore: Linescore;               // linescore
  extractedBatters: Array<Batter>[];  // [home team's batters, away team's batters] 

  constructor() { }

  ngOnInit() {
    this.linescore = this.getLinescore(this.dataOfThisGame);
    this.extractedBatters = this.getBatters(this.dataOfThisGame);
  }

  // method to extract the data of the linescore to be displayed
  getLinescore(dataOfThisGame: any): Linescore {

    // check if data of the linescore is defined
    if (!dataOfThisGame || 
      !dataOfThisGame.linescore || 
      !dataOfThisGame.linescore.inning_line_score) 
      return;

    // variable that stores the data of the linescore 
    var inningLineScore: Array<any> = dataOfThisGame.linescore.inning_line_score;

    // save the linescore into an array of Innings
    const extractedInnings = Array.from(inningLineScore).map(x => ({
        inningNumber: (x.inning ? x.inning : ""),
        home: (x.home ? x.home : ""),
        away: (x.away ? x.away : ""),
    }));

    // save the all the data of the linescore into an instance of the Linescore class
    const extractedLinescore: Linescore ={
      innings: extractedInnings,
      homeR: dataOfThisGame.linescore.home_team_runs,
      awayR: dataOfThisGame.linescore.away_team_runs,
      homeH: dataOfThisGame.linescore.home_team_hits,
      awayH: dataOfThisGame.linescore.away_team_hits,
      homeE: dataOfThisGame.linescore.home_team_errors,
      awayE: dataOfThisGame.linescore.away_team_errors
    }
      
    return extractedLinescore;
  }

  // method to extract the batter lists of the game
  getBatters(dataOfThisGame: any): Array<Batter>[] {

    // check if data of the batters is defined
    if (!dataOfThisGame || 
      !dataOfThisGame.batting) 
      return;

    // variable for the position of the element of the array of the batting data
    // corresponding to the home batters
    var positionOfHomeBatters;
    // variable for the position of the element of the array of the batting data
    // corresponding to the away batters
    var positionOfAwayBatters;

    // look for the element in the array corresponding to the home team and 
    // for the element in the array corresponding to the away team
    if (dataOfThisGame.batting[0] && 
      dataOfThisGame.batting[1] && 
      dataOfThisGame.batting[0].team_flag == "home") {

      positionOfHomeBatters = 0;
      positionOfAwayBatters = 1;
    }
    else {
      positionOfHomeBatters = 1;
      positionOfAwayBatters = 0;
    }

    // variables to store batters data
    var homeBattersData: Array<any> = dataOfThisGame.batting[positionOfHomeBatters].batter;
    var awayBattersData: Array<any> = dataOfThisGame.batting[positionOfAwayBatters].batter;

    // extract the home batters'data and save into an array of Batters
    const extractedHomeBatters = Array.from(homeBattersData).map(x => ({
        name: (x.name ? x.name : ""),
        ab: (x.ab ? x.ab : ""),
        r: (x.r ? x.r : ""),
        h: (x.h ? x.h : ""),
        rbi: (x.rbi ? x.rbi : ""),
        bb: (x.bb ? x.bb : ""),
        so: (x.so ? x.so : ""),
        avg: (x.avg ? x.avg : "")
    }));

    // extract the away batters'data and save into an array of Batters
    const extractedAwayBatters = Array.from(awayBattersData).map(x => ({
        name: (x.name ? x.name : ""),
        ab: (x.ab ? x.ab : ""),
        r: (x.r ? x.r : ""),
        h: (x.h ? x.h : ""),
        rbi: (x.rbi ? x.rbi : ""),
        bb: (x.bb ? x.bb : ""),
        so: (x.so ? x.so : ""),
        avg: (x.avg ? x.avg : "")
    }));
    
    const extractedBatters: Array<Batter>[] = [extractedHomeBatters,extractedAwayBatters];
    return extractedBatters;
  }
}
