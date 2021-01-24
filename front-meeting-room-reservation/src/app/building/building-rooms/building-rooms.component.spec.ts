import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingRoomsComponent } from './building-rooms.component';

describe('BuildingRoomsComponent', () => {
  let component: BuildingRoomsComponent;
  let fixture: ComponentFixture<BuildingRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
