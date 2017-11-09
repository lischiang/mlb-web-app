import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

/*This service provides a method to fetch the boxscore data of a given date*/

@Injectable()
export class GameService {

  constructor(private _http: Http) {}
  
  // method to fetch boxscore data of a given date 
  getGameDetails(year: string, month: string, day: string, gameday: string): Observable<any> {

    // url to fetch the json file from
    let url = `http://gd2.mlb.com/components/game/mlb/year_${year}/month_${month}/day_${day}/gid_${gameday}/boxscore.json`;

    // get observable
    return this._http
      .get(url)
      .map((response: Response) => response.json() as any)
      .catch(this._serverError);
  }

  // error handler
  private _serverError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
