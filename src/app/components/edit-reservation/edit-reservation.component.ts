import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JeuxService } from '../../services/jeux.service';
import { ReservationsService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation.model';

@Component({
  selector: 'app-edit-reservation',
  standalone: false,
  templateUrl: './edit-reservation.component.html',
  styleUrl: './edit-reservation.component.scss'
})

export class EditReservationComponent implements OnInit {
  formulaire!: FormGroup;
  currentReservation!: Reservation;
  jeux: any[] = [];
  reservationId!: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private jeuxService: JeuxService,
    private reservationService: ReservationsService
  ) {}

  ngOnInit(): void {
    this.reservationId = this.route.snapshot.paramMap.get('id') || '0';
    this.loadJeux();
    
    // Initialisation du formulaire vide
    this.formulaire = this.formBuilder.group({
      nomClient: [null, Validators.required],
      email: [null, Validators.email],
      telephone: [null, Validators.required],
      jeuId: [null, Validators.required],
      dateReservation: [this.getCurrentDate(), Validators.required],
      statut: ['En attente']
    }, { updateOn: 'blur' });
    
    // Chargement des données de la réservation existante
    this.loadReservation();
  }

  loadJeux(): void {
    this.jeuxService.getJeux().subscribe({
      next: (jeux) => {
        this.jeux = jeux;
      },
      error: (err) => {
        console.error('Observable getJeux a émis une erreur : ' + err);
        alert("Impossible de charger la liste des jeux disponibles");
      }
    });
  }

  loadReservation(): void {
    this.reservationService.getReservationById(this.reservationId).subscribe({
      next: (reservation) => {
        this.currentReservation = reservation;
        
        // Recherche du jeu correspondant
        const jeu = this.jeux.find(j => j.titre === reservation.titreDuJeu);
        const jeuId = jeu ? jeu.id : null;
        
        // Mise à jour du formulaire avec les données existantes
        this.formulaire.patchValue({
          nomClient: reservation.nomClient,
          email: reservation.email,
          telephone: reservation.telephone,
          jeuId: jeuId,
          dateReservation: reservation.dateReservation,
          statut: reservation.statut
        });
      },
      error: (err) => {
        console.error('Observable getReservationById a émis une erreur : ' + err);
        alert("Impossible de charger les détails de la réservation");
      }
    });
  }

  updateReservation(): void {
    const selectedJeu = this.jeux.find(jeu => jeu.id === this.formulaire.get('jeuId')?.value);
    
    if (!selectedJeu) {
      alert("Veuillez sélectionner un jeu valide");
      return;
    }

    let updatedReservation: Reservation = {
      id: this.reservationId,
      nomClient: this.formulaire.get('nomClient')?.value,
      email: this.formulaire.get('email')?.value,
      telephone: this.formulaire.get('telephone')?.value,
      titreDuJeu: selectedJeu.titre,
      plateforme: selectedJeu.plateforme,
      dateReservation: this.formulaire.get('dateReservation')?.value,
      statut: this.formulaire.get('statut')?.value
    };

    this.reservationService.updateReservation(this.reservationId, updatedReservation).subscribe({
      next: () => {
        this.router.navigateByUrl('/reservations');
      },
      error: (err) => {
        console.error('Observable updateReservation a émis une erreur : ' + err);
        alert("Désolé, la réservation n'a pas pu être mise à jour");
      }
    });
  }

  // format date du jour (YYYY-MM-DD)
  private getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}