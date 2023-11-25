import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      const usuarioAutenticado = JSON.parse(
        localStorage.getItem('USER') || 'null'
      );
      const tempoToken = JSON.parse(
        localStorage.getItem('TIMETOKEN') || 'null'
      );
      const tokenExpirado = new Date().getTime() - tempoToken <= 200000;

      if (usuarioAutenticado?.tipo === 'ADMIN' && tokenExpirado) {
        resolve(true);
      } else if (
        usuarioAutenticado?.tipo === 'FUNCIONARIO' &&
        state.url === '/adicionar-produto' &&
        tokenExpirado
      ) {
        resolve(false);
        this.router.navigate(['/listar-produtos']);
      } else if (
        usuarioAutenticado?.tipo === 'FUNCIONARIO' &&
        (state.url === '/listar-produtos' || state.url === '/home') &&
        tokenExpirado
      ) {
        resolve(true);
      } else {
        resolve(false);
        this.router.navigate(['/login']);
      }
    });
  }
}
