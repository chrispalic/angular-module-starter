import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { DebugElement } from '@angular/core';

import { StringComponent } from './string.component';
import { RuleCommunicationService } from '../../services/rule-communication.service';

describe('StringComponent', () => {
  let component: StringComponent;
  let fixture: ComponentFixture<StringComponent>;
  let element: HTMLElement;
  let debugElement: DebugElement;
  const formGroup: FormGroup = new FormGroup({
    String_Test_Question: new FormControl()
  });
  const definition = {
    'id':12345,
    'text':'String Test Text',
    'tooltip':'',
    'name':'String_Test_Question',
    'max_size':-987,
    'min_size':-987,
    'required':false,
    'def_datatype_id':66,
    'code_group_id':-987,
    'reflect_lookup_id':-987,
    'placeholder':'',
    'column_width':12,
    'visible':true
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ StringComponent ],
      providers: [ RuleCommunicationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    element = fixture.nativeElement;
    component.form = formGroup;
    component.definition = definition;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
