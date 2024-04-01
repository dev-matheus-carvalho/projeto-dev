import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICriarContaReq } from '../../../shared/services/models/conta/ICriarContaReq';
import { ErrorsUtil } from '../../../shared/utils/errosUtil';
import { SenhasUtil } from '../../../shared/utils/senhaUtil';
import { ContaService } from '../../../shared/services/https/conta.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../../shared/components/toaster-controller/toaster.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrl: './criar-conta.component.scss'
})
export class CriarContaComponent {

  public criarContaForm = new FormGroup({
    nome: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    senha: new FormControl<string | null>(null, Validators.required),
    senha2: new FormControl<string | null>(null, Validators.required),
  });

  public formularioInvalido = false;
  public errosCustomizados = ErrorsUtil.getErrors;

  constructor(
    private contaService: ContaService,
    private toasterService: ToasterService,
    private router: Router
  ) { }

  public verificarSenha(pSenha: string, pFormControl: FormControl): void {
    if (pSenha !== '') {
      if (!SenhasUtil.verificarSenhaForte(pSenha)) {
        pFormControl.setErrors({
          senhaForaDoPadrao: true,
        })
      }
    }
  }
  public verificarSeSenhasSaoIguais(): void {
    if (this.criarContaForm.controls.senha.value !== this.criarContaForm.controls.senha2.value) {
      this.formularioInvalido = true;
    } else {
      this.formularioInvalido = false;
    }
  }

  public verificarSeFormularioEInvalido(): boolean {
    if (this.criarContaForm.invalid || this.formularioInvalido) {
      return true;
    }
    return false;
  }

  public buildCriarContaObject(): ICriarContaReq {
    return {
      email: this.criarContaForm.controls.email.value!,
     senha: this.criarContaForm.controls.senha.value!,
      nome: this.criarContaForm.controls.nome.value!,
   }
  }

  public async criarConta(): Promise<void> {
    try {
      if (!this.verificarSeFormularioEInvalido()) {
        const dados = await this.contaService.criarConta(this.buildCriarContaObject());
        if (dados.sucesso) {
          localStorage.setItem('nomeUsuario', this.criarContaForm.controls.nome.value!);
          this.toasterService.showSuccess('Conta criada com sucesso!');
          this.router.navigate(['login'])
        }
      }
    } catch (error) {
      this.toasterService.showAlert('Erro ao criar conta');
      throw error;
    }
  }

}
