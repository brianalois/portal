import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy  } from '@angular/core';
import { Company } from "./../../../models/company.model";
import { User } from "./../../../models/user.model";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // this means it is not active checking for data changes
})
export class CompanyListComponent implements OnInit {
  companies:Array<Company> = [];
  user:User;

  companySub:Function = ()=>{return};
  constructor(private cd: ChangeDetectorRef) { }

  async ngOnInit() {
    this.companySub();
    this.user = User.Auth();

    this.companies = this.user.Companies(true);

    this.companySub = Company.on(['change'], ()=>{
      this.companies = this.user.Companies();
      this.cd.markForCheck(); // this makes the view check for updates once
    })

  }

  ngOnDestroy() {
    this.companySub();//cancels subscription
  }
}
