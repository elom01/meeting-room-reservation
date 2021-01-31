import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingRoomFormComponent } from './meeting-room-form.component';

describe('MeetingRoomFormComponent', () => {
  let component: MeetingRoomFormComponent;
  let fixture: ComponentFixture<MeetingRoomFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingRoomFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingRoomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
