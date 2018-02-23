var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Input } from '@angular/core';
import { Validators } from '@angular/forms';
// import { RuleCommunicationService } from '../services/rule-communication.service';
var QuestionBase = /** @class */ (function () {
    function QuestionBase(baseChangeDetector) {
        this.baseChangeDetector = baseChangeDetector;
        this.readOnly = false;
        this.language = 'english';
        this.validatorsToBind = [];
        this.visible = true;
        this.hasError = false;
        this.errorMessage = '';
        // CSS related vars
        this.divClass = 'question-input';
        this.labelClass = 'question-label';
        this.containerClass = 'col-md-6';
        this.validationMessages = {
            english: {
                required: 'This is a required field',
                minlength: 'This field must be at least X characters',
                maxlength: 'This field cannot exceed X characters',
                pattern: 'This field is not the correct type'
            },
            spanish: {
                required: 'Este es un campo obligatorio',
                minlength: 'Este campo debe tener como mínimo X caracteres',
                maxlength: 'Este campo no puede exceder los caracteres X'
            }
        };
        // this.subscription = baseRuleService.ruleAnnounceSource$.subscribe(
        //   (ruleAction:any) => {
        //     if(this.formControlName === ruleAction.name) {
        //       this.ruleActionHandler(ruleAction);
        //     }
        //   }
        // )
    }
    QuestionBase.prototype.setCssClasses = function (columnWidth) {
        switch (columnWidth) {
            case 3: {
                if (this.labelText.length === 0) {
                    this.divClass = 'col-md-12';
                    this.labelClass = 'hidden';
                    this.containerClass = 'col-md-3';
                }
                else {
                    this.containerClass = 'col-md-3';
                }
                break;
            }
            case 6: {
                if (this.labelText.length === 0) {
                    this.divClass = 'question-input no-label';
                    this.labelClass = 'hidden';
                }
                break;
            }
            case 4: {
                if (this.labelText.length === 0) {
                    this.divClass = 'col-md-12';
                    this.labelClass = 'hidden';
                    this.containerClass = 'col-md-4';
                }
                else {
                    this.containerClass = 'col-md-4';
                }
                break;
            }
            case 5: {
                if (this.labelText.length === 0) {
                    this.divClass = 'col-md-12';
                    this.labelClass = 'hidden';
                    this.containerClass = 'col-md-5';
                }
                else {
                    this.containerClass = 'col-md-5';
                }
                break;
            }
            case 7: {
                if (this.labelText.length === 0) {
                    this.divClass = 'col-md-12';
                    this.labelClass = 'hidden';
                    this.containerClass = 'col-md-7';
                }
                else {
                    this.containerClass = 'col-md-7';
                }
                break;
            }
            case 12: {
                if (this.labelText.length === 0) {
                    this.divClass = 'question-input-large no-label';
                    this.labelClass = 'hidden';
                    this.containerClass = 'col-md-12';
                }
                else {
                    this.divClass = 'question-input-large';
                    this.labelClass = 'question-label-large';
                    this.containerClass = 'col-md-12';
                }
                break;
            }
        }
    };
    QuestionBase.prototype.checkValidationStatus = function (control, language, forceValidation) {
        var _this = this;
        if (forceValidation === void 0) { forceValidation = false; }
        // reset hasError and message string
        var message = '';
        this.hasError = false;
        if ((control.dirty || control.touched || forceValidation) && control.errors) {
            Object.keys(control.errors).map(function (messageKey) {
                if (_this.validationMessages[_this.language][messageKey]) {
                    var tempMessage = _this.validationMessages[_this.language][messageKey];
                    if (messageKey === 'minlength') {
                        tempMessage = tempMessage.replace('X', _this.definition.min_size.toString());
                    }
                    else if (messageKey === 'maxlength') {
                        tempMessage = tempMessage.replace('X', _this.definition.max_size.toString());
                    }
                    message += tempMessage + ' ';
                    _this.hasError = true;
                }
            });
        }
        return message;
    };
    QuestionBase.prototype.setParameters = function (definition) {
        this.formControlName = definition.name;
        this.labelText = definition.text;
        this.placeholder = definition.placeholder;
        this.currentControl = this.form.get(this.formControlName);
        this.visible = definition.visible;
        this.id = definition.id;
        this.required = definition.required;
        if (definition.min_size && definition.min_size !== -987) {
            this.validatorsToBind.push(Validators.minLength(definition.min_size));
        }
        if (definition.max_size && definition.max_size !== -987) {
            this.validatorsToBind.push(Validators.maxLength(definition.max_size));
        }
        if (definition.required && definition.visible) {
            this.validatorsToBind.push(Validators.required);
        }
        if (this.validatorsToBind.length > 0) {
            this.currentControl.setValidators(this.validatorsToBind);
        }
        this.setCssClasses(definition.column_width);
        this.baseChangeDetector.detectChanges();
    };
    QuestionBase.prototype.ruleActionHandler = function (ruleAction) {
        switch (ruleAction.action) {
            case 'show question': {
                if (!this.visible) {
                    this.visible = true;
                    if (this.required && this.visible) {
                        this.definition.required = true;
                        this.bindValidationArray(this.buildValidationArray(this.definition));
                    }
                }
                break;
            }
            case 'hide question': {
                if (this.visible) {
                    this.visible = false;
                    if (this.required && !this.visible) {
                        this.definition.required = false;
                        this.bindValidationArray(this.buildValidationArray(this.definition));
                    }
                }
                break;
            }
            case 'set question value': {
                if (this.currentControl.value !== ruleAction.value) {
                    this.currentControl.setValue(ruleAction.value);
                    this.value = ruleAction.value;
                }
                break;
            }
            case 'make question readonly': {
                if (this.readOnly === false) {
                    this.readOnly = true;
                    // ensure the local varialbe is the same as the form model
                    this.value = this.currentControl.value;
                }
                break;
            }
            case 'make question editable': {
                if (this.readOnly === true) {
                    this.readOnly = false;
                }
                break;
            }
            case 'make question required': {
                break;
            }
            case 'make question not required': {
                break;
            }
            case 'change dropdown code group id': {
                this.loadData(ruleAction.value);
                break;
            }
            case 'force question validation': {
                this.errorMessage = this.checkValidationStatus(this.currentControl, this.language, true);
                break;
            }
        }
    };
    QuestionBase.prototype.buildValidationArray = function (definition) {
        var validators = [];
        if (definition.min_size && definition.min_size !== -987) {
            validators.push(Validators.minLength(definition.min_size));
        }
        if (definition.max_size && definition.max_size !== -987) {
            validators.push(Validators.maxLength(definition.max_size));
        }
        if (definition.required && definition.visible) {
            validators.push(Validators.required);
        }
        return validators;
    };
    QuestionBase.prototype.bindValidationArray = function (validators) {
        if (validators.length > 0) {
            this.currentControl.setValidators(validators);
        }
    };
    QuestionBase.prototype.loadData = function (dataObject) {
        // We do nothing here, but we implement only in the questions that need it.
        // if (this.loadDataFunc && typeof this.loadDataFunc === "function" ){
        //   this.loadDataFunc(dataObject);
        // }
    };
    __decorate([
        Input()
    ], QuestionBase.prototype, "form", void 0);
    __decorate([
        Input()
    ], QuestionBase.prototype, "readOnly", void 0);
    __decorate([
        Input()
    ], QuestionBase.prototype, "definition", void 0);
    __decorate([
        Input()
    ], QuestionBase.prototype, "language", void 0);
    return QuestionBase;
}());
export { QuestionBase };
//# sourceMappingURL=question-base.js.map