import { Component, computed, EventEmitter, HostListener, OnInit, Output, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent {
  @Output() toggleSidenav = new EventEmitter<void>()
  // sidebarOpen = true; // Sidebar starts open by default
  // isSmallScreen = false; // Detect small screens
  collapsed = signal(false);
  sidebarWidth = computed(() => this.collapsed() ? '55px' : '225px')
  open: boolean = false

  setCollapsed() {
    this.collapsed.set(!this.collapsed());
  }

  // ngOnInit() {
  //   this.open = this.collapsed()
  //   // this.onResize(); // Check screen size on component initialization
  // }

  // @HostListener('window:resize', ['$event'])
  // onResize() {
  //   this.isSmallScreen = window.innerWidth < 1024; // Set breakpoint for responsiveness
  //   if (this.isSmallScreen) {
  //     // this.sidebarOpen = false; // Auto-close sidebar on small screens
  //   }
  // }

  // toggleSidebar() {
  //   // this.sidebarOpen = !this.sidebarOpen; // Toggle the sidebar state
  // }

  // onSidebarClosed() {
  //   // this.sidebarOpen = false; // Update sidebar state when explicitly closed
  // }
}