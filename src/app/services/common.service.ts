import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  api = 'http://localhost:5050'

  signupUser(data:any):Observable<any>{
    return this.http.post(`${this.api}/register`, data)
  }
}
