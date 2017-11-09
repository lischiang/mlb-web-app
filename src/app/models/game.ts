// model to store the information of a game
export class Game {
  homeTeam: string;       // home team displayed name
  awayTeam: string;       // away team displayed name
  status: string;         // status of the game
  homeScore: number;      // home team's score
  awayScore: number;      // away team's score
  homeTeamAbbrev: string; // home team's name abbreviation
  awayTeamAbbrev: string; // away team's name abbreviation
  gameday: string;        // id of the game
  venue: string;          // venue of the game
}