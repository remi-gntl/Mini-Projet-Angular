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
  reservationsFiltrees: Reservation[] = [];
  searchText: string = '';

  statutsList: string[] = ['Tous', 'Confirmée', 'En attente', 'Annulée'];
  selectedStatut: string = 'Tous'; // valeur default

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.reservationsService.getReservations().subscribe({
      next: (reservations) => {
        this.reservations = reservations;
        this.filtrerReservations(); 
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des réservations:', err);
      }
    });
  }

  filtrerReservations(): void {
    let resultats = this.reservations;
    
    if (this.searchText.trim()) {
      const searchValue = this.searchText.toLowerCase().trim();
      resultats = resultats.filter(reservation => 
        reservation.nomClient.toLowerCase().includes(searchValue) ||
        reservation.titreDuJeu.toLowerCase().includes(searchValue) ||
        reservation.statut.toLowerCase().includes(searchValue) ||
        reservation.plateforme?.toLowerCase().includes(searchValue) ||
        reservation.email?.toLowerCase().includes(searchValue)
      );
    }
      if (this.selectedStatut !== 'Tous') {
      resultats = resultats.filter(reservation => 
        reservation.statut === this.selectedStatut
      );
    }
    
    this.reservationsFiltrees = resultats;
  }

  onSearchChange(): void {
    this.filtrerReservations();
  }
  
  onStatutChange(statut: string): void {
    this.selectedStatut = statut;
    this.filtrerReservations();
  }

  deleteReservation(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      this.reservationsService.deleteReservation(id).subscribe({
        next: () => {
          this.reservationsService.getReservations().subscribe({
            next: (reservations) => {
              this.reservations = reservations;
              this.filtrerReservations();
            },
            error: (err) => {
              console.error('Erreur lors de la récupération des réservations:', err);
            }
          });
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la réservation:', err);
          alert("Impossible de supprimer la réservation");
        }
      });
    }
  }
}