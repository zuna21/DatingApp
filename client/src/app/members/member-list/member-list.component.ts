import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { LoadingSpinnerService } from 'src/app/_services/loading-spinner.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members$: Observable<Member[]> | undefined;

  constructor(private memberService: MembersService,
      private loadingSpinnerService: LoadingSpinnerService
    ) {}

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
  }



}
