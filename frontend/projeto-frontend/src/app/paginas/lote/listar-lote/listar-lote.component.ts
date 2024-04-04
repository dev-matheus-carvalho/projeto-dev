import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-lote',
  templateUrl: './listar-lote.component.html',
  styleUrl: './listar-lote.component.scss'
})
export class ListarLoteComponent {
  
  constructor(public router: Router) {
  }

  public adicionarLote(): void {
    this.router.navigate([this.router.url, 'adicionar-lote']);
  }

  public listarLote(): void {

  }

}
