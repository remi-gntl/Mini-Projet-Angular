import { Component, OnInit } from '@angular/core';
import { JeuxService } from '../../services/jeux.service';
import { Jeu } from '../../models/jeu.model';

@Component({
  selector: 'app-list-jeux',
  standalone: false,
  templateUrl: './list-jeux.component.html',
  styleUrl: './list-jeux.component.scss'
})
export class ListJeuxComponent implements OnInit {
  jeux: Jeu[] = [];
  jeuxFiltres: Jeu[] = [];
  searchText: string = '';

  genresList: string[] = ['Tous'];
  plateformesList: string[] = ['Toutes'];
  
  selectedGenre: string = 'Tous';
  selectedPlateforme: string = 'Toutes';

  constructor(private jeuxService: JeuxService) {}

  ngOnInit(): void {
    this.jeuxService.getJeux().subscribe({
      next: (jeux) => {
        this.jeux = jeux;
        
        this.extraireOptionsDesFiltres();
        
        this.filtrerJeux();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des jeux:', err);
      }
    });
  }

  //extraire options unique pour les filtres
  extraireOptionsDesFiltres(): void {
    const genres = Array.from(new Set(this.jeux.map(jeu => jeu.genre)));
    this.genresList = ['Tous', ...genres];
    
    const plateformes = Array.from(new Set(this.jeux.map(jeu => jeu.plateforme)));
    this.plateformesList = ['Toutes', ...plateformes];
  }

    // appliquer tout les filtres
  filtrerJeux(): void {
    let resultats = this.jeux;
    
    if (this.searchText.trim()) {
      const searchValue = this.searchText.toLowerCase().trim();
      resultats = resultats.filter(jeu => 
        jeu.titre.toLowerCase().includes(searchValue) ||
        jeu.plateforme.toLowerCase().includes(searchValue) ||
        jeu.genre.toLowerCase().includes(searchValue) ||
        jeu.developpeur.toLowerCase().includes(searchValue)
      );
    }
      if (this.selectedGenre !== 'Tous') {
      resultats = resultats.filter(jeu => jeu.genre === this.selectedGenre);
    }
    
    if (this.selectedPlateforme !== 'Toutes') {
      resultats = resultats.filter(jeu => jeu.plateforme === this.selectedPlateforme);
    }
    this.jeuxFiltres = resultats;
  }

  onSearchChange(): void {
    this.filtrerJeux();
  }
  
  onGenreChange(genre: string): void {
    this.selectedGenre = genre;
    this.filtrerJeux();
  }
  
  onPlateformeChange(plateforme: string): void {
    this.selectedPlateforme = plateforme;
    this.filtrerJeux();
  }

}