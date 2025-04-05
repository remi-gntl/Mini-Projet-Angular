import { Injectable } from '@angular/core';
import { Jeu } from '../models/jeu.model';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JeuxService {
  
  constructor(private http: HttpClient) {}

  getJeux(): Observable<Jeu[]> {
    return this.http.get<Jeu[]>('http://localhost:3000/jeux');
  }

  getJeuById(id: number): Observable<Jeu> {
    return this.http.get<Jeu>('http://localhost:3000/jeux/' + id);
  }

  addJeu(nouvJeu: Jeu): Observable<Jeu> {
    return this.getJeux().pipe(
      switchMap(jeux => {
        let maxId = 0;
        jeux.forEach(jeu => {
          const idNum = typeof jeu.id === 'string' ? parseInt(jeu.id) : jeu.id;
          maxId = (idNum > maxId ? idNum : maxId);
        });
        nouvJeu.id = (maxId + 1).toString();
        return this.http.post<Jeu>('http://localhost:3000/jeux', nouvJeu);
      })
    );
  }
}