import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './user-page/user-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminPage1Component } from './admin-page1/admin-page1.component';
import { AdminPage2Component } from './admin-page2/admin-page2.component';
const routes: Routes = [
  { path: 'user', component: UserPageComponent },
  { path: '', component: LoginPageComponent },
  {path : 'admin-cau', component:AdminPage2Component},
  {path : 'admin-hist', component:AdminPage1Component},
  // Other routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
