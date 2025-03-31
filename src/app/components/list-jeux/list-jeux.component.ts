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
  jeux: any[] = [];
  jeuxFiltres: any[] = [];  // Nouvelle propriété pour stocker les jeux filtrés
  searchText: string = '';  // Propriété pour stocker le texte de recherche

  constructor(private jeuxService: JeuxService) {}

  ngOnInit() {
    this.jeuxService.getJeux().subscribe((jeux) => {
      this.jeux = jeux;
      this.jeuxFiltres = jeux;  // Initialiser jeuxFiltres avec tous les jeux
    });
  }

  // Méthode pour filtrer les jeux en fonction du texte de recherche
  onSearchChange(): void {
    if (!this.searchText.trim()) {
      // Si la recherche est vide, afficher tous les jeux
      this.jeuxFiltres = this.jeux;
      return;
    }

    const searchValue = this.searchText.toLowerCase().trim();
    
    // Filtrer les jeux selon plusieurs critères
    this.jeuxFiltres = this.jeux.filter(jeu => 
      jeu.titre.toLowerCase().includes(searchValue) ||
      jeu.plateforme.toLowerCase().includes(searchValue) ||
      jeu.genre.toLowerCase().includes(searchValue) ||
      jeu.developpeur.toLowerCase().includes(searchValue)
    );
  }
}