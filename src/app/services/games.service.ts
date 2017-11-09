import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';  
import 'rxjs/add/operator/catch';

/*This service provides a method to fetch the master scoreboard data of a given date*/

@Injectable()
export class GamesService {

  constructor(private _http: Http) {}
  
  // method to fetch scoreboard data of a given date 
  getGames(day: string, month: string, year: string): Observable<any> {

    // url to fetch the json file from
    let url = `http://gd2.mlb.com/components/game/mlb/year_${year}/month_${month}/day_${day}/master_scoreboard.json`;

    // get observable
    return this._http
      .get(url)
      .map((response: Response) => response.json() as any)
      .catch(this._serverError);
  }

  // error handler
  private _serverError(error: Response) {
    //console.error(error);
    alert("Error: no data available for this date.");
    return Observable.throw(error.json().error || 'Server error');
  }
}
