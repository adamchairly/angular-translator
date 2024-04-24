import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonymPageComponent } from './synonym-page.component';

describe('SynonymPageComponent', () => {
  let component: SynonymPageComponent;
  let fixture: ComponentFixture<SynonymPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SynonymPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SynonymPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
