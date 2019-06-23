import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { Router } from '@angular/router';
import { map, filter, distinctUntilChanged, debounceTime, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {
  public searchForm = new FormGroup({
    city: new FormControl('')
  });

  private cityValue: string;
  private subscription: Subscription;

  constructor(
    private locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getLocation();

    this.subscription = this.searchForm.controls.city.valueChanges.pipe(
      map((v: string) => v.trim()),
      filter((v: string) => !!v.length),
      debounceTime(500),
      distinctUntilChanged((x: string, y: string) => x === y)
    ).subscribe((v: string) => {
      this.cityValue = v;
      this.router.navigate([], { queryParams: { city: this.cityValue } });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onSubmit(): void {
    this.cityValue = this.searchForm.value.city.trim();
    this.router.navigate([], { queryParams: { city: this.cityValue } });
  }

  private getLocation(): void {
    this.locationService.getLocation()
      .subscribe((data: any) => {
        this.cityValue = data.city;
        this.updateСity();
        this.router.navigate([], { queryParams: { city: this.cityValue } });
      });
  }

  private updateСity(): void {
    this.searchForm.setValue({ city: this.cityValue });
  }
}
