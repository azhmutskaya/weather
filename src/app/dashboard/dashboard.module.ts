import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { KelvinToCelsiusPipe } from '../pipes/kelvin-to-celsius.pipe';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { SearchComponent } from './search/search.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DailyComponent } from './forecast/daily/daily.component';
import { WeeklyComponent } from './forecast/weekly/weekly.component';
import { NotFoundComponent } from './forecast/not-found/not-found.component';


@NgModule({
  declarations: [
    KelvinToCelsiusPipe,
    DashboardComponent,
    SearchComponent,
    NavigationComponent,
    DailyComponent,
    WeeklyComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ],
  exports: [
    DashboardComponent,
    SearchComponent,
    NavigationComponent
  ]
})
export class DashboardModule { }
