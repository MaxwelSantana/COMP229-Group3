import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidentEditorComponent } from './incidentEditor.component';
import { IncidentTableComponent } from './incidentTable.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [IncidentEditorComponent, IncidentTableComponent],
  imports: [CommonModule, FormsModule, AppRoutingModule],
})
export class IncidentModule {}
