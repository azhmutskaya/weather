import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyComponent } from './forecast/daily/daily.component';
import { WeeklyComponent } from './forecast/weekly/weekly.component';

const dashboardRoutes: Routes = [
  { path: '', redirectTo: '/daily', pathMatch: 'full' },
  { path: 'daily', component: DailyComponent },
  { path: 'weekly', component: WeeklyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
