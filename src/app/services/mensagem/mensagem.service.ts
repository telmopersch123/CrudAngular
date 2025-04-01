import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuccessMessageService {
  private timeoutId: any;
  private timeoutIdAlert: any;
  constructor() { }

  private estadoAnimacao = new BehaviorSubject<boolean>(false);
  estadoAnimacao$ = this.estadoAnimacao.asObservable();
  ativarAnimacao() {
    this.estadoAnimacao.next(false); 

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    setTimeout(() => {
      this.estadoAnimacao.next(true);
      this.timeoutId = setTimeout(() => {
        this.estadoAnimacao.next(false); 
      }, 4000)
    }, 300); 
  }

  
  private mensagemAlteracao = new BehaviorSubject<string>('');
  mensagemAlteracao$ = this.mensagemAlteracao.asObservable();
  alterarMensagem(mensagem: string) {
    this.mensagemAlteracao.next(mensagem);
  }


  private estadoAnimacaoAlert = new BehaviorSubject<boolean>(false);
  estadoAnimacaoAlert$ = this.estadoAnimacaoAlert.asObservable();
  ativarAnimacaoAlert() {
    this.estadoAnimacaoAlert.next(false); 

    if (this.timeoutIdAlert) {
      clearTimeout(this.timeoutIdAlert);
    }

    setTimeout(() => {
      this.estadoAnimacaoAlert.next(true);
      this.timeoutIdAlert = setTimeout(() => {
        this.estadoAnimacaoAlert.next(false); 
      }, 4000)
    }, 300); 
  }
  private mensagemAlteracaoAlert = new BehaviorSubject<string>('');
  mensagemAlteracaoAlert$ = this.mensagemAlteracaoAlert.asObservable();
  alterarMensagemAlert(mensagem: string) {
    this.mensagemAlteracaoAlert.next(mensagem);
  }


  private mensagemCard = new BehaviorSubject<{ titulo: string, mensagem: string, tipo: string }>({ titulo: '', mensagem: '', tipo: '' });
  mensagemCard$ = this.mensagemCard.asObservable();
  mensagemCardFunction(titulo: string, mensagem: string,tipo: string) {
    this.mensagemCard.next({titulo, mensagem, tipo});
  }
 
 
}
