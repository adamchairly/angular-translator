import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Represents a service for managing communication with Deepl's API.
 */
export class DeeplService {
  
  // Endpoints for the api calls
  private translateUrl = 'https://api-free.deepl.com/v2/translate';
  private languagesUrl = 'https://api-free.deepl.com/v2/languages';

  // Proxy URL to bypass CORS
  private corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

  constructor(private http: HttpClient) {}

  // Retrieve the API key from sessionStorage
  private getApiKey(): string {
    const apiKey = sessionStorage.getItem('deepl');
    if (!apiKey) {
      throw new Error('API key not found in sessionStorage');
    }
    return apiKey;
  }

  /**
   * Gets all the available languages.
   * https://developers.deepl.com/docs/api-reference/languages
   * @param type The type of request - source or target languages.
   * @returns An observable of the list of available languages.
   */
  getAvailableLanguages(type: 'source' | 'target'): Observable<any[]> {
    //console.log(this.apiKey);
    const headers = new HttpHeaders({
      'Authorization': `DeepL-Auth-Key ${this.getApiKey()}`
    });

    const fullUrl = this.corsProxyUrl + this.languagesUrl + '?type=' + type;

    return this.http.get<any[]>(fullUrl, { headers: headers});
  }

  /**
   * Translates the given text to the target target language.
   * If source language not given, deepl will try to guess it.\
   * https://developers.deepl.com/docs/api-reference/translate/openapi-spec-for-text-translation
   * @param text The text that needs to be translated.
   * @param targetLang The target language.
   * @param sourceLang The source language. If not given, deepl will try to guess.
   * @returns An observable of the translated text.
   */
  translate(text: string, targetLang: string, sourceLang?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `DeepL-Auth-Key ${this.getApiKey()}`
    });

    let body = new URLSearchParams();
    body.set('text', text);
    body.set('target_lang', targetLang);
    if (sourceLang) {
      body.set('source_lang', sourceLang);
    }

    const fullUrl = this.corsProxyUrl + this.translateUrl;

    return this.http.post(fullUrl, body.toString(), { headers })
  }
}