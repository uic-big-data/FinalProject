import { Component, Input } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';


@Component({
  selector: 'app-year-slider',
  templateUrl: './year-slider.component.html',
  styleUrls: ['./year-slider.component.css']
})
export class YearSliderComponent {
  value: number = 500;

  formatCurrency(value: number) {
    return '$' + value;
  }

  onSliderChange(event: MatSliderChange) {
    this.value = event.value;
  }
}
