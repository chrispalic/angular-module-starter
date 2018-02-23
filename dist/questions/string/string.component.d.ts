import { OnInit, AfterViewInit, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { QuestionBase } from '../question-base';
export declare class StringComponent extends QuestionBase implements OnInit, AfterViewInit, OnDestroy {
    private changeDetector;
    formInputElements: ElementRef[];
    constructor(changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
