import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    console.log("Constructor AuthGuard");
   }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(resolve => {
      this.afAuth.user.subscribe(user => {
        if (user) {
          console.log('User is logged in');
          resolve(true);
        } else {
          console.log('User is not logged in');
          this.router.navigate(['/admin']);
          resolve(false);
        }
      });
    });
  }
}
