import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SuccessMessageService } from '../services/mensagem/mensagem.service';

@Component({
  selector: 'app-componentecaderror',
  imports: [CommonModule],
  templateUrl: './componentecaderror.component.html',
  styleUrl: './componentecaderror.component.css'
})
export class ComponentecaderrorComponent {
  mostrarModal: boolean = false; 
  tituloErro: string = '';
  mensagemErro: string = '';
  tipoMensagem: string = '';
  constructor(private successMessageService: SuccessMessageService) { }

  ngOnInit() {
     this.successMessageService.mensagemCard$.subscribe(({ titulo, mensagem, tipo }) => {
      this.tituloErro = titulo;
       this.mensagemErro = mensagem;
        this.tipoMensagem = tipo;
       this.mostrarModal = !!titulo; 
     });
  }
fecharModal() {
  this.mostrarModal = false;
  window.location.reload();
}
}
