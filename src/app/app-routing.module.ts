import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesComponent } from './candidates/candidates.component';
import { AddCandidateComponent } from './candidates/add-candidate/add-candidate.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "/candidates",
    pathMatch: "full"
  },
  {
    path: "candidates",
    component: CandidatesComponent
  },
  {
    path: "add-candidate",
    component: AddCandidateComponent
  },
  {
   path: "login",
   component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
