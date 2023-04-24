import { Component, Input } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { InteractService } from '../interact-service.service';

@Component({
  selector: 'app-year-slider',
  templateUrl: './year-slider.component.html',
  styleUrls: ['./year-slider.component.css']
})
export class YearSliderComponent {
  constructor(private interactService: InteractService) { }
  year: number = 5;
  options: Options = {
    floor: 2020,
    ceil: 2022,
    step: 1,
    showTicks: true,
    showTicksValues: true
  };
  onSliderChange() {
    // console.log(this.year);
    this.updateValues(this.year);

  }
  updateValues(yearData: any) {
    // Emit new values to chart component using interact service
    this.interactService.sendYear(yearData);
  }
}
