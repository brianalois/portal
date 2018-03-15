import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TdRotateAnimation } from '@covalent/core/common';
import { Util } from '../../../helpers/util.helper';
import { User } from '../../../models/user.model';
import { Company } from '../../../models/company.model';

export interface NavLinks {
  route?: string;
  name: string;
  icon?: string;
  action?: string;
  permission?: object;
  sub_links?: Array<NavLinks>; // In case of nested dropdowns
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush, // this means it is not active checking for data changes
  animations: [
    TdRotateAnimation(),
  ]
})

export class NavbarComponent implements OnInit {
  user: User;
  permissions:any;

  env;
  triggerState = false;

  //permission :{name:'Company', method:'remove'}
  nav_links_user_side: Array<NavLinks> = [
    {route: '/', name: 'Dashboard'},
    {route: 'inventory', name: 'Inventory'},
    {route: 'transactions', name: 'Transactions'},
    {route: '/', name: 'Catalogs', sub_links: [
      {route: '/', name: 'View Catalogs'},
      {route: 'catalog/create', name: 'Create Catalog'}
    ]},
    {route: '/', name: 'Products', sub_links: [
      {route: '/', name: 'View Products'},
      {route: '/', name: 'Create Products'}
    ]},
    {route: '/', name: 'Kiosks', sub_links: [
      {route: '/', name: 'View Kiosks'},
      {route: '/', name: 'Create Kiosks'},
      {route: '/', name: 'Customize Kiosks'}
    ]},
    {route: '/', name: 'Kiosk Groups', sub_links: [
      {route: '/', name: 'View Kiosk Groups'},
      {route: '/', name: 'Create Kiosk Groups'}
    ]},
    {route: '/', name: 'Employees', sub_links: [
      {route: '/', name: 'Manage Employees'},
      {route: '/', name: 'Add Employees'}
    ]},
    {route: 'company/list', permission:{name:'Company'}, name: 'Company', sub_links: [
      {route: 'company/list', name: 'View Companies', permission:{name:'Company', method:'read'}},
      {route: 'company/create', name: 'Create Company', permission:{name:'Company', method:'create'}},
    ]},
  ];
  nav_links_user_top: Array<NavLinks> = [
    {route: 'user/update', name: 'Profile', icon: 'account_circle'},
    {route: '/', name: 'Settings', icon: 'settings'},
    {route: '/', name: 'Logout', icon: 'exit_to_app', action: 'onLogout'}
  ];
  nav_links_no_user: Array<NavLinks> = [
    {route: 'home', name: 'Home'},
    {route: 'login', name: 'Login/Register'}
  ];

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.user = User.Auth();

    this.env = Util.env;

    // I am intentionally over complicating this here to show how useful this can become in a large app
    User.on(['auth', 'saveApi'], (auth_state) => {// data will be different depending on which event was emitted
      console.log('the user has:', auth_state);
      this.user = User.Auth();
      // we can dynamically make the view check on certain events. For large apps this is very efficient
      this.cd.markForCheck(); // this makes the view check for updates once
    });
  }


  show(nav_permission){
    if(this.user){
      let permission = this.user.permissions.filter((permission)=>{
        return permission.name===nav_permission.name
      })[0];

      if(!permission) return false;

      if(nav_permission.method) return permission[nav_permission.method];

      return true;
    }
  }

  action(action_name){
    this[action_name]();
  }

  onLogout() {
    if (User.Auth()) { this.user.logout(); }
  }

}
