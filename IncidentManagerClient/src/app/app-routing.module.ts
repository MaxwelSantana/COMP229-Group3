import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminModule } from './auth/admin.module';
import { IncidentTableComponent } from './incident/incidentTable.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { IncidentEditorComponent } from './incident/incidentEditor.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
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
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdminModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
