var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import "rxjs/add/operator/debounceTime";
import 'rxjs/add/operator/do';
import { StringComponent } from './string/string.component';
var QuestionsModule = /** @class */ (function () {
    function QuestionsModule() {
    }
    QuestionsModule = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [
                StringComponent
            ],
            exports: [
                StringComponent
            ]
        })
    ], QuestionsModule);
    return QuestionsModule;
}());
export { QuestionsModule };
//# sourceMappingURL=questions.module.js.map