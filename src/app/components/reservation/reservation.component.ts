import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../../models/reservation.model';
import { ReservationsService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation',
  standalone: false,
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit {
  reservation: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:3000/reservations/${id}`).subscribe({
      next: (data) => {
        this.reservation = data;
      },
      error: (err) => {
        console.error('Erreur:', err);
      }
    });
  }
}
