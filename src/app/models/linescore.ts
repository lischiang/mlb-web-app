import { Inning } from '../models/inning';

// model to store the data of a game linescore 
export class Linescore {
  innings: Array<Inning>; // array of innings of a game
  homeR: string;          // runs of the home team
  awayR: string;          // runs of the away team
  homeH: string;          // hits of the home team
  awayH: string;          // hits of the away team
  homeE: string;          // errors of the home tean
  awayE: string;          // errors of the away team
}