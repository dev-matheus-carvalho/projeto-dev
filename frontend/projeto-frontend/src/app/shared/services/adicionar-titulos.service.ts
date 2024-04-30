import { Injectable } from '@angular/core';
import { ITitulo } from '../../paginas/lote/adicionar-titulo/models/ITitulo';

@Injectable({
  providedIn: 'root'
})
export class AdicionarTitulosService {
  
  private titulosAdicionados: ITitulo[] = [];

  constructor() { }

  adicionarTitulo(titulo: ITitulo): void {
    this.titulosAdicionados.push(titulo);
  }

  listarTitulos(): ITitulo[] {
    return this.titulosAdicionados;
  }
}
