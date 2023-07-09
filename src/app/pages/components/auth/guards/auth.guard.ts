import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, StoreAuthentication } from '../auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    private storeAuth: StoreAuthentication
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const authToken = this.storeAuth.getTokenIsValidFromLocalStorage();
    if (!authToken) {
    //   window.alert("Access not allowed!");
      this.router.navigate(['/auth/login'])
    }
    return true;
  }
}
