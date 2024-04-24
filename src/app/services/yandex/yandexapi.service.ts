import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Represents a service for managing communication with Yandex API.
 */
export class YandexapiService {


  // Endpoints for the api call
  private apiUrl = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup';

  constructor(private http: HttpClient) { }

  /**
   * Gets the yandex api key from the session storage.
   * @returns The api key as string.
   */
  private getApiKey(): string {
    const apiKey = sessionStorage.getItem('yandex');
    if (!apiKey) {
      throw new Error('API key not found in sessionStorage');
    }
    return apiKey;
  }

  /**
   * Gets all the supported input languages.\
   * https://yandex.com/dev/dictionary/doc/dg/reference/getLangs.html
   * @returns An observable of the list of available languages.
   */
  getSupportedLangs(): Observable<string[]> {
    try {
      const apiKey = this.getApiKey();
      const url = `https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=${apiKey}`;
      return this.http.get<string[]>(url);
    } catch (error) {
      return throwError(() => new Error('No API key provided'));
    }
  }
  
  /**
   * Translates the given word.\
   * https://yandex.com/dev/dictionary/doc/dg/reference/lookup.html
   * @returns An observable of the translated word.
   */
  translate(word: string, lang: string): Observable<any> {
    try {
      const apiKey = this.getApiKey();
      const params = new HttpParams().set('key', apiKey).set('lang', lang).set('text', word);
      return this.http.get(this.apiUrl, { params });
    } catch (error) {
      return throwError(() => new Error('No API key provided'));
    }
  }


}