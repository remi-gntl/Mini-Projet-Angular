import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}
