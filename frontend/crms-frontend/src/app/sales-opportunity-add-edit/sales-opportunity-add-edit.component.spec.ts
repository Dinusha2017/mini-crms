import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOpportunityAddEditComponent } from './sales-opportunity-add-edit.component';

describe('SalesOpportunityAddEditComponent', () => {
  let component: SalesOpportunityAddEditComponent;
  let fixture: ComponentFixture<SalesOpportunityAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesOpportunityAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOpportunityAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
