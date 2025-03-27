import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation.model';

@Component({
  selector: 'app-list-reservations',
  standalone: false,
  templateUrl: './list-reservations.component.html',
  styleUrl: './list-reservations.component.scss'
})
export class ListReservationsComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.reservationsService.getReservations().subscribe({
      next: (reservations) => {
        this.reservations = reservations;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des réservations:', err);
      }
    });
  }
}
