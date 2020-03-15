import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  constructor(private httpClient: HttpClient) { }

  public getCandidates(){
    return this.httpClient.get("http://localhost:8080/candidates/");
  }
}
