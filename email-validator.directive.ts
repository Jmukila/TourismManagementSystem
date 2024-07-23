import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{ 
    provide: NG_VALIDATORS, 
    useExisting: EmailValidatorDirective, 
    multi: true 
  }]
})
export class EmailValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // If the control is empty, don't perform validation
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  }
}
