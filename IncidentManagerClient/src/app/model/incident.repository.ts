import { Injectable } from '@angular/core';
import { Incident } from './incident.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class IncidentRepository {
  private incidents: Incident[] = [];

  constructor(private dataSource: RestDataSource) {
    dataSource.getIncidents().subscribe((data) => {
      this.incidents = data;
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
      this.dataSource
        .saveIncident(incident)
        .subscribe((p) => this.incidents.push(p));
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

  deleteProduct(id: number) {
    this.dataSource.deleteIncident(id).subscribe((p) => {
      this.incidents.splice(
        this.incidents.findIndex((p) => p._id == id),
        1
      );
    });
  }
}
