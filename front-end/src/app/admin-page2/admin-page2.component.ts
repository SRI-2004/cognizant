import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-page2',
  templateUrl: './admin-page2.component.html',
  styleUrls: ['./admin-page2.component.css']
})
export class AdminPage2Component implements OnInit {
  activeUsers: any[] = [];
  sessionToken: string | null = localStorage.getItem('adminSessionToken'); // Retrieve the token from local storage

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    if (this.sessionToken) {
      // Create an HTTP headers object with the Authorization header set to the token
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.sessionToken}`);

      // Make a GET request to fetch active users from /users API with the token in the headers
      this.http.get('http://192.168.122.1:3001/admin/active', { headers }).subscribe((data: any) => {
        this.activeUsers = data;
      });
    }
  }

  navigateToHist() {
    this.router.navigate(['/admin-hist']);
  }

  navigateToLogin() {
    if (this.sessionToken) {
      // Create an HTTP headers object with the Authorization header set to the token
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.sessionToken}`);

      // Make a POST request to log the user out
      this.http.post('http://192.168.122.1:3001/auth/logout', null, { headers }).subscribe((response: any) => {
        if (response.message === 'Logout successful') {
          // Redirect to the login page after successful logout
          this.router.navigate(['/']);
        }
      });
    }
  }
}
