import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Score } from '../model/score';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InviteService {
  apiURL = environment.dataURL + '/email';
  constructor(private httpClient: HttpClient) {

   }

  sendEmail(from: string, invitees: string[]):Observable<string>{
        let emailObject = {from: from, invitees: invitees};
        return this.httpClient.post<string>(this.apiURL, emailObject);
  }

  
}
