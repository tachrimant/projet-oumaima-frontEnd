import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StoreInitCurrentUserService {
  store$ = new BehaviorSubject({});

  constructor() {}

  setCurrentUser(value) {
    this.store$.next(value);
  }

  currentUser() {
    return this.store$.asObservable();
  }
}
