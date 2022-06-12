import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, Subscription, switchMap } from 'rxjs';
import { EventPlan } from 'src/app/models/eventPlan';
import { ApiService } from 'src/app/services/api.service';
import { addErrorMsg } from 'src/app/utils';

@Component({
  selector: 'app-event-plan-cyclic',
  templateUrl: './event-plan-cyclic.component.html',
})
export class EventPlanCyclicComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  equip_id = new Observable<number>();

  event_plan$ = new Subscription();
  event_plan: EventPlan[] = [];

  cols = [
    { field: 'name', header: 'Название'},
    { field: 'value', header: 'Период'},
    { field: 'description', header: 'Описание'},
  ]

  constructor(
    private api: ApiService,
    private msg: MessageService,
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.event_plan$ = this.equip_id.pipe(
      switchMap(equip_id => this.api.getEventPlan(equip_id))
    ).subscribe({
      next: (event_plan) => this.event_plan = event_plan,
      error: (error) => this.msg.add(addErrorMsg(error))
    });
  }

  ngOnDestroy(): void {
    this.event_plan$.unsubscribe();
  }

}
