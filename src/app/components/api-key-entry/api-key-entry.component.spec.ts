import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeyEntryComponent } from './api-key-entry.component';

describe('ApiKeyEntryComponent', () => {
  let component: ApiKeyEntryComponent;
  let fixture: ComponentFixture<ApiKeyEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiKeyEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiKeyEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
