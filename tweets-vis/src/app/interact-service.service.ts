import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractService {
  private sentimentGetter = new BehaviorSubject<any>(null);
  sentiment$ = this.sentimentGetter.asObservable();
  constructor() { }
  sendSentiment(sentimentData: any) {
    this.sentimentGetter.next(sentimentData);
  }
}
