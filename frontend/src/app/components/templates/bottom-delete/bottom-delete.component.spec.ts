import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomDeleteComponent } from './bottom-delete.component';

describe('BottomDeleteComponent', () => {
  let component: BottomDeleteComponent;
  let fixture: ComponentFixture<BottomDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
