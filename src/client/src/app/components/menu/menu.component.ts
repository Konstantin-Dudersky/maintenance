import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {

  items: MenuItem[] =
    [
      {
        label: 'Главная',
        icon: 'pi pi-home',
        routerLink: 'main',
      },
      {
        label: 'Объекты',
        icon: 'pi pi-list',
        routerLink: 'objects',
      },
    ];

  ngOnInit() { }

  constructor() { }

}
