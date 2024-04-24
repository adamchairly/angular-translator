import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeeplPageComponent } from './deepl-page.component';

describe('DeeplPageComponent', () => {
  let component: DeeplPageComponent;
  let fixture: ComponentFixture<DeeplPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeeplPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeeplPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
