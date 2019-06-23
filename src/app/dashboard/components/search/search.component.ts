import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, filter, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {
    public city = new FormControl('');

    private subscription: Subscription;

    constructor(
        private locationService: LocationService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.city.valueChanges.pipe(
            map((value: string) => value.trim()),
            filter((value: string) => !!value.length),
            debounceTime(500),
            distinctUntilChanged((x: string, y: string) => x === y)
        ).subscribe((value: string) => {
            console.log(value);
            this.router.navigate([], {queryParams: {city: value}});
        });

        this.route.queryParams.subscribe((data: any) => {
            data.city
                ? this.updateСity(data.city)
                : this.getLocation();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private getLocation(): void {
        this.locationService.getLocation()
            .subscribe((data: any) => {
                this.updateСity(data.city);
                this.router.navigate([], {queryParams: {city: data.city}});
            });
    }

    private updateСity(cityValue: string): void {
        this.city.setValue(cityValue);
    }
}
