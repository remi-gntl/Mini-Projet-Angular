import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JeuxService } from '../../services/jeux.service';
import { Jeu } from '../../models/jeu.model';

@Component({
  selector: 'app-add-jeu',
  standalone: false,
  templateUrl: './add-jeu.component.html',
  styleUrl: './add-jeu.component.scss'
})

export class AddJeuComponent implements OnInit {
  formulaire!: FormGroup;
  currentJeu!: Jeu;
  
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private jeuxService: JeuxService
  ) { }
  
  ngOnInit(): void {
    this.formulaire = this.formBuilder.group({       
      titre: [null, Validators.required],       
      plateforme: [null, Validators.required],       
      genre: [null, Validators.required],     
      dateSortie: [null, Validators.required],  
      developpeur: [null, Validators.required],
      stockDisponible: [1, [Validators.required, Validators.min(1)]]
    }, { updateOn: 'blur' }); 

    this.formulaire.valueChanges.subscribe((formValue) => {
      this.currentJeu = {
        id: "0",
        titre: formValue.titre,
        plateforme: formValue.plateforme,
        genre: formValue.genre,
        dateSortie: formValue.dateSortie,
        developpeur: formValue.developpeur,
        stockDisponible: formValue.stockDisponible
      };
    });
  }

  addJeu(): void {
    let newJeu: Jeu = {
      id: "0",
      titre: this.formulaire.get('titre')?.value,
      plateforme: this.formulaire.get('plateforme')?.value,
      genre: this.formulaire.get('genre')?.value,
      dateSortie: this.formulaire.get('dateSortie')?.value,
      developpeur: this.formulaire.get('developpeur')?.value,
      stockDisponible: this.formulaire.get('stockDisponible')?.value
    };

    this.jeuxService.addJeu(newJeu).subscribe({
      next: (jeu) => {
        this.router.navigate(['/jeux']);
      },
      error: (err) => {
        console.error('Observable addJeu a émis une erreur : ' + err);
        alert("Désolé, le jeu n'a pas pu être ajouté");
      }
    });
  }
}