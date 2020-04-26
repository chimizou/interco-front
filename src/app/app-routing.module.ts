import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesComponent } from './candidates/candidates.component';
import { HomeComponent } from './home/home.component';
import { AddCandidateComponent } from './candidates/add-candidate/add-candidate.component';
import { LoginComponent } from './login/login.component';
import { EditCandidateComponent } from './candidates/edit-candidate/edit-candidate.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
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
    path: "edit-candidate/:idCandidate",
    component: EditCandidateComponent
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
