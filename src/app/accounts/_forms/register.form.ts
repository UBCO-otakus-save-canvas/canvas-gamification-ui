import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {confirmPasswordValidator} from "@app/_helpers/confirm-password.validator";

export class RegisterForm {
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required]),
            password2: new FormControl(null, [Validators.required]),
            recaptcha_key: new FormControl(null, [Validators.required])
        }, {
            validators: confirmPasswordValidator,
        });
    }

    static extractData(form: FormGroup): RegisterFormData {
        console.log(form.value);
        return form.value;
    }
}

export interface RegisterFormData {
    email: string;
    password: string;
    password2: string;
    recaptcha_key: string;
}
