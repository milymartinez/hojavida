import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Experience } from '../models/experience.model';

@Injectable({
  providedIn: 'root'
})
export class ExperiencesService {

  private isBrowser = typeof window !== 'undefined';

  private experiences: Experience[] = this.loadFromStorage();
  private subject = new BehaviorSubject<Experience[]>(this.experiences);

  constructor() {}

  private loadFromStorage(): Experience[] {
    if (!this.isBrowser) return [];
    const raw = localStorage.getItem('experiences');
    return raw ? JSON.parse(raw) : [];
  }

  private saveToStorage() {
    if (!this.isBrowser) return;
    localStorage.setItem('experiences', JSON.stringify(this.experiences));
  }

  getAll(): Observable<Experience[]> {
    return this.subject.asObservable();
  }

  getById(id: string): Observable<Experience | undefined> {
    const item = this.experiences.find(e => e._id === id);
    return of(item);
  }

  create(data: Omit<Experience, '_id'>): Observable<Experience> {
    const newItem: Experience = { _id: crypto.randomUUID(), ...data };
    this.experiences.push(newItem);
    this.saveToStorage();
    this.subject.next(this.experiences);
    return of(newItem);
  }

  update(id: string, data: Partial<Experience>): Observable<Experience | undefined> {
    const idx = this.experiences.findIndex(e => e._id === id);
    if (idx >= 0) {
      this.experiences[idx] = { ...this.experiences[idx], ...data };
      this.saveToStorage();
      this.subject.next(this.experiences);
      return of(this.experiences[idx]);
    }
    return of(undefined);
  }

  delete(id: string): Observable<boolean> {
    this.experiences = this.experiences.filter(e => e._id !== id);
    this.saveToStorage();
    this.subject.next(this.experiences);
    return of(true);
  }
}
