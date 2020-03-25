import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CandidatesService } from '../services/candidates.service'

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  public candidates: any;
  public size: number =2;
  public currentPage: number;
  public totalPages: number;
  public pages: Array<number>;
  public currentKeyWord: string;

  constructor(private candidatesService: CandidatesService) { }

  ngOnInit(): void {

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

  onPageCandidate(pageNumber: number){
    this.currentPage = pageNumber;
    this.searchCandidates();
  }

  onSearchCandidates(formValue : any) {
    this.currentPage =0;
    this.currentKeyWord = formValue.keyWord;
    this.searchCandidates();
  }

  searchCandidates(){
    this.candidatesService.searchCandidatesByFirstName(this.currentKeyWord, this.currentPage, this.size)
        .subscribe(data => {
          this.totalPages = data["page"].totalPages;    //data.page.totalPages est possible aussi syntaxique, sauf qu'il va lever une erreur de compilation.
          this.pages = new Array<number>(this.totalPages);
          this.candidates = data;
        }, err => {
          console.log(err);
        })
  }

  onDeleteCandidate(candidate: any){
    let choice = confirm("êtes vous sûr de vouloir supprimer ce candidat ?")
    if (choice) {
      this.candidatesService.deleteResource(candidate._links.self.href)
      .subscribe(data => {
        this.searchCandidates();
      }, err => {
        console.log(err);
      });
    }
  }

}
