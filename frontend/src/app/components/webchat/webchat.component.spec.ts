import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebchatComponent } from './webchat.component';

describe('WebchatComponent', () => {
  let component: WebchatComponent;
  let fixture: ComponentFixture<WebchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
