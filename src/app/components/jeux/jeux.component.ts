import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jeu } from '../../models/jeu.model';
import { JeuxService } from '../../services/jeux.service';

@Component({
  selector: 'app-jeu',
  standalone: false,
  templateUrl: './jeux.component.html',
  styleUrls: ['./jeux.component.scss']
})
export class JeuComponent implements OnInit {

  @Input() jeu!: Jeu;
  theJeu!: Jeu;
  idJeu!: string;

  constructor(private jeuxService: JeuxService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idJeu = this.route.snapshot.params['id'];
    
    if (this.idJeu !== undefined) {
      this.jeuxService.getJeuById(+this.idJeu).subscribe(jeu => { this.theJeu = jeu; });
    } else {
      this.theJeu = this.jeu;
    }
  }

  onAddStock(): void {
    this.theJeu.stockDisponible++;
  }
}
