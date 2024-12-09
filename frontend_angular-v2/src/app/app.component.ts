import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/@Core/Authservice/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  constructor(private storageService: TokenStorageService, private route: Router){}
  title = 'EDUTECH';

  ngOnInit(): void {
      const token = this.storageService.getToken();
      const user = this.storageService.getUser();
        // console.log(user)

      //if user was already logged in, navigate to dashboard else login
      // if (token && user) {
      //   this.route.navigate(['/adminSection/dashboardAdmin'])
      // } else {
      //   this.route.navigate(['/auth/login'])
      // }
  }

}
                    