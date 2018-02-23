var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { QuestionBase } from '../question-base';
// import { RuleCommunicationService } from '../../services/rule-communication.service';
// Disabling linting for the component declaration - CTP
/* tslint:disable */
var StringComponent = /** @class */ (function (_super) {
    __extends(StringComponent, _super);
    function StringComponent(changeDetector) {
        var _this = _super.call(this, changeDetector) || this;
        _this.changeDetector = changeDetector;
        return _this;
    }
    ;
    StringComponent.prototype.ngOnInit = function () {
        _super.prototype.setParameters.call(this, this.definition);
        this.value = this.currentControl.value;
    };
    ;
    StringComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var blurEvents = this.formInputElements
            .map(function (formControl) { return Observable.fromEvent(formControl.nativeElement, 'blur'); });
        // TODO: Need to regroup on this
        // let blurEvents: Observable<any>[];
        // this.formInputElements.do((element:ElementRef) => blurEvents.push(Observable.fromEvent(element.nativeElement, 'blur')));
        // this.formInputElements
        //         .map((formControl: ElementRef) => {debugger;blurEvents.push(Observable.fromEvent(formControl.nativeElement, 'blur'));})
        Observable.merge.apply(Observable, [this.currentControl.valueChanges].concat(blurEvents)).debounceTime(500).subscribe(function (value) {
            _this.errorMessage = _this.checkValidationStatus(_this.currentControl, _this.language);
        });
    };
    ;
    StringComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    __decorate([
        ViewChildren(FormControlName, { read: ElementRef })
    ], StringComponent.prototype, "formInputElements", void 0);
    StringComponent = __decorate([
        Component({
            selector: 'question-string',
            templateUrl: './string.component.html',
            styleUrls: ['./string.component.css']
        })
        /* tslint:enable */
    ], StringComponent);
    return StringComponent;
}(QuestionBase));
export { StringComponent };
//# sourceMappingURL=string.component.js.map