import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JeuxService } from '../../services/jeux.service';
import { ReservationsService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation.model';

@Component({
  selector: 'app-add-reservation',
  standalone: false,
  templateUrl: './add-reservation.component.html',
  styleUrl: './add-reservation.component.scss'
})

export class AddReservationComponent implements OnInit {
  formulaire!: FormGroup;
  currentReservation!: Reservation;
  jeux: any[] = [];
  
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private jeuxService: JeuxService, 
    private reservationService: ReservationsService
  ) { }
  
  ngOnInit(): void {
    this.loadJeux();
    
    this.formulaire = this.formBuilder.group({       
      nomClient: [null, Validators.required],       
      email: [null, Validators.email],       
      telephone: [null, Validators.required],       
      jeuId: [null, Validators.required],
      dateReservation: [this.getCurrentDate(), Validators.required],
      statut: ['En attente']   
    }, { updateOn: 'blur' }); 

    this.formulaire.valueChanges.subscribe((formValue) => {
      const selectedJeu = this.jeux.find(jeu => jeu.id === formValue.jeuId);
      
      this.currentReservation = {
        id: '0',
        nomClient: formValue.nomClient,
        email: formValue.email,
        telephone: formValue.telephone,
        titreDuJeu: selectedJeu ? selectedJeu.titre : '',
        plateforme: selectedJeu ? selectedJeu.plateforme : '',
        dateReservation: formValue.dateReservation,
        statut: formValue.statut
      };
    });
  }

  loadJeux(): void {
    this.jeuxService.getJeux().subscribe({
      next: (jeu) => {
        this.jeux = jeu.filter((jeu: any) => jeu.stockDisponible > 0);
      },
      error: (err) => {
        console.error('Observable getJeux a émis une erreur : ' + err);
        alert("Impossible de charger la liste des jeux disponibles");
      }
    });
  }

  addReservation(): void {
    const selectedJeu = this.jeux.find(jeu => jeu.id === this.formulaire.get('jeuId')?.value);
    
    if (!selectedJeu) {
      alert("Veuillez sélectionner un jeu valide");
      return;
    }

    let newReservation: Reservation = {
      id: '0',
      nomClient: this.formulaire.get('nomClient')?.value,
      email: this.formulaire.get('email')?.value,
      telephone: this.formulaire.get('telephone')?.value,
      titreDuJeu: selectedJeu.titre,
      plateforme: selectedJeu.plateforme,
      dateReservation: this.formulaire.get('dateReservation')?.value,
      statut: this.formulaire.get('statut')?.value
    };

    this.reservationService.addReservation(newReservation).subscribe({
      next: () => {
        // MAJ stock jeu
        selectedJeu.stockDisponible--;
        this.jeuxService.updateJeu(selectedJeu).subscribe({
          next: () => {
            this.router.navigateByUrl('/reservations');
          },
          error: (err) => {
            console.error('Observable updateJeu a émis une erreur : ' + err);
            alert("Réservation créée mais problème lors de la mise à jour du stock");
          }
        });
      },
      error: (err) => {
        console.error('Observable addReservation a émis une erreur : ' + err);
        alert("Désolé, la réservation n'a pas pu être créée");
      }
    });
  }

  //format date du jour (AAAA-MM-JJ)
  private getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}