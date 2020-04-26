import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  public HOST : String = "http://localhost:8080/"

  constructor(private httpClient: HttpClient) { }

  public getAllCandidates(){
    return this.httpClient.get(this.HOST + "candidates");
  }

  public getCandidatesByPage(currentPage : number, size : number){
      return this.httpClient.get(this.HOST + "candidates?page=" + currentPage + "&size=" + size);
  }

  public searchCandidatesByFirstName(firstNameKeyWord : string , currentPage : number, size : number){
        return this.httpClient.get(this.HOST + "candidates/search/byFirstNamePage?firstName=" + firstNameKeyWord + "&page=" + currentPage + "&size=" + size);
  }

  public deleteResource(url){
        return this.httpClient.delete(url);
  }

  public saveResource(url, data) : Observable<Candidate>{
    return this.httpClient.post<Candidate>(url, data);
  }

  public getResource(idCandidate) : Observable<Candidate>{
    return this.httpClient.get<Candidate>(this.HOST + "candidates/" + idCandidate);
  }

  public updateResource(url, data) : Observable<Candidate>{
    return this.httpClient.put<Candidate>(url, data);
  }

}
