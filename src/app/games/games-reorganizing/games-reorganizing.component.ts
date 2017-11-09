import { 
  Component, Input, OnChanges, OnInit, SimpleChanges, Output,EventEmitter 
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from '../../models/game';
import { GameDetailComponent } from '../../games/game-detail/game-detail.component';

@Component({
  selector: 'app-games-reorganizing',
  templateUrl: './games-reorganizing.component.html',
  styleUrls: ['./games-reorganizing.component.css']
})
export class GamesReorganizingComponent implements OnInit, OnChanges {

  @Input() dataOfTheDay: Array<any>; // data of the games of the day
  @Input() favoriteTeam: string;     // current favorite team
  @Input() day: string;              // day of the date of the games
  @Input() month: string;            // month of the date of the games
  @Input() year: string;             // year of the date of the games
  
  @Output() updatedFavoriteTeam = new EventEmitter(); // emitter to output the fav team

  gamesOfTheDayToDisplay: Game[]; // array with details of the games to be displayed

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when the data of the day has changed
    if (changes['dataOfTheDay']) {
      // extract data of the games to display
      this.gamesOfTheDayToDisplay = this.getGamesOfTheDayToDisplay(this.dataOfTheDay);
    }
  }

  // method to extract the data of the games of the day to be displayed
  getGamesOfTheDayToDisplay(dataOfTheDay: Array<any>): Game[] {

    if (!dataOfTheDay) return;

    // If in that day there was just one game, dataOfTheDay is not an array but an object.
    // In that case, transform dataOfTheDay into an array (with length 1)
    if (!(dataOfTheDay instanceof Array)) {
      let arrayForOneGame: any[] = [];
      arrayForOneGame.push(dataOfTheDay);
      dataOfTheDay = arrayForOneGame;  
    }

    // map the array of data of games to an array of models Game (with just interesting data)
    const extractedDataOfTheDay = Array.from(dataOfTheDay).map(x => ({
        homeTeam: (x.home_team_name ? x.home_team_name : ""),
        awayTeam: (x.away_team_name ? x.away_team_name : ""),
        status: (x.status && x.status.status ? x.status.status : ""),
        homeScore: (x.linescore && x.linescore.r && x.linescore.r.home ? +x.linescore.r.home : null),
        awayScore: (x.linescore && x.linescore.r && x.linescore.r.away ? +x.linescore.r.away : null),
        homeTeamAbbrev: (x.home_name_abbrev ? x.home_name_abbrev : ""),
        awayTeamAbbrev: (x.away_name_abbrev ? x.away_name_abbrev : ""),
        gameday: (x.gameday ? x.gameday : ""),
        venue: (x.venue ? x.venue : ""),
    }));

    // sort the games so that the favorite team's game is on top
    // and all the other games following, sorted alphabetically by home team name
    let teamOnTop = this.favoriteTeam;
    extractedDataOfTheDay.sort(function(game1, game2) {
      return (game1.homeTeam === teamOnTop || game1.awayTeam === teamOnTop) 
      ? -1 : ((game2.homeTeam === teamOnTop || game2.awayTeam === teamOnTop) ? 1 : 
        ((game1.homeTeam > game2.homeTeam) ? 1 : ((game2.homeTeam > game1.homeTeam) ? -1 : 0)));
    });
    
    return extractedDataOfTheDay;
  }

  // method to set new favorite team and pass the new favorite team to parent component
  setAsFavorite(team: string) {
    this.favoriteTeam = team;
    this.updatedFavoriteTeam.emit(this.favoriteTeam);
  }

  // method to open the game details dialog box and to pass the parameters
  openDetailsDialog(
    homeAbbrev: string, awayAbbrev: string,
    homeTeam: string, awayTeam: string, gameday: string, venue: string) {

    // open dialog box of the game details
    let dialog = this.dialog.open(GameDetailComponent);

    // set the parameters 
    dialog.componentInstance.year = this.year;
    dialog.componentInstance.month = this.month;
    dialog.componentInstance.day = this.day;
    dialog.componentInstance.awayAbbrev = awayAbbrev;
    dialog.componentInstance.homeAbbrev = homeAbbrev;
    dialog.componentInstance.awayName = awayTeam;
    dialog.componentInstance.homeName = homeTeam;
    dialog.componentInstance.gameday = gameday;
    dialog.componentInstance.venue = venue;
  }
}
