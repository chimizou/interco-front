import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TalentAdvocate } from '../models/talent-advocate.model';

@Injectable({
  providedIn: 'root'
})
export class TalentAdvocatesService {

  constructor(private httpClient: HttpClient) { }

  public getAllTalentAdvocates() : Observable<TalentAdvocate[]>{
    return this.httpClient.get<TalentAdvocate[]>("/api/talentAdvocate/listTalentAdvocates");
  }

}
