import { Component, HostListener, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swal from 'sweetalert2';
import { EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/@Core/Authservice/token-storage.service';

const document: any = window.document;

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css'],
})
export class NavbarAdminComponent {
  // constructor(private storageService: TokenStorageService){}

  @Output() toggleSidebarEvent = new EventEmitter<void>();
  isFullScreen: boolean = false;
  drawer: any;
  userName: any;

  constructor(
    private router: Router,
    private storageService: TokenStorageService
  ) {}

  toggleSidebar(): void {
    this.toggleSidebarEvent.emit();
  }

  user = this.storageService.getUser();

  changePassword(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to change password?',
      showCancelButton: true,
      confirmButtonText: 'Yes, change',
      cancelButtonText: 'Cancel',
    }).then((result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        console.log('got hereeeeeeeeee');
        this.router.navigate(['/auth/passwordreset']);
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Error attempting to logOut',
            text: 'An error occurred while attempting to logOut.',
          });
        };
      }
    });
  }

  logout(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to Exit?',
      showCancelButton: true,
      confirmButtonText: 'Yes, exit!',
      cancelButtonText: 'Cancel',
    }).then((result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        console.log('got hereeeeeeeeee');
        this.router.navigate(['/auth/login']);
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Error attempting to logOut',
            text: 'An error occurred while attempting to logOut.',
          });
        };
      }
    });
  }

  callFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }

      this.isFullScreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    this.isFullScreen = false;
  }
}
