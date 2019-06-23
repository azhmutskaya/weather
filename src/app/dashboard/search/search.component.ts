import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./../dashboard.component.scss']
})

export class SearchComponent implements OnInit {
  cityValue: string;
  searchForm = new FormGroup({
    city: new FormControl('')
  });

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getLocation();
  }

  getLocation(): void {
    this.locationService.getLocation().subscribe((data: any) => {
      this.cityValue = data.city;
      this.updateСity();
      this.router.navigate([], { queryParams: { city: this.cityValue } });
    });
  }

  updateСity(): void {
    this.searchForm.setValue({city: this.cityValue});
  }

  onSubmit(): void {
    this.cityValue = this.searchForm.value.city.trim();
    this.router.navigate([], { queryParams: { city: this.cityValue } });
  }

}
