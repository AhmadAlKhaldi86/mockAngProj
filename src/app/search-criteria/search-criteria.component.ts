import { Component, OnInit } from '@angular/core';
import { dropDownGenre } from '../interfaces';
import { TMDBService } from '../tmdb.service';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css'],
  providers: [TMDBService]
})
export class SearchCriteriaComponent implements OnInit {
  public getGenre: dropDownGenre[]; // gets genre from database
  public selectedGenre; // stores selected genre by user
  public getGenreElm; // stores the element object selected.
  public getGenreId // stores the selected ID.
  public movieData; // stores movie details.
  public img_base_path = "https://image.tmdb.org/t/p/w200"
  

  constructor(private __TMDBService: TMDBService) { }

  ngOnInit() {
    this.__TMDBService.fetchGenre()
    .subscribe(resp => this.getGenre = resp.genres);
  }

  getSelectedGenre(event: any) {
    this.selectedGenre = event.target.value;
    this.getGenreElm = this.getGenre.find(element => element.name === this.selectedGenre);
    this.getGenreId = this.getGenreElm.id;
    this.__TMDBService.getMovieData(this.getGenreId)
    .subscribe(resp => this.movieData = resp.results);
    // .subscribe(resp => console.log(resp));
   }
  }
