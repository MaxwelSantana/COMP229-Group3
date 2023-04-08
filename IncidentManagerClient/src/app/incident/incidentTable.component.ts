import { Component } from '@angular/core';
import { Incident } from '../model/incident.model';
import { IncidentRepository } from '../model/incident.repository';

@Component({
  templateUrl: './incidentTable.component.html',
})
export class IncidentTableComponent {
  showResolvedIncidents: boolean = false;
  constructor(private repository: IncidentRepository) {}

  getIncidents(): Incident[] {
    return this.repository
      .getIncidents()
      .filter((incident) => incident.Status != 'Close');
  }

  getResolvedIncidents(): Incident[] {
    return this.repository
      .getIncidents()
      .filter((incident) => incident.Status == 'Close');
  }

  deleteProduct(incidentId?: number): void {
    if (!incidentId) return;
    this.repository.deleteProduct(incidentId);
  }

  getRecordNumber(incident: Incident) {
    if (!incident.RecordNumber) return '#';
    return `#${incident.RecordNumber}`;
  }
}
