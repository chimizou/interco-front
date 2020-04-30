import { Component, OnInit } from '@angular/core';
import { CandidatesService } from 'src/app/services/candidates.service';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/models/candidate.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {
  public currentCandidate: Candidate;
  public mode = 1;
  public candidateForm;
  public submitted = true;

  constructor(private candidatesService: CandidatesService, private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.candidateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      birthDate: ['', Validators.required]
    });
  }

  onSaveCandidate() {
    const formValue = this.candidateForm.value;
    this.candidatesService.saveResource(this.candidatesService.HOST+"/candidates", formValue)
                         .subscribe(res => {
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
