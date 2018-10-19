import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import {UsersComponent} from './users/users.component';
import {ReportingComponent} from './reporting/reporting.component';
import {EventViewerComponent} from './event-viewer/event-viewer.component';
import {FindComponent} from './find/find.component';
import {SimulatorComponent} from './simulator/simulator.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent},
  { path: 'reporting', component: ReportingComponent},
  { path: 'event', component: EventViewerComponent},
  { path: 'find', component: FindComponent},
  { path: 'simulator', component: SimulatorComponent}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
