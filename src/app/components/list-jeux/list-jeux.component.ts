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

  // Listes des options de filtrage
  genresList: string[] = ['Tous'];
  plateformesList: string[] = ['Toutes'];
  
  // Valeurs sélectionnées
  selectedGenre: string = 'Tous';
  selectedPlateforme: string = 'Toutes';

  constructor(private jeuxService: JeuxService) {}

  ngOnInit(): void {
    this.jeuxService.getJeux().subscribe({
      next: (jeux) => {
        this.jeux = jeux;
        
        // Extraire les genres et plateformes uniques pour les filtres
        this.extraireOptionsDesFiltres();
        
        // Appliquer les filtres initiaux
        this.filtrerJeux();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des jeux:', err);
      }
    });
  }

  // Extraire les options uniques pour les filtres
  extraireOptionsDesFiltres(): void {
    // Extraire les genres uniques
    const genres = Array.from(new Set(this.jeux.map(jeu => jeu.genre)));
    this.genresList = ['Tous', ...genres];
    
    // Extraire les plateformes uniques
    const plateformes = Array.from(new Set(this.jeux.map(jeu => jeu.plateforme)));
    this.plateformesList = ['Toutes', ...plateformes];
  }

  // Méthode pour appliquer tous les filtres
  filtrerJeux(): void {
    // D'abord, on applique le filtre de recherche textuelle
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
    
    // Ensuite, on applique le filtre de genre
    if (this.selectedGenre !== 'Tous') {
      resultats = resultats.filter(jeu => jeu.genre === this.selectedGenre);
    }
    
    // Puis, on applique le filtre de plateforme
    if (this.selectedPlateforme !== 'Toutes') {
      resultats = resultats.filter(jeu => jeu.plateforme === this.selectedPlateforme);
    }
    
    // On met à jour les jeux filtrés
    this.jeuxFiltres = resultats;
  }

  // Méthode appelée lors de la modification du texte de recherche
  onSearchChange(): void {
    this.filtrerJeux();
  }
  
  // Méthode appelée lors du changement de genre
  onGenreChange(genre: string): void {
    this.selectedGenre = genre;
    this.filtrerJeux();
  }
  
  // Méthode appelée lors du changement de plateforme
  onPlateformeChange(plateforme: string): void {
    this.selectedPlateforme = plateforme;
    this.filtrerJeux();
  }

}