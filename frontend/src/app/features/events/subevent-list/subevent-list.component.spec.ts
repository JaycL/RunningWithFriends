import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubeventListComponent } from './subevent-list.component';

describe('SubeventListComponent', () => {
  let component: SubeventListComponent;
  let fixture: ComponentFixture<SubeventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubeventListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubeventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
