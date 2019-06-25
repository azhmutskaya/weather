import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { IconSpriteModule } from 'ng-svg-icon-sprite';
import { MatAutocompleteModule, MatInputModule, MatFormFieldModule } from '@angular/material';

import { KelvinToCelsiusPipe } from './pipes/kelvin-to-celsius.pipe';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { SearchComponent } from './components/search/search.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DailyComponent } from './components/daily/daily.component';
import { WeeklyComponent } from './components/weekly/weekly.component';
import { NotFoundComponent } from './components/not-found/not-found.component';



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
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule,
        IconSpriteModule.forRoot({path: 'assets/images/svg-sprite.svg'}),
        DashboardRoutingModule
    ]
})
export class DashboardModule { }
