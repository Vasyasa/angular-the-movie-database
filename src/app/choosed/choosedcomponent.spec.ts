import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosedComponent } from './choosed.component';

describe('ChoosedComponent', () => {
  let component: ChoosedComponent;
  let fixture: ComponentFixture<ChoosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
