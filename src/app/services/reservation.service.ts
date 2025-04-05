import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>('http://localhost:3000/reservations');
  }

  getReservationById(id: string): Observable<Reservation> {
    return this.http.get<Reservation>('http://localhost:3000/reservations/' + id);
  }

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

  // Mettre à jour une réservation existante
  updateReservation(id: string, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>('http://localhost:3000/reservations/' + id, reservation);
  }
  
  // Supprimer une réservation
  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>('http://localhost:3000/reservations/' + id);
  }
}