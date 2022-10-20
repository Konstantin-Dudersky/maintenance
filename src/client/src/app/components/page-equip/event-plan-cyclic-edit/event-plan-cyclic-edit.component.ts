import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EventPlan } from 'src/app/models/eventPlan';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-event-plan-cyclic-edit',
  templateUrl: './event-plan-cyclic-edit.component.html',
})
export class EventPlanCyclicEditComponent implements OnInit, OnDestroy {

  visible = false;
  event_plan$ = new Subscription();
  event_plan: EventPlan | undefined;

  // form ---------------------------------------------------------------------
  form_name = new FormControl('', { validators: [Validators.required] })
  form_value = new FormControl(
    '',
    { validators: [Validators.required, Validators.min(1)] },
  )
  form_description = new FormControl('', { validators: [] })
  form = new FormGroup({
    form_name: this.form_name,
    form_value: this.form_value,
    form_description: this.form_description,
  });

  constructor(private api: ApiService) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.event_plan$.unsubscribe();
  }

  open(equip_id: number, event_plan_id: number) {
    this.event_plan$ = this.api.getEventPlan(event_plan_id).subscribe({
      next: (event_plan) => {
        this.event_plan = event_plan;
        this.form_name.setValue(event_plan.name);
        this.form_value.setValue(event_plan.value);
        this.form_description.setValue(event_plan.description);
      }
    });
    this.visible = true;
  }

  save() {
    // сохраняем запись и закрываем окно
    let event_plan = <EventPlan>{};
    event_plan.
    this.close();
  }

  delete() {
    // удаляем запись и закрываем окно
    this.close();
  }

  close() {
    // закрывает окно
    this.event_plan$.unsubscribe();
    this.form.reset();
    this.visible = false;
  }
}
