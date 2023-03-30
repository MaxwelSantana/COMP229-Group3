import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from './incident.model';

const PROTOCOL = 'http';
const PORT = 3000;
@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }
  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.baseUrl + 'incidents');
  }
  getIncident(id: string): Observable<Incident> {
    return this.http.get<Incident>(this.baseUrl + `incidents/${id}`);
  }
  saveIncident(incident: Incident): Observable<Incident> {
    return this.http.post<Incident>(this.baseUrl + 'incidents', incident);
  }
  updateIncident(incident: Incident): Observable<Incident> {
    return this.http.post<Incident>(
      `${this.baseUrl}incidents/${incident._id}`,
      incident
    );
  }
  deleteIncident(id: number): Observable<number> {
    return this.http.delete<number>(`${this.baseUrl}incidents/${id}`);
  }
}
