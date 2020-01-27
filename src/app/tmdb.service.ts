import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { apiAccess } from './api.key';

@Injectable({
  providedIn: 'root'
})

export class TMDBService {
  // This is the base path for our api call 
  public base_url: string = "https://api.themoviedb.org/3/"; 
  // This is our API Key
  public api_key="&api_key=1c5d9df66fa6263eeef4894d50305d28&language=en-US"
  // This the endpoint to update list with genre lists.
  public genreUrl: string = "genre/movie/list?"
  // This is the path to discover movies based on search queries. 
  public movie: string = "discover/movie?"
  // Search a movie by id.
  public getMovieWithId = "with_genres="
  // Search a movie with gte release date.
  public getMovieGteDate = "primary_release_date.gte=";
  // Search a movie with gte release date.
  public getMovieLteDate = "primary_release_date.lte=";
  
  
  constructor(private __http: HttpClient) {
  }

  // This will get all the genres from genre url above to get ready and add items to movie genre dropDown.
  fetchGenre(): Observable<any> {
    let __GenreUrl: string = this.base_url.concat(this.genreUrl,this.api_key);
    return this.__http.get(__GenreUrl).pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  // This will get all the movies with id selected by user.
  getMovieData(id): Observable<any>{
    let __movieUrl: string = this.base_url.concat(this.movie,this.getMovieWithId,id,this.api_key);
    return this.__http.get(__movieUrl).pipe(
    retry(1),
    catchError(this.errorHandler)
    )
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error")
  }

}
