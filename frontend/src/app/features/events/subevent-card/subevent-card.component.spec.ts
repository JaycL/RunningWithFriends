import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubeventCardComponent } from './subevent-card.component';

describe('SubeventCardComponent', () => {
  let component: SubeventCardComponent;
  let fixture: ComponentFixture<SubeventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubeventCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubeventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
