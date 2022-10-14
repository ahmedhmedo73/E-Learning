import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/pages/auth/login/login.component';
import { RegisterComponent } from './view/pages/auth/register/register.component';
import { HomeComponent } from './view/pages/home/home.component';
import { NotfoundComponent } from './view/pages/auth/notfound/notfound.component';
import { FooterComponent } from './view/layout/footer/footer.component';
import { NavbarComponent } from './view/layout/navbar/navbar.component';
import { ClickStopPropagationDirective } from './core/directives/click-stop-propagation.directive';
import { StoreModule } from '@ngrx/store';
import { scoreReducer } from './core/store/reducers/score.reducer';
import { StarterComponent } from './view/pages/starter/starter.component';
import { AboutUsComponent } from './view/pages/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotfoundComponent,
    FooterComponent,
    NavbarComponent,
    ClickStopPropagationDirective,
    StarterComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      score: scoreReducer,
    }),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
