import { Component, OnInit, Input, AfterViewInit, ViewChildren, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControlName, AbstractControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';




import { QuestionBase } from '../question-base';
import { RuleCommunicationService } from '../../services/rule-communication.service';
// Disabling linting for the component declaration - CTP
/* tslint:disable */
@Component({
  selector: 'question-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.css']
})
/* tslint:enable */
export class StringComponent extends QuestionBase implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  constructor(private ruleService:RuleCommunicationService, private changeDetector:ChangeDetectorRef) {
    super(ruleService, changeDetector);
  };

  ngOnInit() {
    super.setParameters(this.definition);
    this.value = this.currentControl.value;
  };

  ngAfterViewInit() {
    const blurEvents: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));
    // TODO: Need to regroup on this
    // let blurEvents: Observable<any>[];
    // this.formInputElements.do((element:ElementRef) => blurEvents.push(Observable.fromEvent(element.nativeElement, 'blur')));
    // this.formInputElements
    //         .map((formControl: ElementRef) => {debugger;blurEvents.push(Observable.fromEvent(formControl.nativeElement, 'blur'));})
    Observable.merge(this.currentControl.valueChanges, ...blurEvents).debounceTime(500).subscribe((value:any) => {
            this.errorMessage = this.checkValidationStatus(this.currentControl, this.language);
        });
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
