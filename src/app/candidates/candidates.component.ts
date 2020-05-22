import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../services/candidates.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  public candidates: any;
  public size: number = 4;
  public currentPage: number;
  public totalPages: number;
  public pages: Array<number>;
  public currentKeyWord: string;
  private initialForm: any = { keyWord: "" };

  constructor(private candidatesService: CandidatesService, private router: Router) { }

  ngOnInit(): void {
    this.onSearchCandidates(this.initialForm);
  }

  onGetCandidates() {
    this.candidatesService.getCandidatesByPage(this.currentPage, this.size)
      .subscribe(data => {
        this.totalPages = data["page"].totalPages;    //data.page.totalPages est possible aussi syntaxique, sauf qu'il va lever une erreur de compilation.
        this.pages = new Array<number>(this.totalPages);
        this.candidates = data;
      }, err => {
        console.log(err)
      })
  }

  onPageCandidate(pageNumber: number) {
    this.currentPage = pageNumber;
    this.searchCandidates();
  }

  onSearchCandidates(formValue: any) {
    this.currentPage = 0;
    this.currentKeyWord = formValue.keyWord;
    this.searchCandidates();
  }

  searchCandidates() {
    this.candidatesService.searchCandidatesByFirstName(this.currentKeyWord, this.currentPage, this.size)
      .subscribe(data => {
        if (data) {
          console.log(data);
          this.totalPages = data["totalPages"];    //data.page.totalPages est possible aussi syntaxique, sauf qu'il va lever une erreur de compilation.
          this.pages = new Array<number>(this.totalPages);
          this.candidates = data["content"];
        }
      }, err => {
        console.log(err);
      })
  }

  onDeleteCandidate(candidateId: number) {
    let choice = confirm("êtes vous sûr de vouloir supprimer ce candidat ?")
    if (choice) {
      this.candidatesService.deleteResource("/api/candidate/deleteCandidate/" + candidateId)
        .subscribe(data => {
          const index = this.candidates.findIndex(candidate => candidate.idCandidate === candidateId);
          console.log(index);
          if (index !== -1) {
            this.candidates.splice(index, 1);
          }
          console.log(this.candidates);
        }, err => {
          console.log(err);
        });
    }
  }

  onEditCandidate(candidateId: number) {
    this.router.navigateByUrl("/edit-candidate/" + candidateId);
  }

}
