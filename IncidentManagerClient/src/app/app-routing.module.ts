import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentEditorComponent } from './incident/incidentEditor.component';
import { IncidentTableComponent } from './incident/incidentTable.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  { path: 'incidents/:mode/:id', component: IncidentEditorComponent },
  { path: 'incidents/:mode', component: IncidentEditorComponent },
  { path: 'incidents', component: IncidentTableComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
