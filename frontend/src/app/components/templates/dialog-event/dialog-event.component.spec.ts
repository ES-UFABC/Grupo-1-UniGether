import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEventComponent } from './dialog-event.component';

describe('DialogEventComponent', () => {
  let component: DialogEventComponent;
  let fixture: ComponentFixture<DialogEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
