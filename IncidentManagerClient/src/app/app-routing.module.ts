import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminModule } from './auth/admin.module';
import { IncidentTableComponent } from './incident/incidentTable.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login.component';
import { IncidentEditorComponent } from './incident/incidentEditor.component';
import { RegisterComponent } from './auth/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdminModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
