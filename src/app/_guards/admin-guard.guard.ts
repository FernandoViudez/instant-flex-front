import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    let role = this.storageService.checkItem("role");
    let token = this.storageService.getTokenIntoStorage();

    if (role == 'USER_ADMIN' && this.authService.validateAndReturnToken(token)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }

}
