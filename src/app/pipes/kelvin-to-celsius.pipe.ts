import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvinToCelsius'
})
export class KelvinToCelsiusPipe implements PipeTransform {

  transform(kelvin: number): string {
    return Math.round(kelvin - 273.15) + ' °C';
  }

}
