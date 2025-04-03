import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ServicoAluno } from '../services/aluno/aluno.service';
import { DarkModeService } from '../services/backBody/darkmode.service';
import { SuccessMessageService } from '../services/mensagem/mensagem.service';

@Component({
  selector: 'app-componenteloginregistrar',
  imports: [FormsModule, CommonModule,ReactiveFormsModule ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './componenteloginregistrar.component.html',
  styleUrls: ['./componenteloginregistrar.component.css', './componenteloginregistrarDarkMode.component.css']
})
export class ComponenteloginregistrarComponent {
  isUserRegistered: boolean = false;
  isDarkMode: boolean = false;
  esconderSystemLoginRegister: boolean = false;
  ispopUpExit: boolean = false;
  formulario: FormGroup;
  constructor(private darkModeService: DarkModeService, private services: ServicoAluno, private successMessageService: SuccessMessageService, @Inject(PLATFORM_ID) private platformId: object) { }
  ngOnInit() {
    this.validarBotoes()
    if (typeof localStorage !== 'undefined' && window.localStorage) {
      this.username = localStorage.getItem('user') || '';
    }
    this.checkIfUserExists();
    this.formulario = new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.minLength(5), this.alphanumericNoSpacesValidator()]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    })
    this.formulario.get('usuario')?.valueChanges.subscribe(value => {
      this.username = value;
    })
    this.formulario.get('password')?.valueChanges.subscribe(value => {
      this.password = value;
    })
    this.formulario.get('confirmPassword')?.valueChanges.subscribe(value => {
      this.confirmPassword = value;
    })
  }
  checkIfUserExists() {
   if (typeof localStorage !== 'undefined' && window.localStorage) {
    const storedUser = localStorage.getItem('user');
    const storedPass = localStorage.getItem('password');
    this.isUserRegistered = !!(storedUser && storedPass && storedUser.trim() !== '' && storedPass.trim() !== '');
  } 
 
  }
  validarBotoes() {
      let isLoggedIn;
      if (typeof window !== 'undefined' && window.localStorage) {
        isLoggedIn = localStorage.getItem('isLoggedIn');
      }
      if (isLoggedIn === 'true') {
        this.esconderSystemLoginRegister = true;
      }
  
    return true;
  }
  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
    this.isDarkMode = !this.isDarkMode;
  }
  isLoginModalOpen = false;
  isRegisterModalOpen = false;
  openLoginModal() {
    this.isLoginModalOpen = true;
    this.isRegisterModalOpen = false;
  }
  openRegisterModal() {
    this.isRegisterModalOpen = true;
    this.isLoginModalOpen = false;
  }
  closeModal() {
    this.isLoginModalOpen = false;
    this.isRegisterModalOpen = false;
  }
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loginEvent(event: Event) {
    event.preventDefault();
    let storedUser;
    let storedPass;
    if (typeof window !== 'undefined' && window.localStorage) {
       storedUser = localStorage.getItem('user');
       storedPass = localStorage.getItem('password');
    }
    if (!storedUser || !storedPass || storedUser.trim() === '' || storedPass.trim() === '') {
      this.successMessageService.ativarAnimacaoAlert()
      this.successMessageService.alterarMensagemAlert("Crie uma conta antes de Logar, Porfavor!")
      return;
    }
    if (this.username === storedUser && this.password === storedPass) {
      this.successMessageService.mensagemCardFunction("Olá", "Seja Bem-vindo <strong class='strongName'>" + this.username + "</strong>!", "aviso");
      this.services.setLoginStatus(true);
      this.validarBotoes();
      this.closeModal();
    } else {
      this.successMessageService.ativarAnimacaoAlert()
      this.successMessageService.alterarMensagemAlert("Usuário ou senha incorretos!")
    }
  }

  registerUser(event: Event) {
    event.preventDefault();

    if (!this.formulario.invalid) {
      if (!this.username || !this.password || !this.confirmPassword) {
        this.successMessageService.ativarAnimacaoAlert()
        this.successMessageService.alterarMensagemAlert("Todos os campos são obrigatórios!")
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.successMessageService.ativarAnimacaoAlert()
        this.successMessageService.alterarMensagemAlert("As senhas não coincidem!")
        return;
      }
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('user', this.username);
        localStorage.setItem('password', this.password);
      }
      this.services.setLoginStatus(true);
      this.successMessageService.mensagemCardFunction("Olá", "Seja Bem-vindo <strong class='strongName'>" + this.username + "</strong>!", "aviso");

      this.validarBotoes();
      this.closeModal();
    }
  }

  openpopUpExit() {
    this.ispopUpExit = true;
  }
  logout() {
    this.services.setLoginStatus(false);
    this.successMessageService.mensagemCardFunction("Aviso!", "Você foi desconectado!", "aviso")
    this.validarBotoes();
    this.ispopUpExit = false;
  }

  closePopup(event: MouseEvent) {
  
    if (event.target === event.currentTarget) {
      this.ispopUpExit = false;
    }
  }

  getErrorMessagem(controlName: string): string {
    const control = this.formulario.get(controlName);
    //mapa para mapear tipos diferentes de erros
    const errorMessages = {
      usuario: {
        required: 'Um nome é obrigatório.',
        minlength: 'O nome precisa ter pelo menos 5 caracteres.',
        invalidName: 'O nome deve conter apenas letras e números, sem espaços, e não pode ser composto apenas por números.',
      },
      password: {
        required: 'A senha é obrigatória.',
        minlength: 'Insíra no mínimo 8 caracteres',
        maxlength: 'Insíra somente até 20 caracteres',
      },
      confirmPassword: {
        required: 'A confirmação da senha é obrigatória.',
        minlength: 'Insíra no mínimo 8 caracteres',
        maxlength: 'Insíra somente até 20 caracteres',
      },
    } as const;
    //método para controlar o erro especifico
    if (control?.errors && control.touched) {
      const controlErrors = errorMessages[controlName as keyof typeof errorMessages] as Record<string, string>;
      return controlErrors?.[Object.keys(control.errors)[0]] || '';
    }
  
    return '';
  }


  alphanumericNoSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const regex = /^[A-Za-z0-9]+$/;  // Apenas letras e números
    const isOnlyNumbers = /^\d+$/.test(value);  // Verifica se é composto apenas por números

    // Verifica se contém apenas letras e números, sem espaços e não é somente números
    if (!regex.test(value) || isOnlyNumbers) {
      return { invalidName: true };
    }
    return null;
  };
  }
}
