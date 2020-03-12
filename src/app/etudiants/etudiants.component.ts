import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent implements OnInit {

  etudiants;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

  }

  onGetEtudiants() {
    this.httpClient.get("http://localhost:8080/etudiants/")
    .subscribe(data => {
      this.etudiants = data;
    }, err => {
      console.log(err)
    })
  }

}
