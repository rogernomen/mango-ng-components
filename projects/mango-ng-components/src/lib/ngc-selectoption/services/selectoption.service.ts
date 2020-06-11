import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SelectoptionService {

  private selectedText = new BehaviorSubject<string>('');
  private searchedText = new BehaviorSubject<string>('');

  constructor() { }

  getSelectedText(): Observable<string> {
    return this.selectedText.asObservable();
  }

  updateSelectedText(selectedText: string) {
    this.selectedText.next(selectedText);
  }

  getSearchedText(): Observable<string> {
    return this.searchedText.asObservable();
  }

  updateSearchedText(searchedText: string) {
    this.searchedText.next(searchedText);
  }
}
