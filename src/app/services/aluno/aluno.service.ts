import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Aluno } from '../../Model/Aluno';

@Injectable({
  providedIn: 'root'
})
export class ServicoAluno {
  private isLoggedIn: boolean = false;
  url: string = 'https://apiangularcrud.onrender.com/alunos';

  private btnCadastrarSubject = new BehaviorSubject<boolean>(true); // valor inicial
  private controladoraInputSubject = new BehaviorSubject<boolean>(true); // valor inicial
  EsconderSystemLoginRegister: boolean = false;
  btnCadastrar$ = this.btnCadastrarSubject.asObservable();
  controladoraInput$ = this.controladoraInputSubject.asObservable();

  atualizarEstado(btnCadastrar: boolean, controladoraInput: boolean) {
    this.btnCadastrarSubject.next(btnCadastrar);
    this.controladoraInputSubject.next(controladoraInput);
  }

  formulario = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    nota1: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10)]),  
    nota2: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10)]),
    media: new FormControl(null)
  })

  formulario$ = new BehaviorSubject<FormGroup>(this.formulario);

  atualizarFormulario(formulario: FormGroup) {
    this.formulario = formulario;
    this.formulario$.next(formulario);
  }
  getFormulario() {
    return this.formulario;
  }

  constructor(private http: HttpClient) { 
    if (typeof window !== 'undefined') {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }
  }
  getLoginStatus(): boolean {
    return this.isLoggedIn;
  }

 setLoginStatus(status: boolean): void {
    this.isLoggedIn = status;
    if (typeof window !== 'undefined') {  // Verifica se estamos no navegador
      localStorage.setItem('isLoggedIn', String(status));
    }
    this.atualizarEstadoBotao();
  }
  private atualizarEstadoBotao(): void {
    this.btnCadastrarSubject.next(this.isLoggedIn); // Atualiza o estado do botão
  }
  
  selecionar():Observable<Aluno[]>{
      return this.http.get<Aluno[]>(this.url);
  }
  
  cadastrar(obj: Aluno): Observable<Aluno>{
    return this.http.post<Aluno>(this.url, obj);
  }

  alterar(obj: Aluno): Observable<Aluno>{
    return this.http.put<Aluno>(`${this.url}/${obj.id}`, obj);
  }

  remover(id: number): Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`);
  }


}
