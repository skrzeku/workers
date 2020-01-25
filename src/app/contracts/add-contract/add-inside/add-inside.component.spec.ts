import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsideComponent } from './add-inside.component';

describe('AddInsideComponent', () => {
  let component: AddInsideComponent;
  let fixture: ComponentFixture<AddInsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
