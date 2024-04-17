import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InputSelectItem } from '@decisaosistemas/angular-ds';
import { IDuplicataInterface } from '../../models/Iduplicata';

@Component({
  selector: 'app-duplicata',
  templateUrl: './duplicata.component.html',
  styleUrl: './duplicata.component.scss'
})
export class DuplicataComponent {

  public criarLoteForm = new FormGroup({
    numTitulo: new FormControl<string | null>(null, Validators.required),
    valorTitulo: new FormControl<string | null>(null, Validators.required),
    vencimento: new FormControl<string | null>(null, Validators.required),
    cpf: new FormControl<string | null>(null, Validators.required),
    nome: new FormControl<string | null>(null, Validators.required),
    chaveNota: new FormControl<string | null>(null, Validators.required),
    protocoloNota: new FormControl<string | null>(null, Validators.required),
    numeroNota: new FormControl<string | null>(null, Validators.required),
    serie: new FormControl<string | null>(null, Validators.required),
    dataEmissao: new FormControl<string | null>(null, Validators.required),
    numeroFatura: new FormControl<string | null>(null, Validators.required),
    valorLiquidoFatura: new FormControl<string | null>(null, Validators.required),
  });

}
