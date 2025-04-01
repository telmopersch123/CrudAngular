import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SuccessMessageService } from '../services/mensagem/mensagem.service';

@Component({
  selector: 'app-componente-success',
  imports: [CommonModule],
  templateUrl: './componente-success.component.html',
  styleUrl: './componente-success.component.css'
})
export class ComponenteSuccessComponent {
  showCard: boolean = false;
  showCardAlert:boolean= false;
  mensagemAlteracao: string = '';
  mensagemAlert: string = '';

  constructor(private successMessageService: SuccessMessageService) {}
  
  ngOnInit() {
    this.successMessageService.estadoAnimacao$.subscribe((estado => {
      this.showCard = estado;
    }))
    this.successMessageService.mensagemAlteracao$.subscribe((mensagem => {
      this.mensagemAlteracao = mensagem;
    }))
    this.successMessageService.estadoAnimacaoAlert$.subscribe((estado => {
      this.showCardAlert = estado;
    }))  
     this.successMessageService.mensagemAlteracaoAlert$.subscribe((mensagem => {
      this.mensagemAlert = mensagem;
    }))
  }
  
 animacao() {
    this.successMessageService.ativarAnimacao();
  }

  teste() {
   this.successMessageService.ativarAnimacaoAlert(); 
  }
}
