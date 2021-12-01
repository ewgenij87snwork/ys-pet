import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
    public showError = false;
    public postCreateForm: FormGroup = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(30)]],
        subtitle: ['', [Validators.required, Validators.maxLength(30)]],
        text: ['', [Validators.required]],
    });
    public errorMessage: any;

    constructor(private fb: FormBuilder) {}

    public getControl(controlName: string): FormControl {
        return this.postCreateForm.get(controlName) as FormControl;
    }

    public onSubmit() {
        this.showError = true;
        if (this.postCreateForm.valid) {
            const body = {
                title: this.postCreateForm.value.title,
                subtitle: this.postCreateForm.value.subtitle,
                text: this.postCreateForm.value.text,
            };

            console.log(body);
            this.showError = false;
        }
    }
}
