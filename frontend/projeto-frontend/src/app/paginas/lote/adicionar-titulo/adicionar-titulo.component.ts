import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckboxComponent, InputSelectItem, ToasterService } from '@decisaosistemas/angular-ds';
import { INotaPromissoriaInterface } from '../../../paginas/lote/adicionar-titulo/models/INotaPromissoria';
import { FormularioTitulo } from './models/IFormularioTitulo';
import { ITitulo } from './models/ITitulo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-adicionar-titulo',
  templateUrl: './adicionar-titulo.component.html',
  styleUrl: './adicionar-titulo.component.scss'
})
export class AdicionarTituloComponent {


  public mostrarInputsDup = false;
  public mostrarInputCheque = false;
  public mostrarInputNotaPromissoria = false;
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


@ViewChild('checkboxTitulo') checkboxTitulo!: CheckboxComponent;

  listaOptions: InputSelectItem[] = [
    { label: 'Duplicata', valor: 'Duplicata' },
    { label: 'Cheque', valor: 'Cheque' },
    { label: 'Nota Promissória', valor: 'Nota Promissória' },
];

  public criarLoteForm = new FormGroup({
    numTitulo: new FormControl<string | null>(null, Validators.required),
    valorTitulo: new FormControl<string | null>(null, Validators.required),
    vencimento: new FormControl<string | null>(null, Validators.required),
    cpf: new FormControl<string | null>(null, Validators.required),
    nome: new FormControl<string | null>(null, Validators.required),
  });

  constructor(private ngbModal: NgbModal , private toasterService: ToasterService) {
    this.listarTitulos = this.listarTitulos;
     // Atribui a função diretamente à variável
  }

  listarTitulos(): ITitulo[] {
    // Retorna a lista de títulos adicionados
    return this.titulosAdicionados;
  }
  
  public selecionarTipoTitulo(event: InputSelectItem): void {
    this.mostrarCampoDuplicata(event);
    this.mostrarCampoCheque(event);
    this.mostrarCampoNotaPromissoria(event);
  }

  mostrarCampoDuplicata(event: InputSelectItem): void  {
    this.mostrarInputsDup = event.valor === 'Duplicata';
  }

  mostrarCampoCheque(event: InputSelectItem): void  {
    this.mostrarInputCheque = event.valor === 'Cheque';
  }

  mostrarCampoNotaPromissoria(event: InputSelectItem): void {
    this.mostrarInputNotaPromissoria = event.valor === 'Nota Promissória';
  }

  public verificarSeFormularioEInvalido(): boolean {
    if (this.criarLoteForm.invalid || this.formularioInvalido) {
      return true;
    }
    return false;
  }

  public salvarTitulo(): void {
    if (!this.verificarSeFormularioEInvalido()) {
      // Adiciona o novo título à lista de títulos adicionados
      this.titulosAdicionados.push({
        numeroTitulo: this.criarLoteForm.controls.numTitulo.value,
        valorTitulo: this.criarLoteForm.controls.valorTitulo.value,
        vencimento: this.criarLoteForm.controls.vencimento.value,
        cpf: this.criarLoteForm.controls.cpf.value,
        nome: this.criarLoteForm.controls.nome.value,
        isChecked: false
      });

      // Limpa os inputs após salvar
      this.criarLoteForm.reset();
    }
  }



  nenhumCampoSelecionado(): boolean {
    return !this.mostrarInputsDup && !this.mostrarInputCheque && !this.mostrarInputNotaPromissoria;
  }
  
  }

