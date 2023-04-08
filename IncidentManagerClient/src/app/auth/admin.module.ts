import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register.component';
import { IncidentEditorComponent } from '../incident/incidentEditor.component';
import { IncidentTableComponent } from '../incident/incidentTable.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'incidents/:mode/:id',
    component: IncidentEditorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'incidents/:mode',
    component: IncidentEditorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'incidents',
    component: IncidentTableComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  providers: [AuthGuard],
  declarations: [LoginComponent, RegisterComponent],
})
export class AdminModule {}
