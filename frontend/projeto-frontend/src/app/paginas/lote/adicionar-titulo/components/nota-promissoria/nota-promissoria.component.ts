import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InputSelectItem } from '@decisaosistemas/angular-ds';
import { ITipoTituloInterface } from '../../models/ItipoTitulo';

@Component({
  selector: 'app-nota-promissoria',
  templateUrl: './nota-promissoria.component.html',
  styleUrl: './nota-promissoria.component.scss'
})
export class NotaPromissoriaComponent {

  public criarLoteForm = new FormGroup({
    numTitulo: new FormControl<string | null>(null, Validators.required),
    valorTitulo: new FormControl<string | null>(null, Validators.required),
    vencimento: new FormControl<string | null>(null, Validators.required),
    cpf: new FormControl<string | null>(null, Validators.required),
    nome: new FormControl<string | null>(null, Validators.required),
  });

}
