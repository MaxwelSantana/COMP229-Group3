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

  getRecordNumber(incident: Incident) {
    if (!incident.RecordNumber) return '#';
    return `#${incident.RecordNumber}`;
  }
}
