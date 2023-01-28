import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { LoadingSpinnerService } from '../_services/loading-spinner.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() cancleRegister = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService,
      private loadingSpinnerService: LoadingSpinnerService
    ) {}

  register() {
    this.loadingSpinnerService.setIsLoading(true);
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
        this.loadingSpinnerService.setIsLoading(false);
      },
      error: error => console.log(error)
    });
  }

  cancel() {
    this.cancleRegister.emit(false);
  }



}
