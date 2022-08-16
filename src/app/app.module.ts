import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/pages/auth/login/login.component';
import { RegisterComponent } from './view/pages/auth/register/register.component';
import { HomeComponent } from './view/pages/home/home.component';
import { NotfoundComponent } from './view/pages/auth/notfound/notfound.component';
import { FooterComponent } from './view/layout/footer/footer.component';
import { NavbarComponent } from './view/layout/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotfoundComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
