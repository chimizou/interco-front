import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { AjouterEtudiantComponent } from './etudiants/ajouter-etudiant/ajouter-etudiant.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "/etudiants",
    pathMatch: "full"
  },
  {
    path: "etudiants",
    component: EtudiantsComponent
  },
  {
    path: "ajouter-etudiant",
    component: AjouterEtudiantComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
