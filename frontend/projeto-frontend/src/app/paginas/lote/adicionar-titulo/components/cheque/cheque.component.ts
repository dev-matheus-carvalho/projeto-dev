import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InputSelectItem } from '@decisaosistemas/angular-ds';
import { IDuplicataInterface } from '../../models/Iduplicata';
import { FormularioTitulo } from '../../models/IFormularioTitulo';
import { ITitulo } from '../../models/ITitulo';
import { TitulosService } from '../../../../../shared/services/titulos.service';

@Component({
  selector: 'app-cheque',
  templateUrl: './cheque.component.html',
  styleUrl: './cheque.component.scss'
})
export class ChequeComponent {

  public inputSelecionado: InputSelectItem | null = null;
  public formularioInvalido = false;
  public titulosSelecionados: boolean[] = [];
  public titulosAdicionados: ITitulo[] = [];
  public novoTitulo: ITitulo = {
  numeroTitulo: null,
  valorTitulo: null,
  vencimento: null,
  cpf: null,
  nome: null,
  isChecked: false
  };

  public criarLoteForm = new FormGroup({
    numTitulo: new FormControl<string | null>(null, Validators.required),
    valorTitulo: new FormControl<string | null>(null, Validators.required),
    vencimento: new FormControl<string | null>(null, Validators.required),
    cpf: new FormControl<string | null>(null, Validators.required),
    nome: new FormControl<string | null>(null, Validators.required),
    cmc7: new FormControl<string | null>(null, Validators.required),
  });

  constructor(private titulosService: TitulosService) { }

  public verificarSeFormularioEInvalido(): boolean {
    if (this.criarLoteForm.invalid || this.formularioInvalido) {
      return true;
    }
    return false;
  }

  public salvarTitulo(): void {
    if (!this.verificarSeFormularioEInvalido()) {
      // Adiciona o novo título à lista de títulos adicionados
      this.titulosService.adicionarTitulo(this.novoTitulo);
      this.novoTitulo = {
        numeroTitulo: null,
        valorTitulo: null,
        vencimento: null,
        cpf: null,
        nome: null,
        isChecked: false
      };
      this.criarLoteForm.reset();
    }
  }
}
