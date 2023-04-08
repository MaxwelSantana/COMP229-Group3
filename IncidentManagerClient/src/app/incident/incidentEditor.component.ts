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
  errorMessage: string = '';
  currentStatus?: string;
  statusCssClass = {
    New: 'text-bg-secondary',
    'In Progress': 'text-bg-primary',
    Dispatched: 'text-bg-warning',
    Close: 'text-bg-success',
  };

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
        .subscribe((data) => {
          this.incident = data;
          this.currentStatus = this.incident.Status;
          console.log(data);
        });
    }
  }

  save(form: NgForm) {
    if (this.isTicketClosed()) {
      this.errorMessage = 'Ticket Closed';
      return;
    }

    if (form.valid) {
      this.repository.saveIncident(this.incident);
      this.router.navigateByUrl('/incidents');
    } else {
      this.errorMessage = 'Form Data Invalid';
    }
  }

  isTicketClosed() {
    return this.currentStatus == 'Close';
  }

  showForm() {
    if (!this.editing) {
      return true;
    }
    return !!this.incident._id;
  }

  getRecordNumber() {
    return `#${this.incident.RecordNumber || ''}`;
  }

  hasStatusChange() {
    return this.currentStatus != this.incident.Status;
  }

  isResolutionMessage() {
    return this.incident.Status === 'Close';
  }

  getStatusCssClass(status?: string) {
    if (!status) return;

    return this.statusCssClass[status as keyof typeof this.statusCssClass];
  }
}
