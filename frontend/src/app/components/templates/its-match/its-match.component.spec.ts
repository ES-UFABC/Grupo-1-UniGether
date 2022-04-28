import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItsMatchComponent } from './its-match.component';

describe('ItsMatchComponent', () => {
  let component: ItsMatchComponent;
  let fixture: ComponentFixture<ItsMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItsMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItsMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
