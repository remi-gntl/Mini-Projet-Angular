import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JeuComponent } from './components/jeux/jeux.component';
import { HomeComponent } from './components/home/home.component';
import { ListJeuxComponent } from './components/list-jeux/list-jeux.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ListReservationsComponent } from './components/list-reservations/list-reservations.component';
import { AddReservationComponent } from './components/add-reservation/add-reservation.component';
import { EditReservationComponent } from './components/edit-reservation/edit-reservation.component';

const routes: Routes = [
  { path: 'jeux/:id', component: JeuComponent},
  { path: 'jeux', component: ListJeuxComponent},
  { path: '', component: HomeComponent},
  { path: 'reservations/:id', component: ReservationComponent },
  { path: 'reservations', component: ListReservationsComponent},
  { path: 'create-reservations', component: AddReservationComponent},
  { path: 'reservations/edit/:id', component: EditReservationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
