import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() games: any[] = [];
  @Output() searchInitiated = new EventEmitter<string>();
  searchTermCtrl = new FormControl('');
  @Output() searchTermChange = new EventEmitter<string>();
  filteredGames$?: Observable<any[]>;
  isSearchDisabled: boolean = false;
  constructor(private route: Router) {
    this.route.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe(() => {
        const currentUrl = this.route.url;
        const parts = currentUrl.split('/');
        this.isSearchDisabled =
          currentUrl.startsWith('/games/') && parts.length === 3;
      });
  }

  ngOnInit(): void {
    this.setupAutocomplete();
    const searchTerm = this.searchTermCtrl.value ?? '';
    this.searchInitiated.emit(searchTerm);
  }

  setupAutocomplete(): void {
    this.filteredGames$ = this.searchTermCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterGames(value ?? ''))
    );
  }
  private _filterGames(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.games.filter((game) =>
      game.name.toLowerCase().includes(filterValue)
    );
  }

  searchGame(): void {
    const searchTerm = this.searchTermCtrl.value ?? '';
    this.searchTermChange.emit(searchTerm);
    console.log('Search term:', searchTerm);
    if (searchTerm) {
      console.log('Navigating to search with term:', searchTerm);
      this.route.navigate(['/search'], {
        queryParams: { searchTerm: searchTerm },
      });
    } else {
      console.log('Search term is empty');
    }
  }
}
