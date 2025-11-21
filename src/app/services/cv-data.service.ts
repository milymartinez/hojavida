import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CvDataService {
  private textSource = new BehaviorSubject<string>('Texto inicial del perfil profesional...');
  text$ = this.textSource.asObservable();

  updateText(newText: string) {
    this.textSource.next(newText);
  }
}