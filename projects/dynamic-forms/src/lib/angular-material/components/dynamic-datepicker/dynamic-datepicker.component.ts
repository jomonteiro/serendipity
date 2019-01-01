import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormControlCustomEvent, DynamicFormControlModel } from '../../models/dynamic-form-control.model';

import { LoggerService } from 'utils';

@Component({
  selector: 'dynamic-datepicker',
  template: `
    <mat-form-field [appearance]="model.appearance"
                    [className]="model.gridItemClass"
                    [formGroup]="formGroup">

      <ng-container *ngIf="model.label" ngProjectAs="mat-label">
        <mat-label> {{ model.label }} </mat-label>
      </ng-container>

      <input #input matInput
             [formControlName]="model.id"
             [matDatepicker]="picker"
             [placeholder]="model.placeholder"
             [required]="model.required" />

      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>

      <mat-datepicker #picker></mat-datepicker>

      <ng-container *ngFor="let validator of model.validators;" ngProjectAs="mat-error">
        <mat-error *ngIf="formGroup.controls[model.id].hasError(validator.propertyName)"> {{ validator.message }} </mat-error>
      </ng-container>

    </mat-form-field>
  `,
  styles: []
})
export class DynamicDatepickerComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() model: DynamicFormControlModel;

  @HostBinding('class') elementClass;

  constructor(private logger: LoggerService) {

  }

  public ngOnInit() {

    // this.logger.info('DynamicDatepickerComponent: ngOnInit()');
    this.elementClass = this.model.gridItemClass;
  }

}

// https://github.com/udos86/ng-dynamic-forms/blob/master/packages/ui-material/src/datepicker/dynamic-material-datepicker.component.ts

// https://stackoverflow.com/questions/45874705/angular-material-2-date-picker-auto-open-on-focus

/*

<mat-datepicker #picker (closed)="input.blur()"></mat-datepicker>

*/
