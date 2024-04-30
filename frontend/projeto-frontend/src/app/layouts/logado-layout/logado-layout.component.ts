import { Component } from '@angular/core';
import { SideNavItemRouterLink, SideNavItemTarget } from '@decisaosistemas/angular-ds';

@Component({
  selector: 'app-logado-layout',
  templateUrl: './logado-layout.component.html',
  styleUrl: './logado-layout.component.scss'
})
export class LogadoLayoutComponent {

  public menus: (SideNavItemTarget | SideNavItemRouterLink)[] = [
    new SideNavItemRouterLink('Início', 'ds-icon-home', `/inicio`),
    new SideNavItemRouterLink('Lote', 'ds-icon-upload', `/lote`),
    new SideNavItemRouterLink('Contas a Receber', 'ds-icon-coin-add', `/contas-receber`),
  ];

  ngOnInit(): void {  }

}