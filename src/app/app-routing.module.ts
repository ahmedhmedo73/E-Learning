import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AboutUsComponent } from './view/pages/about-us/about-us.component';
import { LoginComponent } from './view/pages/auth/login/login.component';
import { NotfoundComponent } from './view/pages/auth/notfound/notfound.component';
import { RegisterComponent } from './view/pages/auth/register/register.component';
import { HomeComponent } from './view/pages/home/home.component';
import { PersonalInformationComponent } from './view/pages/profile/personal-information/personal-information.component';
import { PlaylistsComponent } from './view/pages/profile/playlists/playlists.component';
import { StarterComponent } from './view/pages/starter/starter.component';

const routes: Routes = [
  { path: '', component: StarterComponent, pathMatch: 'full' },
  { path: 'AboutUs', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'profile',
    loadChildren: () =>
      import('./view/pages/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./view/pages/admin/admin.module').then(
        (m) => m.AdminModule
      ),
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
