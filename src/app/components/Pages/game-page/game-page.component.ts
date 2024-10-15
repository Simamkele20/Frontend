import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { CommonModule } from '@angular/common';
import { Game } from '../../../shared/models/game';
import { ChangeDetectorRef } from '@angular/core';
import { GameByIdResponse } from '../../../shared/models/game';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header.component';
import { FormControl } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit {
  game: Game | null = null;
  loading: boolean = true;
  userRating: number = 0;
  searchTermCtrl = new FormControl('');

  constructor(
    private gameService: GameService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGame();
  }

  loadGame(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.gameService.fetchGameById(gameId).subscribe(
        (response: GameByIdResponse) => {
          if (response.data && response.data.length > 0) {
            this.game =
              response.data[0].result.find(
                (game: Game) => game.id === parseInt(gameId, 10)
              ) || null;
          }
          this.loading = false;
        },

        (error) => {
          console.error('Error fetching game:', error);
          this.game = null;
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  getPlatforms(game: Game): string[] {
    if (game.platforms) {
      const uniquePlatforms = Array.from(
        new Set(game.platforms.map((platform) => platform.name))
      );
      return uniquePlatforms;
    }
    return ['No genres available'];
  }

  getGenres(game: Game): string[] {
    if (game.genres) {
      const uniqueGenres = Array.from(
        new Set(game.genres.map((genre) => genre.name))
      );
      return uniqueGenres;
    }
    return ['No genres available'];
  }

  getGameModes(game: Game): string[] {
    if (game.game_modes) {
      const uniqueModes = Array.from(
        new Set(game.game_modes.map((game_modes) => game_modes.name))
      );
      return uniqueModes;
    }
    return ['No game modes available'];
  }

  getRealeaseDates(game: Game): string[] {
    if (game.release_dates) {
      const uniqueDates = Array.from(
        new Set(game.release_dates.map((release_date) => release_date.human))
      );
      return uniqueDates;
    }
    return ['The game is not yet released'];
  }
}
