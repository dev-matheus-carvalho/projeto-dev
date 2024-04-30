import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckboxComponent, InputSelectItem } from '@decisaosistemas/angular-ds';
import { ITitulo } from '../../models/ITitulo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDefaultComponent } from '../../../../../shared/modals/modal-default/modal-default.component';
import { modalConfigDefault } from '../../../../../shared/constants/modalConfigConstants';
import { ToasterService } from '../../../../../shared/components/toaster-controller/toaster.service';
import { TitulosService } from '../../../../../shared/services/titulos.service';



@Component({
  selector: 'app-nota-promissoria',
  templateUrl: './nota-promissoria.component.html',
  styleUrls: ['./nota-promissoria.component.scss']
})
export class NotaPromissoriaComponent {


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