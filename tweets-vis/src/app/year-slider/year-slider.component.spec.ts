import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearSliderComponent } from './year-slider.component';

describe('YearSliderComponent', () => {
  let component: YearSliderComponent;
  let fixture: ComponentFixture<YearSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
