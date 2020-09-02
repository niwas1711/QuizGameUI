import { Injectable } from '@angular/core';
import { Game } from '../model/game';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  apiURL = environment.dataURL + '/games';

  constructor(private httpClient: HttpClient) { }

  addGame(game: Game): Observable<Game>{
    console.log("add Game", game, this.apiURL);
   // this.httpClient.post(, game).subscribe()
    return this.httpClient.post<Game>(this.apiURL, game);
    
  }

  updateGame(game: Game, id: string): Observable<Game>{
    console.log("update Game", game, this.apiURL, id);
    return this.httpClient.put<Game>(this.apiURL+ '/'+ id, game);
  }

  deleteGame(id: string): Observable<Game>{
    console.log("delete Game", id, this.apiURL);
   return this.httpClient.delete<Game>(this.apiURL+ '/'+ id);
    
  }
  getGameById(id: string): Observable<Game>{
    return this.httpClient.get<Game>(this.apiURL + '/'+ id).pipe(map(res => {
      return res;
  }));
}

    getGames(): Observable<Game[]>{
      return this.httpClient.get<Game[]>(this.apiURL).pipe(map(res => {
        return res;
    }));
  }
}
