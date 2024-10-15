import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { GameResponse } from '../shared/models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl= `${environment.Games_URL}`;
  private searchUrl = `${environment.MultiQuery_URL}`;

  constructor(private http: HttpClient) {}

  fetchGames(): Observable<GameResponse> {
    return this.http.get<GameResponse>(this.apiUrl);
  }

  searchGame(searchTerm: string): Observable<any> {
    return this.http.get(`${this.searchUrl}/search/${searchTerm}`);
  }

  fetchGameById(gameId: string): Observable<GameResponse> {
    return this.http.get<GameResponse>(`${this.apiUrl}/${gameId}`);
  }
}
