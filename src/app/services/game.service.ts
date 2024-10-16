import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse  } from '@angular/common/http';
import { Observable,  throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { GameResponse } from '../shared/models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private TIMEOUT_DURATION = 30000;
  private apiUrl= `${environment.Games_URL}`;
  private searchUrl = `${environment.MultiQuery_URL}`;

  constructor(private http: HttpClient) {}

  fetchGames(): Observable<GameResponse> {
    return this.http.get<GameResponse>(this.apiUrl);
    timeout(this.TIMEOUT_DURATION),
    catchError(this.handleError)
  }

  searchGame(searchTerm: string): Observable<any> {
    return this.http.get(`${this.searchUrl}/search/${searchTerm}`);
    timeout(this.TIMEOUT_DURATION),
    catchError(this.handleError)
  }

  fetchGameById(gameId: string): Observable<GameResponse> {
    return this.http.get<GameResponse>(`${this.apiUrl}/${gameId}`);
    timeout(this.TIMEOUT_DURATION),
    catchError(this.handleError)
  }
  private handleError(error: HttpErrorResponse) {

    return throwError('Something went wrong; please try again later.'); 
  }
}
