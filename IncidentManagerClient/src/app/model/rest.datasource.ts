import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from './incident.model';
import { map, switchMap } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';

const PROTOCOL = 'http';
const PORT = 3000;
@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/api/`;
    //this.baseUrl = `/api/`;
  }
  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.baseUrl + 'incidents');
  }
  authenticate(user: string, pass: string): Observable<boolean> {
    return this.http.post<any>(this.baseUrl + "auth/login", {
        username: user, password: pass
    }).pipe(map(response => {
        this.auth_token = response.success ? response.token : null;
        return response.success;
    }));
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
  private getOptions() {
    return {
        headers: new HttpHeaders({
            "Authorization": `Bearer<${this.auth_token}>`
        })
    }
  }
}

