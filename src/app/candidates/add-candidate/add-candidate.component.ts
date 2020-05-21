import { Component, OnInit } from '@angular/core';
import { CandidatesService } from 'src/app/services/candidates.service';
import { TalentAdvocatesService } from 'src/app/services/talent-advocates.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Candidate } from 'src/app/models/candidate.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { HttpClient } from '@angular/common/http';
import { TalentAdvocate } from 'src/app/models/talent-advocate.model';
import { formatDate } from '@angular/common';
import { FormMode } from 'src/app/util/form-mode.component';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {
  public currentCandidate: Candidate;
  public mode = 1;
  public saveOrUpdateMode: FormMode = FormMode.Add;
  public candidateId: number;
  public candidateForm;
  public submitted = true;
  public talentAdvocates: any;
  public selectedTalentAdvocate: TalentAdvocate;
  public messageModal: string;
  public displayMessageModal: boolean = false;

  selectedFile: File;

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  constructor(private candidatesService: CandidatesService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private httpClient: HttpClient,
    private talentAdvocatesService: TalentAdvocatesService) { }

  ngOnInit(): void {
    this.initForm();
    this.initTalentAdvocates();

    //For edit form
    this.activatedRoute.paramMap.subscribe(params => {
      this.candidateId = +params.get('idCandidate'); // + means cast to number
      if (this.candidateId) {
        this.getCandidate(this.candidateId);
        this.saveOrUpdateMode = FormMode.Update;
      }
    })
  }

  initForm() {
    this.candidateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      birthDate: ['', Validators.required],
      talentAdvocate: ['', Validators.required]
    });
  }

  initTalentAdvocates() {
    this.talentAdvocatesService.getAllTalentAdvocates().subscribe(res => {
      this.talentAdvocates = res;
    }, err => {
      this.buildMessageModal('Une erreur est survenue lors du chargement des talent advocates');
      console.log(err);
    })
  }

  getCandidate(candidateId: number) {
    this.candidatesService.getResource("/api/candidate/", candidateId).subscribe((candidate: Candidate) => {
      this.editCandidate(candidate);
    }, err => {
      console.log(err);
    });
  }

  /**
   * Remplir le formulaire avec les données du candidat
   * @param candidate candidat à modifier
   */
  editCandidate(candidate: Candidate) {
    this.candidateForm.patchValue({
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      birthDate: formatDate(candidate.birthDate, 'yyyy-MM-dd', 'en-US'),
      talentAdvocate: candidate.talentAdvocate
    });
  }

  onSaveOrUpdateCandidate() {
    this.displayMessageModal = false;
    const formValue = this.candidateForm.value;
    console.log(formValue);
    if (this.saveOrUpdateMode == FormMode.Add) {
      this.candidatesService.saveResource("/api/candidate/addCandidate", formValue)
        .subscribe(res => {
          this.currentCandidate = res;
          this.mode = 2;
          this.buildMessageModal('Le candidat a été ajouté avec succès');
        }, err => {
          this.buildMessageModal('Une erreur est survenue lors de l\'enregistrement du candidat');
          console.log(err);
        })
    }
    if (this.saveOrUpdateMode == FormMode.Update) {
      this.candidatesService.updateResource("/api/candidate/updateCandidate/" + this.candidateId, formValue)
        .subscribe(res => {
          this.buildMessageModal('Le candidat a été modifié avec succès');
        }, err => {
          console.log(err);
        })
    }
  }

  onBackToAddCandidate() {
    this.mode = 1;
  }

  /**
   * Construit le message à afficher suite à une action utilisateur.
   * @param msg 
   */
  buildMessageModal(msg: string) {
    this.messageModal = msg;
    this.displayMessageModal = true;
  }

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );

  }

  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

}
