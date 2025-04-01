import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Componente2Component } from "../componente2/componente2.component";
import { Aluno } from '../Model/Aluno';
import { ServicoAluno } from '../services/aluno/aluno.service';
@Component({
  selector: 'app-componente3',
  imports: [CommonModule, Componente2Component],
  templateUrl: './componente3.component.html',
  styleUrl: './componente3.component.css'
})
export class Componente3Component {

  


  vetor: Aluno[] = [];
  btnCadastrar: boolean = true;
  ControladoraInput: boolean = true;
  indice: number = -1;
  formulario: FormGroup;

  
  constructor(private services: ServicoAluno, private router: Router) { }
   ngOnInit() {
     this.carregarAlunos();
     this.services.btnCadastrar$.subscribe(valor => this.btnCadastrar = valor)
     this.services.controladoraInput$.subscribe(valor => this.ControladoraInput = valor)
     this.services.formulario$.subscribe(form => {
       if (form) {
        this.formulario = form;  
      }
     })
  }


  carregarAlunos() {
    this.services.selecionar().subscribe(alunos => {
      this.vetor = alunos; 
    });
  }

  selecionarAluno(indice: number) {
    this.indice = indice;
    this.formulario.setValue({
      id: this.vetor[indice].id,
      nome: this.vetor[indice].nome,
      nota1: this.vetor[indice].nota1,
      nota2: this.vetor[indice].nota2,
      media: this.vetor[indice].media
    })
    this.services.atualizarEstado(false, false);  
    this.router.navigate(['/cadastrar']);
  }

  getCellStyle(media: number): object {
    let backgroundColor: string;

    if (media <= 5) {
      backgroundColor ='var(--secondary-color)';
    } else if (media > 5 && media < 7.5) {
      backgroundColor = 'var(--neutral-color)';
    } else if (media >= 7.5 && media < 10) {
      backgroundColor = 'var(--primary-color)';
    } else if (media === 10) {
      backgroundColor = 'var(--success-color)';
    } else {
      backgroundColor = 'transparent';
    }

    return {
      'background-color': backgroundColor,
    };
  }
}
