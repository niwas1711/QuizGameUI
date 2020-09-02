import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../model/question';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  apiURL = environment.dataURL + '/question';

  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount: number = 0;

  constructor(private httpClient: HttpClient) { }
  getQuestions(gameId: string, count: number): Observable<Question[]>{
    console.log("GET QUESTIONS", gameId);

    let params = new HttpParams();
    params = params.append('gameid', gameId);
    //if count is -1 get all questions. 
    params = params.append('number', count.toString());

    return this.httpClient.get<Question[]>(this.apiURL, { params: params }).pipe(map(res => {
      return res;
  }));
  }
  
  displayTimeElapsed(){
    return Math.floor(this.seconds/3600) + ':' + Math.floor(this.seconds/60) + ':' + Math.floor(this.seconds % 60)
  }

  addQuestion(question: Question): Observable<Question>{
    console.log("add Game", question, this.apiURL);
    return this.httpClient.post<Question>(this.apiURL, question);
  }

  deleteQuestion(id: number): Observable<Question>{
    console.log("delete", this.apiURL + '/' + id.toString());
    return this.httpClient.delete<Question>(this.apiURL + '/' + id.toString());
  }
}
