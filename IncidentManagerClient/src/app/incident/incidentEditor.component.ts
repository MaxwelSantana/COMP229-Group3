import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Incident } from '../model/incident.model';
import { IncidentRepository } from '../model/incident.repository';
import { RestDataSource } from '../model/rest.datasource';

@Component({
  templateUrl: './incidentEditor.component.html',
})
export class IncidentEditorComponent {
  editing: boolean = false;
  incident: Incident = new Incident();

  constructor(
    private repository: IncidentRepository,
    private router: Router,
    activeRoute: ActivatedRoute,
    dataSource: RestDataSource
  ) {
    this.editing = activeRoute.snapshot.params['mode'] == 'edit';

    if (this.editing) {
      dataSource
        .getIncident(activeRoute.snapshot.params['id'])
        .subscribe((data) => (this.incident = data));
    }
  }

  save(form: NgForm) {
    this.repository.saveIncident(this.incident);
    this.router.navigateByUrl('/incidents');
  }
}
