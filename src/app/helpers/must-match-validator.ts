import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatch(password:string,confirmPassword:string):ValidatorFn{

    return(ctrl:AbstractControl):ValidationErrors | null=>{

        const passwordCtrl=ctrl.get(password)
        const confirmPasswordCtrl=ctrl.get(confirmPassword)
        if(confirmPasswordCtrl?.errors && confirmPasswordCtrl?.errors['passwordMatch']){
            return null;
        }

        if(passwordCtrl?.value !== confirmPasswordCtrl?.value){
            confirmPasswordCtrl?.setErrors({passwordMatch:true})

        }else{

            confirmPasswordCtrl?.setErrors(null)

        }
return null;

    }
}