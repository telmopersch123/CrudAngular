// dark-mode.service.ts
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  constructor(@Inject(DOCUMENT) private document: Document) {}

  activateDarkMode() {
    this.document.body.classList.add('dark-mode');
  }

  deactivateDarkMode() {
    this.document.body.classList.remove('dark-mode');
  }

  toggleDarkMode() {
    this.document.body.classList.toggle('dark-mode');
  }
}
