import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Score } from '../model/score';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  apiURL = environment.dataURL + '/score';
  constructor(private httpClient: HttpClient) {

   }

  addScore(score: Score):Observable<Score>{
    console.log("add score", score, this.apiURL);
    let params = new HttpParams();
    params = params.append('gameId', score.gameId);
    params = params.append('userId', score.email);
    console.log(params);

   // this.httpClient.get(this.apiURL, { params: params }).subscribe(res => {
   //  if(Object.keys(res).length === 0){
   //     console.log("no scores entry, posting new");
        return this.httpClient.post<Score>(this.apiURL, score);
       // );
    //  } else {
      //  console.log("scores entry, editing first");
      //  return this.httpClient.put(this.apiURL + '/' + res[0].id, score).subscribe(
        //  data => {
          //  console.log('PUT Request is successful ', data);
         // },
         // error => {
           // console.log('Error', error);
         // });
  //    }
      
 // },err => {
   // console.log(err)
  
 // });
   
  }

    getMyScores(email: string): Observable<Score[]>{
      console.log("getMyscore", email);
      let params = new HttpParams();
      params = params.append('UserId', email);
          
          return this.httpClient.get<Score[]>(this.apiURL, {params: params}).pipe(map(res => {
            return res;
        }));
    }
    getMyScore(email: string, gameId: string): Observable<Score>{

      console.log("getMyscore", email, gameId);
      let params = new HttpParams();
      params = params.append('gameId', gameId);
      params = params.append('email', email);
          
          return this.httpClient.get<Score>(this.apiURL, {params: params}).pipe(map(res => {
            return res;
        }));
    }

    
   /* getTopScores(): Observable<Score[]>{
      return this.httpClient.get<Score[]>(this.apiURL).pipe(map(res => {
        return res;
    }));
  }*/

  getWinners(gameId: string, count: number): Observable<Score[]>{
    console.log("getWinners", gameId);
    let params = new HttpParams();
    params = params.append('gameId', gameId);
    params = params.append('count', count.toString()); 
    let winURL = environment.dataURL + '/topscore';
        return this.httpClient.get<Score[]>(winURL, {params: params}).pipe(map(res => {
          return res;
      }));
  }
}
