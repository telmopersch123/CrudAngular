import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SuccessMessageService } from './services/mensagem/mensagem.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private successMessageService: SuccessMessageService) {}

  canActivate(): boolean {
    let isLoggedIn;
    if (typeof localStorage !== 'undefined') {
      isLoggedIn = localStorage.getItem('isLoggedIn');
    }
     if (isLoggedIn === 'true') {
      return true; // Acesso permitido
    }

    this.router.navigate(['/cadastrar']); 
    this.successMessageService.ativarAnimacaoAlert()
    this.successMessageService.alterarMensagemAlert("É necessário fazer login!")
    return false;
  }
}
