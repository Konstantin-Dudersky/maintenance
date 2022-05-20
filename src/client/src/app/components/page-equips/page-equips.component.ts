import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { ApiService } from 'src/app/services/api.service';
import { Equip } from 'src/app/models/equip';

@Component({
  selector: 'app-page-equips',
  templateUrl: './page-equips.component.html',
})
export class PageEquipsComponent implements OnInit {

  equips: Equip[] | undefined;

  cols = [
    { field: 'id', header: 'id'},
    { field: 'name', header: 'Название'},
    { field: 'description', header: 'Описание'},
    { field: 'tech_params', header: 'Тех. параметры'},
  ]

  constructor(
    private api: ApiService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit() {
    this.api.readObjects().subscribe(
      {
        next: (next) => {
          this.equips = next;
        },
        error: (error) => this.messageService.add({
          severity: 'error',
          summary: 'Ошибка получения списка объектов',
          detail: error.message,
        })
      }
    )
  }

}
