import { Component, Input, OnDestroy, OnInit, Output, signal, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from '../side-nav.service';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';


@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})

export class SidebarAdminComponent implements OnInit, OnDestroy {
  sidebarCollapsed = signal(false);
  @Input() set collapsed (value: boolean) {
    this.sidebarCollapsed.set(value);
  }

  @ViewChild('commandbarSidenav', {static: true})
  public sidenav!: MatSidenav

  constructor(private commandbarSidenav: SideNavService, private headerService: NavbarAdminComponent) {}

  ngOnInit(): void{
    console.log("sdfgfdffsddtfedfeyteet ")
    this.commandbarSidenav.setSidenav(this.sidenav)
    this.role ='admin'
  }

  ngOnDestroy(): void {
      
  }

  logout() {
    this.headerService.logout()
  }

  
  // @Output() sidebarClosed: boolean = this.collapsed
  // toggle() {
  //   throw new Error('Method not implemented.');
  // }
  
  isHidden1=true
  isHidden=true
  isHidden2=true
  isHidden3=true
  isHidden4=false
  isHidden5=true
  isHidden6=true
  isHidden9=true
  isHidden8=true 
  isHidden7=true
  isHidden13=true
  isHidden14=true
  isHidden15=true
  isHidden16=true
  ;
isHidden10: any;
isHidden11: any;
  tokenService: any;
  role: any;
  username: any;
  email: any;
  authorized: boolean | undefined;


  closeNav1(){
    this.isHidden1=!this.isHidden1

  }
  closeNav3(){
    this.isHidden6=!this.isHidden6

  }
  closeNav(){
    this.isHidden=!this.isHidden

  }
  closeNavS(){
    this.isHidden9=!this.isHidden9

  }
  closeNav2(){
    this.isHidden2=!this.isHidden2

  }
  closeExpenses(){
    this.isHidden4=!this.isHidden4
  }

  closeIncome(){
    this.isHidden3=!this.isHidden3
  }
  closeReports(){
    this.isHidden5=!this.isHidden5
  }
  closeSystemManagement(){
    this.isHidden10=!this.isHidden10
  }
  closeAccessmanagement(){
    this.isHidden11=!this.isHidden11
  }
  closeNavAcademicSettings(){
    this.isHidden8=!this.isHidden8
  }
  closeNavFinancialSettings(){
    this.isHidden7=!this.isHidden7
  }
  closeNavSystemSettings(){
    this.isHidden13=!this.isHidden13
  }
  closeNavCommunicationSettings(){
    this.isHidden14=!this.isHidden14
  }
  closeNavSchoolProfile(){
    this.isHidden15=!this.isHidden15
  }
  closeNavManageSchools(){
    this.isHidden16=!this.isHidden16
  }
  Authorize() {
    let currentUser = this.tokenService.getUser();
    this.role = currentUser.roles[0].name;
    this.username = currentUser.username
    this.email = currentUser.email

    if (this.role == "SUPERUSER") {
      this.authorized = true;
    }

    if (this.role == "TELLER") {
      this.authorized = false;
    }
    if (this.role == "USER") {
      this.authorized = false;
    }
  }
}