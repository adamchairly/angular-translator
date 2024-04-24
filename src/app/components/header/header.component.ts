import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

/**
 * The HeaderComponent manages navigation between different views.
 */
export class HeaderComponent {

  // Current selected view of the application.
  currentView: 'yandex' | 'deepl' | 'wordsapi'= 'yandex';

  /**
   * EventEmitter to notify parent components of a change in the current view.
   */
  @Output() viewChange = new EventEmitter<'yandex' | 'deepl' | 'wordsapi'>();

  /**
   * Sets the current view of the application and emits an event if the view changes.
   * @param view The new view to set.
   */
  setCurrentView(view: 'yandex' | 'deepl' | 'wordsapi'): void {
    if (this.currentView !== view) {
      this.currentView = view;
      this.viewChange.emit(this.currentView); // Emit an event when the view changes
    }
  }
}
