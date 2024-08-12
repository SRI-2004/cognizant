import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Define an interface for the login history entry
interface LoginHistoryEntry {
  loginTime: string;
  logoutTime: string;
  Client: {
    id: string;
    ip: string;
    mac: string;
    age: number;
  };
}

@Component({
  selector: 'app-admin-page1',
  templateUrl: './admin-page1.component.html',
  styleUrls: ['./admin-page1.component.css']
})
export class AdminPage1Component implements OnInit {
  loginHistory: LoginHistoryEntry[] = [];
  sessionToken: string | null = localStorage.getItem('adminSessionToken'); // Retrieve the token from local storage

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchLoginHistory();
  }

  fetchLoginHistory() {
    if (this.sessionToken) {
      // Create an HTTP headers object with the Authorization header set to the token
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.sessionToken}`);

      // Make a GET request to fetch login history from /admin/hist with the token in the headers
      this.http.get<LoginHistoryEntry[]>('http://192.168.122.1:3001/admin/history', { headers })
        .subscribe((data: LoginHistoryEntry[]) => {
          this.loginHistory = data.filter(entry => entry.Client !== null);
        });
    }
  }

  navigateToCAU() {
    this.router.navigate(['/admin-cau']);
  }

  navigateToLogin() {
    if (this.sessionToken) {
      // Create an HTTP headers object with the Authorization header set to the token
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.sessionToken}`);

      // Make a POST request to log the user out
      this.http.post('http://192.168.122.1:3001/auth/logout', null, { headers })
        .subscribe((response: any) => {
          if (response.message === 'Logout successful') {
            // Redirect to the login page after successful logout
            this.router.navigate(['/']);
          }
        });
    }
  }
}
