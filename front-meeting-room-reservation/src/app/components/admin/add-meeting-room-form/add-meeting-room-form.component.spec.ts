import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetingRoomFormComponent } from './add-meeting-room-form.component';

describe('AddMeetingRoomFormComponent', () => {
  let component: AddMeetingRoomFormComponent;
  let fixture: ComponentFixture<AddMeetingRoomFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMeetingRoomFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeetingRoomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
