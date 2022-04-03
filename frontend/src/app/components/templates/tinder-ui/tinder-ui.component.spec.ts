import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinderUIComponent } from './tinder-ui.component';

describe('TinderUIComponent', () => {
  let component: TinderUIComponent;
  let fixture: ComponentFixture<TinderUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinderUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinderUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
