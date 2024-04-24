import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Represents a service for managing communication with Wordsapi API.
 */
export class WordsapiService {

  // Endpoints for the api calls
  private apiUrl = 'https://wordsapiv1.p.rapidapi.com/words';

  constructor(private http: HttpClient) { }

  // Retrieve the API key from sessionStorage
  private getApiKey(): string {
    const apiKey = sessionStorage.getItem('wordsapi');
    if (!apiKey) {
      throw new Error('API key not found in sessionStorage');
    }
    return apiKey;
  }

  // Create HttpHeaders with the API key
  private getHeaders(): HttpHeaders {
    const apiKey = this.getApiKey();
    return new HttpHeaders({
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      'x-rapidapi-key': apiKey,
    });
  }

  /**
   * Gets all the available synonyms for the given word.
   * @param word The word that needs synonym(s).
   * @returns An observable of the list of the synonyms.
   */
  getSynonyms(word: string): Observable<any> {
    try {
      const headers = this.getHeaders();
      return this.http.get(`${this.apiUrl}/${word}/synonyms`, { headers });
    } catch (error) {
      return throwError(() => new Error('No API key provided'));
    }
  }

  /**
   * Gets all the available antonyms for the given word.
   * @param word The word that needs antonym(s).
   * @returns An observable of the list of the synonyms.
   */
  getAntonyms(word: string): Observable<any> {
    try {
      const headers = this.getHeaders();
      return this.http.get(`${this.apiUrl}/${word}/antonyms`, { headers });
    } catch (error) {
      return throwError(() => new Error('No API key provided'));
    }
  }
}
