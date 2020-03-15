import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CandidatesService } from '../services/candidates.service'

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  candidates;

  constructor(private candidatesService: CandidatesService) { }

  ngOnInit(): void {

  }

  onGetCandidates() {
    this.candidatesService.getCandidates()
    .subscribe(data => {
      this.candidates = data;
    }, err => {
      console.log(err)
    })
  }

}
