import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TransactionViewComponent } from './transaction-component/transaction-view/transaction-view.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UpdateProfileComponent } from './user/profile/update-profile/update-profile.component';
import { ViewProfileComponent } from './user/profile/view-profile/view-profile.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  { path: 'accounts/:id/transactions', component: TransactionViewComponent },

  { path: 'register', component: RegisterComponent },

  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: '', component: ViewProfileComponent },
      { path: 'update', component: UpdateProfileComponent },
    ],
  },

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
