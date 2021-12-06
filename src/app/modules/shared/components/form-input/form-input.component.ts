import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class FormInputComponent implements ControlValueAccessor, OnInit {
    @Input() value = '';
    @Input() label = '';
    @Input() placeholder = '';
    @Input() showError = false;
    @Input() inputFormControl: FormControl = new FormControl(this.value);
    @Input() errorMessage: any = null;

    @Output() inputChange = new EventEmitter();
    @Output() pressedEnter = new EventEmitter();

    private _formControl: FormControl = new FormControl(this.value);

    onChange: any = () => {};
    onTouched: any = () => {};

    constructor(protected changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit() {
        console.log(this.showError);
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
