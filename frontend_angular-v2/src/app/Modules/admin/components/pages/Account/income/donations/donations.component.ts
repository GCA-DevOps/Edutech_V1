import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent {
  dataSource = Array.from({ length: 100 }).map((_, i) => `Item #${i + 1}`);
  pageSizeOptions = [5, 10, 20];
  pageSize = 5;
  pageIndex = 0;

  onPageChange(event: PageEvent) {
    console.log('Page event:', event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

 
}
 


}
