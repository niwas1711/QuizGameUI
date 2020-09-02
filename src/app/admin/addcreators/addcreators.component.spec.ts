import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcreatorsComponent } from './addcreators.component';

describe('AddcreatorsComponent', () => {
  let component: AddcreatorsComponent;
  let fixture: ComponentFixture<AddcreatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcreatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcreatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
