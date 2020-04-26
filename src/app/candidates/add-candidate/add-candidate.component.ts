import { Component, OnInit } from '@angular/core';
import { CandidatesService } from 'src/app/services/candidates.service';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/models/candidate.model';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {
  public currentCandidate: Candidate;
  public mode = 1;

  constructor(private candidatesService: CandidatesService, private router: Router) { }

  ngOnInit(): void {
  }

  onSaveCandidate(formValue : any) {
   this.candidatesService.saveResource(this.candidatesService.HOST+"/candidates", formValue)
                         .subscribe(res => {
                           console.log(res);
                           this.currentCandidate = res;
                           this.mode = 2;
                           // this.router.navigateByUrl("/candidates")
                         }, err => {
                           console.log(err);
                         })
  }

  onBackToAddCandidate(){
    this.mode = 1;
  }

}
