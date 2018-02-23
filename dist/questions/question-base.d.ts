import { ChangeDetectorRef } from '@angular/core';
import { FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
export declare class QuestionBase {
    private baseChangeDetector;
    form: FormGroup;
    readOnly: boolean;
    definition: any;
    language: string;
    protected currentControl: any;
    protected validatorsToBind: Array<ValidatorFn>;
    placeholder: string;
    labelText: string;
    formControlName: string;
    visible: boolean;
    value: string;
    id: number;
    hasError: boolean;
    errorMessage: string;
    subscription: Subscription;
    required: boolean;
    loadDataFunc: any;
    divClass: string;
    labelClass: string;
    containerClass: string;
    protected validationMessages: {
        [key: string]: {
            [key: string]: string;
        };
    };
    constructor(baseChangeDetector: ChangeDetectorRef);
    setCssClasses(columnWidth: number): void;
    checkValidationStatus(control: AbstractControl, language: string, forceValidation?: boolean): string;
    setParameters(definition: any): void;
    ruleActionHandler(ruleAction: any): void;
    buildValidationArray(definition: any): Array<ValidatorFn>;
    bindValidationArray(validators: Array<ValidatorFn>): void;
    loadData(dataObject: any): void;
}
