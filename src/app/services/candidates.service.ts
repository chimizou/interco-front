import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  public HOST : String = "http://localhost:8080"

  constructor(private httpClient: HttpClient) { }

  public getAllCandidates(){
    return this.httpClient.get(this.HOST + "/candidates");
  }

  public getCandidatesByPage(currentPage : number, size : number){
      return this.httpClient.get(this.HOST + "/candidates?page=" + currentPage + "&size=" + size);
  }

  public searchCandidatesByFirstName(firstNameKeyWord : string , currentPage : number, size : number){
        return this.httpClient.get(this.HOST + "/candidates/search/byFirstNamePage?firstName=" + firstNameKeyWord + "&page=" + currentPage + "&size=" + size);
  }

  public deleteResource(url){
        return this.httpClient.delete(url);
  }
}
