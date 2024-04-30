import { Injectable } from '@angular/core';
import { ITitulo } from '../../paginas/lote/adicionar-titulo/models/ITitulo';

@Injectable({
  providedIn: 'root'
})
export class TitulosService {
  private titulosAdicionados: ITitulo[] = [];

  constructor() { }

  adicionarTitulo(titulo: ITitulo): void {
    this.titulosAdicionados.push(titulo);
  }

  listarTitulos(): ITitulo[] {
    return this.titulosAdicionados;
  }
}
