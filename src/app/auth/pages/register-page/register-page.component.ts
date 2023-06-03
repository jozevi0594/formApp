import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidators from 'src/app/shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  constructor(private fb:FormBuilder,
      private validatorsService:ValidatorsService,
      private emailValidatorService:EmailValidatorService
    ){}

  public myForm:FormGroup=this.fb.group({
    name:['',[Validators.required,Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    email:['',[Validators.required,Validators.pattern(this.validatorsService.emailPattern)],[this.emailValidatorService]],
    username:['',[Validators.required,this.validatorsService.canBeStrider]],
    password:['',[Validators.required,Validators.minLength(6)]],
    password2:['',[Validators.required]]
  },{
    validators:[
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

  isValidField(field:string){
    return this.validatorsService.isValidField(this.myForm,field);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }
}
