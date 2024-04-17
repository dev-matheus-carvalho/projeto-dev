import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InputSelectItem } from '@decisaosistemas/angular-ds';
import { IDuplicataInterface } from '../../models/Iduplicata';

@Component({
  selector: 'app-cheque',
  templateUrl: './cheque.component.html',
  styleUrl: './cheque.component.scss'
})
export class ChequeComponent {
  
  public criarLoteForm = new FormGroup({
    numTitulo: new FormControl<string | null>(null, Validators.required),
    valorTitulo: new FormControl<string | null>(null, Validators.required),
    vencimento: new FormControl<string | null>(null, Validators.required),
    cpf: new FormControl<string | null>(null, Validators.required),
    nome: new FormControl<string | null>(null, Validators.required),
    cmc7: new FormControl<string | null>(null, Validators.required),
  });

}
