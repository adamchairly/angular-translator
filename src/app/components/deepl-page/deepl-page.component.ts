import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeeplService } from '../../services/deepl/deepl.service';

@Component({
  selector: 'app-deepl-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './deepl-page.component.html',
  styleUrl: './deepl-page.component.scss'
})

/**
 * A component for handling text translations using the Deepl API.
 */
export class DeeplPageComponent {

  // Properties for storing input text and the resulting translated text.
  inputText: string = '';
  translatedText: string = '';

  // Arrays to store available source and target languages supported by Deepl.
  availableSourceLangs: { language: string, name: string }[] = [];
  availableTargetLangs: { language: string, name: string }[] = [];

  // Current selected source and target languages.
  targetLang: string = '';
  currentLang: string = '';

  /**
   * Constructs the component with dependency injection of the DeeplService.
   * @param deeplService The injected service for accessing Deepl API functionalities.
   */
  constructor(private deeplService: DeeplService) {}


  ngOnInit() {
    this.loadAvailableLanguages('target');
    this.loadAvailableLanguages('source');
  }

  /**
   * Loads available languages from the Deepl API based on the specified type ('source' or 'target').
   * @param type The type of languages to load, either 'source' or 'target'.
   */
  private loadAvailableLanguages(type: 'source' | 'target'): void {
    this.deeplService.getAvailableLanguages(type).subscribe({
      next: (languages) => {
        if (type === 'source') {
          // Assuming you have defined this array in your component
          this.availableSourceLangs = languages.map(lang => ({ language: lang.language, name: lang.name }));
        } else {
          this.availableTargetLangs = languages.map(lang => ({ language: lang.language, name: lang.name }));
        }
      },
      error: (error) => {
        console.error(`Error fetching ${type} languages:`, error);
      }
    });
  }

  /**
   * Invokes the translation functionality of the Deepl API service using the user given text and selected target language.
   */
  translateText(): void {
    if (!this.inputText) {
      this.translatedText = 'Please enter some text to translate.';
      return;
    }
    this.deeplService.translate(this.inputText, this.targetLang)
      .subscribe({
        next: (response) => {
          this.translatedText = response.translations[0].text;
        },
        error: (error) => {
          console.error('Error translating text:', error);
          this.translatedText = 'Error in translation.';
        }
      });
  }
}
