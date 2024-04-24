import { Component } from '@angular/core';
import { TranslationPageComponent } from "./components/translation-page/translation-page.component";
import { HeaderComponent } from "./components/header/header.component";
import { SynonymPageComponent } from './components/synonym-page/synonym-page.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WordsapiService } from './services/wordsapi/wordsapi.service';
import { YandexapiService } from './services/yandex/yandexapi.service';
import { DeeplPageComponent } from './components/deepl-page/deepl-page.component';
import { DeeplService } from './services/deepl/deepl.service';
import { ApiKeyEntryComponent} from './components/api-key-entry/api-key-entry.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [WordsapiService, YandexapiService, DeeplService],
    imports: [HttpClientModule, TranslationPageComponent, HeaderComponent, SynonymPageComponent, CommonModule, DeeplPageComponent, ApiKeyEntryComponent]
})
/**
 * Main componenet of the app, stores the current view that needs to be rendered
 */
export class AppComponent {
  currentView: 'yandex' | 'deepl' | 'wordsapi' | 'api' = 'api';

  constructor() {}
  /**
   * If the API keys have been submitted, the view changes to default.
  */
  onApiKeysEntered(): void {
    this.currentView = 'yandex'; 
  }

  /**
   * Handles view change based on events emitted by the header component.
   * @returns void
   */
  onViewChange(newView: 'yandex' | 'deepl' | 'wordsapi') {
    this.currentView = newView;
  }

}
