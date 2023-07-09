import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStore {
  private user$ = new BehaviorSubject<AppUser>({
    id: null,
    username: null,
    uuid: null,
    roles: []
  });

  constructor() {}

  getUser() {
    return this.user$.asObservable();
  }

  setUser(paramUser: AppUser) {
    this.user$.next(paramUser);
  }

}

export interface AppUser {
    id: number;
    username: string;
    uuid: string;
    roles: Array<string>;
  }
