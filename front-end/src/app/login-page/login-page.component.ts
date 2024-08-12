import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private router: Router, private http: HttpClient) {}

  navigateToAdmin() {
    this.router.navigate(['/admin-cau']);  // This will navigate to the admin page
  }

  login() {
    // Get user ID and password from input fields
    const userId = (<HTMLInputElement>document.getElementById('yourUserId')).value;
    const password = (<HTMLInputElement>document.getElementById('yourInputId')).value;

    // Prepare the login data
    const loginData = {
      email: userId,
      password: password
    };

    // Make a POST request to your /login endpoint
    this.http.post('http://localhost:3001/auth/login', loginData).subscribe(
      (response: any) => {
        if (response.token) {
          // Save the session token locally (You may want to use a more secure storage method)
          localStorage.setItem('sessionToken', response.token);

          // Navigate to the user page
          this.router.navigate(['/user']);
        } else {
          console.error('Login failed. Invalid credentials.');
        }
      },
      (error) => {
        console.error('An error occurred while logging in:', error);
      }
    );
  }

  loginAdmin() {
    // Get user ID and password from input fields
    const userId = (<HTMLInputElement>document.getElementById('yourUserId')).value;
    const password = (<HTMLInputElement>document.getElementById('yourInputId')).value;

    if (userId.toLowerCase().includes('admin')) {
      // Prepare the login data for admin
      const loginData = {
        email: userId,
        password: password
      };

      // Make a POST request to your /admin-login endpoint
      this.http.post('http://localhost:3001/auth/login', loginData).subscribe(
        (response: any) => {
          if (response.token) {
            // Save the admin session token locally (You may want to use a more secure storage method)
            localStorage.setItem('adminSessionToken', response.token);

            // Navigate to the admin page
            this.router.navigate(['/admin-cau']);
          } else {
            console.error('Admin login failed. Invalid credentials.');
          }
        },
        (error) => {
          console.error('An error occurred while logging in as admin:', error);
        }
      );
    } else {
      // If the user ID doesn't contain "admin", use the normal login function
      this.login();
    }
  }
}
