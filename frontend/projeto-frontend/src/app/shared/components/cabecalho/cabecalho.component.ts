import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '@decisaosistemas/angular-ds';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss'
})
export class CabecalhoComponent {

  nomeUsuario: string = '';

  constructor(private ngbModal: NgbModal, private router: Router, private toasterService: ToasterService) {
    this.obterDadosUsuarioLogado();
  }

  public obterDadosUsuarioLogado(): void {
    this.nomeUsuario = localStorage.getItem('nomeUsuario') ?? '';
  }
}