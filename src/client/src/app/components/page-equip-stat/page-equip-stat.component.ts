import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of, switchMap } from 'rxjs';
import { Equip } from 'src/app/models/equip';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-page-equip-stat',
  templateUrl: './page-equip-stat.component.html',
})
export class PageEquipStatComponent implements OnInit {

  equip: Equip | undefined;

  constructor(
    private route: ActivatedRoute,
    private messages: MessageService,
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(
        (param) => {
          return this.api.readObjectById(param['id']);
        }
      )
    ).subscribe(
        {
          next: (next) => {
            this.equip = next;
          },
          error: (error) => this.messages.add({
            severity: 'error',
            summary: 'Данные не загружены',
            detail: error.message,
          })
        }
      )
  }

}
