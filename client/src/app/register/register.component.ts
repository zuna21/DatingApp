import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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

  constructor(private accountService: AccountService,
      private loadingSpinnerService: LoadingSpinnerService,
      private fb: FormBuilder
    ) {}

  ngOnInit(): void {
    this.initializeForm();
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
    console.log(this.registerForm.value);
    console.log(this.registerForm.valid);
    /* this.loadingSpinnerService.setIsLoading(true);
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
        this.loadingSpinnerService.setIsLoading(false);
      },
      error: error => console.log(error)
    }); */
  }

  cancel() {
    this.cancleRegister.emit(false);
  }



}
