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

  constructor(private jeuxService: JeuxService) {}

  ngOnInit() {
    this.jeuxService.getJeux().subscribe((jeux) => {
      this.jeux = jeux;
    });
  }
}
