import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EventType } from 'src/app/models/eventType';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
})
export class EventInfoComponent implements OnInit, OnDestroy {

  @Input()
  equip_id: number = 0;
  @Input()
  equip_name: string = '';
  @Input()
  eventTypes: EventType[] = [];

  event$: Subscription = new Subscription();
  visible: boolean = false;

  // form ----------------------------------------------------------------------
  form_event_type = new FormControl(
    '',
    { validators: [Validators.required] },
  )
  form = new FormGroup({
    event_type: this.form_event_type,
  }
  )
  // ---------------------------------------------------------------------------

  @Output()
  closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private api: ApiService,
    private msg: MessageService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.event$.unsubscribe();
  }

  open(event_id: number): void {
    // открыть окно
    this.visible = true;
    if (event_id > 0) {
      this.event$ = this.api.getEventById(event_id).subscribe({
        next: (event) => {
          this.form_event_type.setValue(event.event_type_id);
          console.log(this.form_event_type.value);
        },
        error: (error) => this.msg.add({
          severity: 'error',
          summary: 'Ошибка получения информации о событии',
          detail: error.message,
        }),
      });
    }
  }
  close() {
    // закрыть окно
    this.visible = false;
    this.closed.emit(true);
  }

}
