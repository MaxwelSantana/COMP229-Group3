import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
import { IncidentTableComponent } from '../incident/incidentTable.component';
import { IncidentEditorComponent } from '../incident/incidentEditor.component';

let routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
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
  { path: '**', redirectTo: 'incidents' },
]);

@NgModule({
  imports: [CommonModule, FormsModule],
  providers: [AuthGuard],
  declarations: [AuthComponent],
})
export class AdminModule {}
