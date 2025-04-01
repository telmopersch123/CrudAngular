import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Componente2Component } from "../componente2/componente2.component";
import { Aluno } from '../Model/Aluno';
import { ServicoAluno } from '../services/aluno/aluno.service';
import { SuccessMessageService } from '../services/mensagem/mensagem.service';
@Component({
  selector: 'app-componente1',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Componente2Component],
  templateUrl: './componente1.component.html',
  styleUrl: './componente1.component.css'
})
export class Componente1Component {
  // Váriaveis e inicializadores
  isLoggedIn: boolean = false;
  btnCadastrar:boolean = true;
  ControladoraInput:boolean  = true;
  formulario: FormGroup;
  vetor: Aluno[] = [];
  mostrarModal: boolean = false; 
  tituloErro: string = '';
  mensagemErro: string = '';


  constructor(private services: ServicoAluno, private router: Router, private successMessageService: SuccessMessageService) { }



  ngOnInit() {
    this.formulario = this.services.getFormulario();
    this.services.btnCadastrar$.subscribe(valor => {
      this.btnCadastrar = valor;
    });
    this.services.controladoraInput$.subscribe(valor => {
      this.ControladoraInput = valor;
    });
    this.selecionarServico();
    this.isLoggedIn = this.services.getLoginStatus();
  }



  alterarEstado() {
    this.services.atualizarEstado(this.btnCadastrar, this.ControladoraInput);
  }

  atualizarFormulario() {
    this.formulario = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      nota1: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10)]),
      nota2: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10)]),
      media: new FormControl(null)
    })
    this.services.atualizarFormulario(this.formulario);
  }
  
  selecionarServico() {
    this.services.selecionar().subscribe(retornandoServico => {
      this.vetor = retornandoServico
    })
  }
 ///////////////////////////////////
  //funções Funcionais
 ///////////////////////////////////
  cadastrarAluno() {
  if(this.isLoggedIn){
    if (this.naopermitirduplicidade('cadastrar')) {
      return;
    }
    const aluno = this.formulario.value as Aluno;
    this.calcularMedia(aluno)
    this.services.cadastrar(this.formulario.value as Aluno).subscribe(retorno => {
      this.vetor.push(retorno);
      this.formulario.reset();
      this.successMessageService.ativarAnimacao();
      this.successMessageService.alterarMensagem("Cadastro de Aluno realizado com sucesso!");
    })
    } else {
    this.successMessageService.ativarAnimacaoAlert()
    this.successMessageService.alterarMensagemAlert("Você precisa estar logado para cadastrar.")
  }
  }
   
  alterarAluno() {
    if (this.naopermitirduplicidade('editar')) {
      return;
    }
   const aluno = this.formulario.value as Aluno;
   this.calcularMedia(aluno); 
    this.services.alterar(this.formulario.value as Aluno).subscribe(retorno => {
      let indiceAluno = this.vetor.findIndex(obj => {
        return this.formulario.value.id === obj.id
      })
    this.vetor[indiceAluno] = retorno;
    this.formulario.reset();
    this.ControladoraInput = true;
    this.btnCadastrar = true;
    this.successMessageService.ativarAnimacao();
    this.successMessageService.alterarMensagem(`Aluno ${retorno.nome.toUpperCase()} alterado com sucesso!`);
    this.alterarEstado()
    this.router.navigate(['/alunos']);
    })
  }
  removerAluno() {
    const alunoParaRemover = this.vetor.find(aluno => aluno.id === this.formulario.value.id);
    if (alunoParaRemover) {
      this.services.remover(this.formulario.value.id).subscribe(() => {
         const indiceAluno = this.vetor.findIndex(obj => obj.id === this.formulario.value.id);
        this.vetor.splice(indiceAluno, 1);
        this.ControladoraInput = true;
        this.formulario.reset();
        this.btnCadastrar = true;
        this.successMessageService.ativarAnimacao();
        this.successMessageService.alterarMensagem(`Aluno ${alunoParaRemover.nome.toUpperCase()} removido com sucesso!`);
        this.alterarEstado()
        this.router.navigate(['/alunos']);
      })
    }
  }
 cancelar() {
    this.formulario.reset();
    this.ControladoraInput = true;
    this.btnCadastrar = true;
    this.alterarEstado()
  }
  calcularMedia(aluno: Aluno) {
   if (aluno.nota1 !== null && aluno.nota2 !== null) {
    aluno.media = (aluno.nota1 + aluno.nota2) / 2;
    }
  }
///////////////////////////////////
//funções complementares
///////////////////////////////////

  naopermitirduplicidade(tipoalteracao: string) {
    for (let i = 0; i < this.vetor.length; i++) {
      const nomeProdutoFormulario = this.formulario.value.nome.trim().toLowerCase();
      const nomeProdutoVetor = this.vetor[i].nome.trim().toLowerCase();
      const idAlunoFormulario = this.formulario.value.id;
      switch (tipoalteracao) { 
        case 'cadastrar':
          if (nomeProdutoFormulario === nomeProdutoVetor) {
            this.successMessageService.mensagemCardFunction("Aluno já existe!", "Esse aluno já está cadastrado, por favor, insira um aluno novo.", "erro")
            return true;
          }
          break;
        case 'editar':
          if (nomeProdutoFormulario === nomeProdutoVetor && idAlunoFormulario !== this.vetor[i].id) {
            this.successMessageService.mensagemCardFunction("Aluno já existe!", "Esse aluno já está cadastrado, por favor, insira um aluno novo.", "erro")
            return true;
          }
          break;
      }
    }
    return false
  }

  
 getErrorMessage(controlName: string): string {
  const control = this.formulario.get(controlName);
  //mapa para mapear tipos diferentes de erros
  const errorMessages = {
    nome: {
      required: 'O nome é obrigatório.',
      minlength: 'O nome precisa ter pelo menos 3 caracteres.',
    },
    nota1: {
      required: 'A primeira nota é obrigatória.',
      min: 'O número mínimo para a primeira nota é 1.',
      max: 'O número máximo para a primeira nota é 10.',
    },
    nota2: {
      required: 'A segunda nota é obrigatória.',
      min: 'O número mínimo para a segunda nota é 1.',
      max: 'O número máximo para a segunda nota é 10.',
    },
   } as const;
   //método para controlar o erro especifico
  if (control?.errors && control.touched) {
    const controlErrors = errorMessages[controlName as keyof typeof errorMessages] as Record<string, string>;
    return controlErrors?.[Object.keys(control.errors)[0]] || '';
  }

  return '';
}



}
