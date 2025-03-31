import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JeuComponent } from './components/jeux/jeux.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ListJeuxComponent } from './components/list-jeux/list-jeux.component';
import { ListReservationsComponent } from './components/list-reservations/list-reservations.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddReservationComponent } from './components/add-reservation/add-reservation.component';
import { EditReservationComponent } from './components/edit-reservation/edit-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    JeuComponent,
    HeaderComponent,
    HomeComponent,
    ListJeuxComponent,
    ListReservationsComponent,
    ReservationComponent,
    FooterComponent,
    AddReservationComponent,
    EditReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
