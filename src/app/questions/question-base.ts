import { Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

// import { RuleCommunicationService } from '../services/rule-communication.service';
export class QuestionBase {
  @Input()form:FormGroup;
  @Input()readOnly = false;
  @Input()definition:any;
  @Input()language = 'english';
  protected currentControl:any;
  protected validatorsToBind:Array<ValidatorFn>=[];
  public placeholder:string;
  public labelText:string;
  public formControlName:string;
  public visible = true;
  public value:string;
  public id:number;
  public hasError = false;
  public errorMessage = '';
  public subscription:Subscription;
  public required:boolean;
  public loadDataFunc:any
  // CSS related vars
  public divClass = 'question-input';
  public labelClass = 'question-label';
  public containerClass = 'col-md-6';
  protected validationMessages: { [key: string]: { [key: string]: string } };
  constructor( private baseChangeDetector: ChangeDetectorRef) {
    this.validationMessages = {
      english:{
        required:'This is a required field',
        minlength:'This field must be at least X characters',
        maxlength:'This field cannot exceed X characters',
        pattern:'This field is not the correct type'
      },
      spanish:{
        required:'Este es un campo obligatorio',
        minlength:'Este campo debe tener como mínimo X caracteres',
        maxlength:'Este campo no puede exceder los caracteres X'
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
  setCssClasses(columnWidth:number):void {
    switch (columnWidth) {
      case 3:{
        if (this.labelText.length === 0) {
          this.divClass = 'col-md-12';
          this.labelClass = 'hidden';
          this.containerClass = 'col-md-3'
        } else {
          this.containerClass = 'col-md-3';
        }
        break;
      }
      case 6:{
        if (this.labelText.length === 0) {
          this.divClass = 'question-input no-label';
          this.labelClass = 'hidden';
        }
        break;
      }
      case 4:{
        if (this.labelText.length === 0) {
          this.divClass = 'col-md-12';
          this.labelClass = 'hidden';
          this.containerClass = 'col-md-4'
        } else {
          this.containerClass = 'col-md-4';
        }
        break;
      }
      case 5:{
        if(this.labelText.length === 0) {
          this.divClass = 'col-md-12';
          this.labelClass = 'hidden';
          this.containerClass = 'col-md-5';
        } else {
          this.containerClass = 'col-md-5';
        }
        break;
      }
      case 7:{
        if(this.labelText.length === 0) {
          this.divClass = 'col-md-12';
          this.labelClass = 'hidden';
          this.containerClass = 'col-md-7';
        } else {
          this.containerClass = 'col-md-7';
        }
        break;
      }
      case 12:{
        if(this.labelText.length === 0) {
          this.divClass = 'question-input-large no-label' ;
          this.labelClass = 'hidden';
          this.containerClass = 'col-md-12';
        } else {
          this.divClass = 'question-input-large' ;
          this.labelClass = 'question-label-large';
          this.containerClass = 'col-md-12';
        }
        break;
      }
    }
  }

  checkValidationStatus(control: AbstractControl, language:string, forceValidation:boolean = false):string {
    // reset hasError and message string
    let message = '';
    this.hasError = false;

    if((control.dirty || control.touched || forceValidation) && control.errors) {
      Object.keys(control.errors).map(messageKey => {
        if(this.validationMessages[this.language][messageKey]) {
          let tempMessage = this.validationMessages[this.language][messageKey]
          if(messageKey === 'minlength') {
            tempMessage = tempMessage.replace('X', this.definition.min_size.toString());
          } else if(messageKey==='maxlength') {
            tempMessage = tempMessage.replace('X', this.definition.max_size.toString());
          }
          message += tempMessage + ' ';
          this.hasError = true;
        }
      });
    }
    return message;
  }
  setParameters(definition:any):void {
    this.formControlName = definition.name;
    this.labelText = definition.text;
    this.placeholder = definition.placeholder;
    this.currentControl = this.form.get(this.formControlName);
    this.visible = definition.visible;
    this.id = definition.id;
    this.required = definition.required;
    if(definition.min_size && definition.min_size !== -987) {
      this.validatorsToBind.push(Validators.minLength(definition.min_size))
    }
    if(definition.max_size && definition.max_size !== -987) {
      this.validatorsToBind.push(Validators.maxLength(definition.max_size));
    }
    if(definition.required && definition.visible) {
      this.validatorsToBind.push(Validators.required);
    }
    if(this.validatorsToBind.length > 0) {
      this.currentControl.setValidators(this.validatorsToBind);
    }
    this.setCssClasses(definition.column_width);
    this.baseChangeDetector.detectChanges();
  }

  ruleActionHandler(ruleAction:any) {
    switch (ruleAction.action) {
      case 'show question':{
        if (!this.visible) {
          this.visible = true;
          if (this.required && this.visible) {
            this.definition.required = true;
            this.bindValidationArray(this.buildValidationArray(this.definition));
          }
        }
        break;
      }
      case 'hide question':{
        if (this.visible) {
          this.visible = false;
          if (this.required && !this.visible) {
            this.definition.required = false;
            this.bindValidationArray(this.buildValidationArray(this.definition));
          }
        }
        break;
      }
      case 'set question value':{
        if (this.currentControl.value !== ruleAction.value) {
          this.currentControl.setValue(ruleAction.value);
          this.value = ruleAction.value;
        }
        break;
      }
      case 'make question readonly':{
        if (this.readOnly === false) {
          this.readOnly = true;
          // ensure the local varialbe is the same as the form model
          this.value = this.currentControl.value;
        }
        break;
      }
      case 'make question editable':{
        if(this.readOnly === true) {
          this.readOnly = false;
        }
        break;
      }
      case 'make question required':{
        break;
      }
      case 'make question not required':{
        break;
      }
      case 'change dropdown code group id':{
        this.loadData(ruleAction.value);
        break;
      }
      case 'force question validation':{
        this.errorMessage = this.checkValidationStatus(this.currentControl, this.language, true);
        break;
      }
    }
  }

  buildValidationArray(definition:any):Array<ValidatorFn> {
    const validators: Array<ValidatorFn> = [];
    if(definition.min_size && definition.min_size !== -987) {
      validators.push(Validators.minLength(definition.min_size))
    }
    if(definition.max_size && definition.max_size !== -987) {
      validators.push(Validators.maxLength(definition.max_size));
    }
    if(definition.required && definition.visible) {
      validators.push(Validators.required);
    }
    return validators;
  }

  bindValidationArray(validators:Array<ValidatorFn>) {
    if(validators.length > 0) {
      this.currentControl.setValidators(validators);
    }
  }

  loadData(dataObject:any):void {
    // We do nothing here, but we implement only in the questions that need it.
    // if (this.loadDataFunc && typeof this.loadDataFunc === "function" ){
    //   this.loadDataFunc(dataObject);
    // }
  }
}
