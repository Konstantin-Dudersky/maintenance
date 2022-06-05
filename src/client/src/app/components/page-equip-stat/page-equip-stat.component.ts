import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of, Subscription, switchMap } from 'rxjs';
import { Equip } from 'src/app/models/equip';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-page-equip-stat',
  templateUrl: './page-equip-stat.component.html',
})
export class PageEquipStatComponent implements OnInit, OnDestroy {

  equip$: Subscription;
  equip: Equip | undefined;
  events$: Subscription;
  events: Equip | undefined;
  event_info_visible: boolean = false;

  constructor(
    private api: ApiService,
    private messages: MessageService,
    private route: ActivatedRoute,
  ) {
    this.equip$ = this.route.params.pipe(
      switchMap(
        (param) => {
          return this.api.readEquipById(param['equip_id']);
        }
      )
    ).subscribe({
      next: (next) => {
        this.equip = next;
      },
      error: (error) => this.messages.add({
        severity: 'error',
        summary: 'Данные не загружены',
        detail: error.message,
      })
    });
    this.events$ = this.route.params.pipe(
      switchMap(
        (param) => this.api.readEventsById(param['equip_id'])
      )
    ).subscribe({
      next: (events) => console.log(events),
      error: (error) => this.messages.add({
        severity: 'error',
        summary: 'Не удалось получить записи журнала',
        detail: error.message,
      })
    })
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.equip$.unsubscribe();
    this.events$.unsubscribe();
  }
}
