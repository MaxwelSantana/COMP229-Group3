import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IncidentRepository } from './incident.repository';
import { RestDataSource } from './rest.datasource';

@NgModule({
  imports: [HttpClientModule],
  providers: [IncidentRepository, RestDataSource],
})
export class ModelModule {}
