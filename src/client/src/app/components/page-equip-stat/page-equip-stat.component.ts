import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription, switchMap } from 'rxjs';
import { Equip } from 'src/app/models/equip';
import { EventType } from 'src/app/models/eventType';
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
  eventTypes$: Subscription;
  eventTypes: EventType[] = [];

  constructor(
    private api: ApiService,
    private messages: MessageService,
    private route: ActivatedRoute,
  ) {
    // получаем инфо об объекте
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
      }),
    });
    // получаем перечень событий
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
      }),
    })
    // получаем типы событий
    this.eventTypes$ = this.api.readEventTypes().subscribe({
      next: (eventTypes) => this.eventTypes = eventTypes,
      error: (error) => this.messages.add({
        severity: 'error',
        summary: 'Не удалось получить типы событий',
        detail: error.message,
      }),
    })
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.equip$.unsubscribe();
    this.events$.unsubscribe();
    this.eventTypes$.unsubscribe();
  }
}
