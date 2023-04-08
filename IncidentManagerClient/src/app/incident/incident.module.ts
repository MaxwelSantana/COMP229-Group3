import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../components/loading.component';
import { IncidentEditorComponent } from './incidentEditor.component';
import { IncidentTableComponent } from './incidentTable.component';

@NgModule({
  declarations: [
    IncidentEditorComponent,
    IncidentTableComponent,
    LoadingComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild([])],
})
export class IncidentModule {}
