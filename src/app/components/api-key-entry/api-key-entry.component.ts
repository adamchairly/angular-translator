// api-key-entry.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-api-key-entry',
  templateUrl: './api-key-entry.component.html',
  styleUrls: ['./api-key-entry.component.scss'],
  imports: [FormsModule], 
})


/**
 * A component for handling the initial API loading screen.
 */
export class ApiKeyEntryComponent {

  @Output() keysEntered = new EventEmitter<void>();

  // Api keys stored until submitting.
  yandexKey: string = '';
  wordsApiKey: string = '';
  deeplKey: string = '';

  constructor() {}

  /**
   * When submitting the API keys, the application stores it in the sessionStorage.
   */
  onKeysSubmitted(): void {
    // Store API keys in sessionStorage
    sessionStorage.setItem('yandex', this.yandexKey);
    sessionStorage.setItem('wordsapi', this.wordsApiKey);
    sessionStorage.setItem('deepl', this.deeplKey);

    // Emit an event to notify the parent component that keys have been submitted
    this.keysEntered.emit();
  }
}
