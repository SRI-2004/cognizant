import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  user: any = {};
  token: string | null = localStorage.getItem('sessionToken');
// Retrieve the token from local storage

  constructor(private router: Router, private http: HttpClient) {}
  sessionToken: string | null = localStorage.getItem('sessionToken');
  getSessionDuration(): string {
    if (this.user.loginTime && this.user.logoutTime) {
      const loginTime = new Date(this.user.loginTime).getTime();
      let logoutTime = new Date().getTime(); // Set logoutTime to the current system time
      if (this.user.logoutTime) {
          logoutTime = new Date(this.user.logoutTime).getTime();
      }
      const sessionDuration = logoutTime - loginTime;

      // Convert the session duration to hours, minutes, and seconds
      const hours = Math.floor(sessionDuration / 3600000);
      const minutes = Math.floor((sessionDuration % 3600000) / 60000);
      const seconds = Math.floor((sessionDuration % 60000) / 1000);

      // Format the duration as HH:MM:SS
      return `${hours}:${minutes}:${seconds}`;
    } else {
      return 'N/A'; // Display "N/A" if loginTime or logoutTime is missing
    }
  }
  ngOnInit() {
    // Create an HTTP headers object with the Authorization header set to the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    // Make a GET request to fetch user details from /users/me with the token in the headers
    this.http.get('http://localhost:3001/user', { headers }).subscribe((data: any) => {
      this.user.id = data.id;
      this.user.name = data.name;
      this.user.email = data.email;
      this.user.phoneNumber = data.phoneNumber;
      this.user.accountCreatedDate = new Date(data.accountCreatedDate).toLocaleString();
      this.user.ip = data.ip;
      this.user.mac = data.mac;
      this.user.age = data.age;
      this.user.loginTime = new Date(data.loginTime).toLocaleString();
      this.user.job = data.job;
      this.user.location = data.location;

    });
  }

  navigateToLogin() {
    if (this.sessionToken) {
      // Create an HTTP headers object with the Authorization header set to the token
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.sessionToken}`);

      // Make a POST request to log the user out
      this.http.post('http://localhost:3001/auth/logout', null, { headers }).subscribe((response: any) => {
        if (response.message === 'Logout successful') {
          // Redirect to the login page after successful logout
          this.router.navigate(['/']);
        }
      });
    }
  }
}
