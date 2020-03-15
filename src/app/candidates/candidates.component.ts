import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  candidates;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

  }

  onGetCandidates() {
    this.httpClient.get("http://localhost:8080/candidates/")
    .subscribe(data => {
      this.candidates = data;
    }, err => {
      console.log(err)
    })
  }

}
