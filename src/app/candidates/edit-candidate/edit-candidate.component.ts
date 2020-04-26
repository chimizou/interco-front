import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidatesService } from '../../services/candidates.service';
import { Candidate } from '../../models/candidate.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-candidate',
  templateUrl: './edit-candidate.component.html',
  styleUrls: ['./edit-candidate.component.css']
})
export class EditCandidateComponent implements OnInit {
  currentCandidate: Candidate;
  idCandidate: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
    private candidatesService: CandidatesService) { }

  ngOnInit(): void {
    //Récupérer l'id à partir de l'URL
    this.idCandidate = this.activatedRoute.snapshot.params.idCandidate;
    //Récupérer le candidat à partir de son id
    this.candidatesService.getResource(this.idCandidate).subscribe(data => {
      this.currentCandidate = data;
      this.currentCandidate.birthDate = formatDate(data.birthDate, 'yyyy-MM-dd', 'en-US');
      console.log(this.currentCandidate.birthDate);
      console.log(this.currentCandidate);
    }, err => {
      console.log(err);
    });
  }

  onModifyCandidate(formValue: any){
    this.candidatesService.updateResource(this.candidatesService.HOST+"/candidates/" + this.idCandidate, formValue)
    .subscribe(res => {
      console.log(res);
      alert("Mise à jour effectuée avec succès");
      this.router.navigateByUrl("/candidates")
    }, err => {
      console.log(err);
    })
  }

}
