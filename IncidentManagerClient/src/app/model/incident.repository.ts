import { Injectable } from '@angular/core';
import { Incident } from './incident.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class IncidentRepository {
  private incidents: Incident[] = [];
  private statusOrder = ['New', 'In Progress', 'Dispatched', 'Close'];

  constructor(private dataSource: RestDataSource) {
    dataSource.getIncidents().subscribe((data) => {
      this.incidents = this.sortIncidents(data);
    });
  }

  sortIncidents(incidents: Incident[]) {
    return incidents.sort(
      (a, b) => -1 * (a.RecordNumber || '').localeCompare(b.RecordNumber || '')
    );
  }

  sortIncidentsByStatus(incidents: Incident[]) {
    return incidents.sort((a, b) => {
      if (
        this.statusOrder.indexOf(a.Status || '') <
        this.statusOrder.indexOf(b.Status || '')
      ) {
        return -1;
      } else if (
        this.statusOrder.indexOf(a.Status || '') >
        this.statusOrder.indexOf(b.Status || '')
      ) {
        return 1;
      }
      return 0;
    });
  }

  getIncidents(): Incident[] {
    return this.incidents;
  }

  getIncident(id: number): Incident {
    return this.incidents.find((incident) => incident._id == id)!;
  }

  saveIncident(incident: Incident) {
    if (incident._id == null || incident._id == 0) {
      this.dataSource.saveIncident(incident).subscribe((p) => {
        this.incidents.push(p);
        this.incidents = this.sortIncidents(this.incidents);
      });
    } else {
      this.dataSource.updateIncident(incident).subscribe((p) => {
        this.incidents.splice(
          this.incidents.findIndex((p) => p._id == incident._id),
          1,
          incident
        );
      });
    }
  }

  deleteIncident(id: number) {
    this.dataSource.deleteIncident(id).subscribe((p) => {
      this.incidents.splice(
        this.incidents.findIndex((p) => p._id == id),
        1
      );
    });
  }
}
