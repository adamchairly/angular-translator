import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WordsapiService } from '../../services/wordsapi/wordsapi.service';

@Component({
  selector: 'app-synonym-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './synonym-page.component.html',
  styleUrl: './synonym-page.component.scss'
})

/**
 * A component that provides functionality to find synonyms and antonyms using the Words API.
 */
export class SynonymPageComponent {

  // Arrays to store synonyms and antonyms of the word.
  synonyms: string[] = [];
  antonyms: string[] = [];

  // The word entered by the user for which synonyms and antonyms are to be fetched
  word: string = ''

  /**
   * Constructs the component with dependency injection of the WordsapiService.
   * @param wordsApi The injected service for accessing Words API functionalities.
   */
  constructor(private wordsApi: WordsapiService) {}

  /**
   * Triggers a request to the Words API to find synonyms of the word.
   */
  onFindSynonyms(): void {
    console.log('Finding synonyms for:', this.word);

    // Using subscribe, which offers asynchronous handling of the fetched data
    this.wordsApi.getSynonyms(this.word).subscribe({
      next: (data) => {
        this.synonyms = data.synonyms;
      },
      error: (error) => {
        console.error('Error fetching synonyms:', error);
        this.synonyms = []; 
      }
    });
  }

  /**
   * Triggers a request to the Words API to find antonyms of the word.
   */
  onFindAntonyms(): void {
    console.log('Finding antonyms for:', this.word);
    this.wordsApi.getAntonyms(this.word).subscribe({
      next: (data) => {
        this.antonyms = data.antonyms;
      },
      error: (error) => {
        console.error('Error fetching antonyms:', error);
        this.antonyms = []; 
      }
    });
  }

}
