import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import "rxjs/add/operator/debounceTime";
import 'rxjs/add/operator/do';

import { StringComponent } from './string/string.component'; 

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StringComponent
  ]
})
export class QuestionsModule { }
