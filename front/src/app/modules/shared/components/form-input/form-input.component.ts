import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() value = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() inputFormControl: FormControl = new FormControl(this.value);
  @Input() type: 'textarea' | 'input' = 'input';

  @Output() inputChange = new EventEmitter();
  @Output() pressedEnter = new EventEmitter();

  public matcher = new MyErrorStateMatcher();
  public errors = {};

  private _formControl: FormControl = new FormControl(this.value);
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(protected changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges() {
    this.errors = JSON.parse(JSON.stringify(this.inputFormControl.errors));
  }

  writeValue(value: string): void {
    this.changeDetectorRef.detectChanges();
    this._formControl.setValue(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  public changeValue(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();
    this.inputChange.emit(this.value);
  }
}
