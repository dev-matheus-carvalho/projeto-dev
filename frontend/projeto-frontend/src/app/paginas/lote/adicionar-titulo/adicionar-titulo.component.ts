import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ITipoTituloInterface } from './models/ItipoTitulo';
import { InputSelectItem } from '@decisaosistemas/angular-ds';

@Component({
  selector: 'app-adicionar-titulo',
  templateUrl: './adicionar-titulo.component.html',
  styleUrl: './adicionar-titulo.component.scss'
})
export class AdicionarTituloComponent {

  public mostrarInputsDup = false;
  public mostrarInputCheque = false;
  public mostrarInputNotaPromissoria = false;
  public tipoTitulo: ITipoTituloInterface[] = []
  public inputSelecionado: InputSelectItem | null = null;

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


  constructor() {
    this.listarTitulos = this.listarTitulos; // Atribui a função diretamente à variável
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

  nenhumCampoSelecionado(): boolean {
    return !this.mostrarInputsDup && !this.mostrarInputCheque && !this.mostrarInputNotaPromissoria;
  }

  listarTitulos(): { titulo: string; descricao: string; }[] {
    return [
      { titulo: '', descricao: '' },
    ];
  }

}
