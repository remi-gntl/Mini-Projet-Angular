import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient) {}

  // Récupérer toutes les réservations
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>('http://localhost:3000/reservations');
  }

  // Récupérer une réservation par son ID
  getReservationById(id: string): Observable<Reservation> {
    return this.http.get<Reservation>('http://localhost:3000/reservations/' + id);
  }

  // Ajouter une nouvelle réservation
  addReservation(nouvReservation: Reservation): Observable<Reservation> {
    return this.getReservations().pipe(
      switchMap(reservations => {
        let maxId = 0;
        reservations.forEach(reservation => { 
          const idNum = parseInt(reservation.id);
          maxId = (idNum > maxId ? idNum : maxId); 
        });
        nouvReservation.id = (maxId + 1).toString();
        return this.http.post<Reservation>('http://localhost:3000/reservations', nouvReservation);
      })
    );
  }
}