import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AccountService } from '../_services/account.service';
import { LoadingSpinnerService } from '../_services/loading-spinner.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancleRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup = new FormGroup({});
  bsConfig: Partial<BsDatepickerConfig> | undefined;
  maxDate: Date = new Date();

  constructor(private accountService: AccountService,
      private loadingSpinnerService: LoadingSpinnerService,
      private fb: FormBuilder,
      private router: Router
    ) {
      this.bsConfig = {
        containerClass: 'theme-red',
        dateInputFormat: 'DD MMMM YYYY'
      }
    }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true};
    };
  }

  register() {
    const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
    const values = {...this.registerForm.value, dateOfBirth: dob};
    console.log(values);

    this.loadingSpinnerService.setIsLoading(true);
    this.accountService.register(values).subscribe({
      next: () => {
        this.loadingSpinnerService.setIsLoading(false);
        this.router.navigateByUrl('/members');
      },
      error: error => console.log(error)
    });
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset()))
      .toISOString().slice(0, 10);
  }

  cancel() {
    this.cancleRegister.emit(false);
  }



}
