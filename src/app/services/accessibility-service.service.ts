import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityServiceService {
  isGrayscale: boolean = false;
  isContrastMode: boolean = false;
  language: string = 'es-ES'

  constructor() {}

  increaseFontSize() {
    let currentSize = parseFloat(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));
    let newSize = currentSize * 1.2; // Incremento del 20%
    if (newSize <= 46) {
      document.body.style.fontSize = newSize + 'px';
    }
  }
  
  decreaseFontSize() {
    let currentSize = parseFloat(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));
    let newSize = currentSize * 0.8; // Decremento del 20%
    if (newSize >= 8) {
      document.body.style.fontSize = newSize + 'px';
    }
  }
  

  toggleGrayScale() {
    let body = document.body;
    if (!this.isGrayscale) {
      body.style.filter = 'grayscale(100%)';
    } else {
      body.style.filter = 'none';
    }
    this.isGrayscale = !this.isGrayscale;
  }

  toggleContrastMode() {
    let body = document.body;
    if (!this.isContrastMode) {
      body.style.filter = 'invert(100%)';
    } else {
      body.style.filter = 'none';
    }
    this.isContrastMode = !this.isContrastMode;
  }

  speak(text: string) {
    if ('speechSynthesis' in window) {
      let speech = new SpeechSynthesisUtterance(text);
      speech.lang = this.language;
      speech.rate=1.3;
      speech.volume= 4;
      window.speechSynthesis.speak(speech);
    } else {
      console.error('Tu navegador no admite la síntesis de voz.');
    }
  }

  pause() {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
    }
  }

  resume() {
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }

  stop() {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  }
}

