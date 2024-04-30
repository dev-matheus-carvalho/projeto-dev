import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ITitulo } from '../adicionar-titulo/models/ITitulo';
import { CheckboxComponent } from '@decisaosistemas/angular-ds';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from '../../../shared/components/toaster-controller/toaster.service';
import { modalConfigDefault } from '../../../shared/constants/modalConfigConstants';
import { ModalDefaultComponent } from '../../../shared/modals/modal-default/modal-default.component';
import { TitulosService } from '../../../shared/services/titulos.service';

@Component({
  selector: 'app-listagem-titulos',
  templateUrl: './listagem-titulos.component.html',
  styleUrl: './listagem-titulos.component.scss'
})
export class ListagemTitulosComponent {

  private isMarcarTodosChecked: boolean = false;
  public marcarTodos: FormControl = new FormControl(false, Validators.required);
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
  @ViewChildren(CheckboxComponent) checkboxes!: QueryList<CheckboxComponent>;

  constructor(private ngbModal: NgbModal , private toasterService: ToasterService, private titulosService: TitulosService) {
    this.titulosAdicionados = this.titulosService.listarTitulos();
  }




  listarTitulos(): ITitulo[] {
    // Retorna a lista de títulos adicionados
    return this.titulosAdicionados;
  }

  public changeValorCheckbox(pIsChecked: boolean): void {
    console.log('checkboxTitulo:', this.checkboxTitulo); // Verifique se o checkboxTitulo está definido
    if (this.checkboxTitulo) {
      this.checkboxTitulo.setCheck(pIsChecked);
      this.titulosAdicionados.forEach(titulo => {
        titulo.isChecked = pIsChecked;
      });
    } else {
      console.error('checkboxTitulo não está definido');
    }
  }

  public marcarTodosTitulos(): void {
    this.isMarcarTodosChecked = !this.isMarcarTodosChecked;
    this.marcarTodos.setValue(this.isMarcarTodosChecked);
  
    this.checkboxes.forEach((checkbox) => {
      checkbox.setCheck(this.isMarcarTodosChecked);
    });
  
    this.titulosAdicionados.forEach((titulo) => {
      titulo.isChecked = this.isMarcarTodosChecked;
    });
  }

  public async abrirModalExcluirEndereco(pIdentificacao: string, pCep: string): Promise<void> {
    const modalRef = this.ngbModal.open(ModalDefaultComponent, modalConfigDefault);
    modalRef.componentInstance.textoHeader = 'Excluir endereço?';
    modalRef.componentInstance.textoDescricao = `Você tem certeza que deseja excluir?
    Os registros excluídos não poderão ser restaurados.`;
    modalRef.componentInstance.labelBotao = 'Excluir';
    modalRef.componentInstance.tipoBotaoConfirmarAcao = 'DANGER';
    modalRef.componentInstance.confirmarAcao.subscribe(async (response: boolean) => {
      try {
        this.toasterService.showSuccess('Endereço excluído com sucesso!');
      } catch (error) {
        this.toasterService.showAlert('Falha ao excluir endereço!');
        console.error(error);
      }
    })
  }

  

}
