import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractService {
  private sentimentGetter = new BehaviorSubject<any>(null);
  sentiment$ = this.sentimentGetter.asObservable();
  private yearFromSlider = new BehaviorSubject<any>(null);
  year$ = this.yearFromSlider.asObservable();
  constructor() { }
  sendSentiment(sentimentData: any) {
    this.sentimentGetter.next(sentimentData);
  }
  sendYear(yearData: any) {
    this.yearFromSlider.next(yearData);
  }
}
