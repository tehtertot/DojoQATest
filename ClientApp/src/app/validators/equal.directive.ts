import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true }
    ]
})
export class EqualValidator implements Validator {
    constructor( @Attribute('validateEqual') public validateEqual: string, @Attribute('reverse') public reverse: string) {}

    private get isReverse() {
        return this.reverse === 'true' ? true : false;
    }

    validate(c: AbstractControl): { [key: string]: any } | null {
        // value of the one being updated
        let v = c.value;

        // value to compare
        let e = c.root.get(this.validateEqual);

        // if there's something to compare to but they're not equal
        if (e && v !== e.value && !this.isReverse) {
            //return on comparePW value
            if (!this.isReverse) {
                return {
                    validateEqual: false
                };
            }
            //or set comparePW value to false
            else {
                e.setErrors( {validateEqual: false} );
            }
        }
            

        // when they are equal, remove the error, if any
        if (e && v === e.value) {
            if (e.errors) {
                delete e.errors['validateEqual'];
                if (!Object.keys(e.errors).length) {
                    e.setErrors(null);
                }
            }
        }
        
        return null;
    }
}