import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { LoadingSpinnerService } from '../_services/loading-spinner.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  constructor(
    public accountService: AccountService, 
    private router: Router,
    private toastr: ToastrService,
    private loadingSpinnerService: LoadingSpinnerService,
    ) {}

  ngOnInit(): void {
  }

  login() {
    this.loadingSpinnerService.setIsLoading(true);
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members');
        this.loadingSpinnerService.setIsLoading(false);
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/home');
  }

}
