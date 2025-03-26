import { Injectable } from '@angular/core';
import { Jeu } from '../models/jeu.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JeuxService {
  
  constructor(private http: HttpClient) {}

  // Récupérer tous les jeux
  getJeux(): Observable<Jeu[]> {
    return this.http.get<Jeu[]>('http://localhost:3000/jeux');
  }

  // Récupérer un jeu par son ID
  getJeuById(id: number): Observable<Jeu> {
    return this.http.get<Jeu>('http://localhost:3000/jeux/' + id);
  }
}
