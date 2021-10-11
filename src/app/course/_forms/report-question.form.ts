import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

export class ReportQuestionForm {
    /**
     * Creates a FormGroup for the problem set.
     */
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            search: new FormControl(''),
            reason: new FormControl(''),
        });
    }

    /**
     * Extracts the data from the FormGroup.
     * @param form - The FormGroup for the problem set.
     */
    static extractData(form: FormGroup): ReportFormData {
        return form.value;
    }
}

export interface ReportFormData {
    search: string,
    reason: string,
}
