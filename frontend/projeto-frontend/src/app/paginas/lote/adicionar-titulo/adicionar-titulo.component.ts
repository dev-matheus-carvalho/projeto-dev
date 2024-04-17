import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InputSelectItem } from '@decisaosistemas/angular-ds';
import { INotaPromissoriaInterface } from '../../../paginas/lote/adicionar-titulo/models/INotaPromissoria';
import { FormularioTitulo } from './models/IFormularioTitulo';

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
  public numeroTituloTemp: string | null = null;
  public novoTitulo: FormularioTitulo = {
    numTitulo: null,
    valorTitulo: null,
    vencimento: null,
    cpf: null,
    nome: null
};

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
  titulosAdicionados: any[] = [];


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
    // Verifica se há títulos cadastrados no momento
    if (this.titulosAdicionados.length > 0) {
        // Se houver, retorna a lista de títulos cadastrados
        return this.titulosAdicionados;
    } else {
        // Caso contrário, retorna uma lista vazia
        return [];
    }
}

  public verificarSeFormularioEInvalido(): boolean {
    if (this.criarLoteForm.invalid || this.formularioInvalido) {
      return true;
    }
    return false;
  }

  public salvarTitulo() {
    if (!this.verificarSeFormularioEInvalido()) {
        // Adiciona o novo título à lista de títulos adicionados
        this.titulosAdicionados.push({
            numeroTitulo: this.novoTitulo.numTitulo,
            valorTitulo: this.novoTitulo.valorTitulo,
            vencimentoTitulo: this.novoTitulo.vencimento,
            nomePagador: this.novoTitulo.nome,
            cpfPagador: this.novoTitulo.cpf,
        });

        // Limpa os inputs após salvar
        this.criarLoteForm.reset();
    }
}

}
