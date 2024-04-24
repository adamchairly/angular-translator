import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YandexapiService } from '../../services/yandex/yandexapi.service';

@Component({
  selector: 'app-translation-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './translation-page.component.html',
  styleUrl: './translation-page.component.scss'
})

/**
 * This componenet handles translation functionalities when using the Yandex API.
 */
export class TranslationPageComponent {

  // Current and target languages selected by the user.
  currentLang: string = '';
  targetLang: string = '';

  // Text provided by the user for translation and the translated text.
  inputText: string = '';
  translatedText: string = '';

  // List of available target languages based on the selected source language.
  availableTargetLangs: string[] = [];

  /**
   * Initializes the YandexapiService for use in the component.
   * @param translationService The injected service for accessing Yandex API functioalities.
   */
  constructor(private translationService: YandexapiService) {}

  ngOnInit() {
    this.loadAvailableTargetLangs();
  }

  /**
   * Loads available target languages from the Yandex API based on the current source language.
   */
  loadAvailableTargetLangs(): void {
    this.translationService.getSupportedLangs().subscribe({
      next: (langs) => {

        // Filter target langs for given input lang
        const filteredLangs = langs.filter(lang => lang.startsWith(this.currentLang + '-'));
        this.availableTargetLangs = filteredLangs.map(lang => lang.split('-')[1]);

      },
      error: (error) => {
        console.error('Error fetching supported languages:', error);
      }
    });
  }
  
  /**
   * Translates the input text based on the current language and target language pair.
   */
  translateText(): void {
    const langPair = `${this.currentLang}-${this.targetLang}`;
    this.translationService.translate(this.inputText, langPair)
      .subscribe({
        next: (response) => {
          if (response.def && response.def.length > 0) {
            const translations = response.def[0].tr;
            this.translatedText = translations.map((t: { text: any; }) => t.text).join(', ');
          } else {
            this.translatedText = 'No translations found.';
          }
        },
        error: (error) => {
          console.error('Error translating text:', error);
          this.translatedText = 'Error in translation.';
        }
      });
  }

   /**
   * Reacts to changes in the current source language by reloading available target languages.

   * Yandex API has limited availability for several input-output language pairs.
   */
  onCurrentLangChange(): void {
    this.loadAvailableTargetLangs();
  }

}
