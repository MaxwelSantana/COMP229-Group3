import { Component } from '@angular/core';
import { Incident } from '../model/incident.model';
import { IncidentRepository } from '../model/incident.repository';

@Component({
  templateUrl: './incidentTable.component.html',
})
export class IncidentTableComponent {
  constructor(private repository: IncidentRepository) {}

  getIncidents(): Incident[] {
    return this.repository.getIncidents();
  }

  deleteProduct(incidentId?: number): void {
    if (!incidentId) return;
    this.repository.deleteProduct(incidentId);
  }
}
