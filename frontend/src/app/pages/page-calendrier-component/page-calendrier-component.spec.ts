import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCalendrierComponent } from './page-calendrier-component';

describe('PageCalendrierComponent', () => {
  let component: PageCalendrierComponent;
  let fixture: ComponentFixture<PageCalendrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCalendrierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
