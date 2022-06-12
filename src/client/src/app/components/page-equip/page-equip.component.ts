import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { filter, Observable, of, Subscription, switchMap } from 'rxjs';

import { Equip } from 'src/app/models/equip';
import { EventPlan } from 'src/app/models/eventPlan';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-page-equip',
  templateUrl: './page-equip.component.html',
})
export class PageEquipComponent implements OnInit, OnDestroy {

  equip_id: Observable<number>
  equip$: Subscription;
  equip: Equip | undefined;

  // form
  form_name = new FormControl(
    '',
    { validators: [Validators.required] },
  )
  form_description = new FormControl(
    '',
    { validators: [] },
  )
  form_tech_params = new FormControl(
    '',
    { validators: [] },
  )
  form = new FormGroup(
    {
      name: this.form_name,
      description: this.form_description,
      tech_params: this.form_tech_params,
    }
  )

  constructor(
    private api: ApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // получаем equip_id
    this.equip_id = this.route.paramMap.pipe(
      switchMap(routeParams => {
        let id = Number(routeParams.get('equip_id'));
        return of(id)
      })
    );
    // получаем данные с таблицы Equip
    this.equip$ = this.equip_id.pipe(
      switchMap(equip_id => {
        if (equip_id == 0) {
          let new_equip = new Equip();
          this.form.enable();
          return of(new_equip)
        } else {
          this.form.disable();
          return this.api.readEquipById(equip_id);
        }
      })
    ).subscribe({
      next: (equip) => {
        this.equip = equip;
        this.form_name.setValue(this.equip.name);
        this.form_description.setValue(this.equip.description);
        this.form_tech_params.setValue(this.equip.tech_params);
      }
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.equip$.unsubscribe();
  }

  saveChanges() {
    if (!this.equip) { return; }
    this.equip.name = this.form_name.value;
    this.equip.description = this.form_description.value;
    this.equip.tech_params = this.form_tech_params.value;
    if (this.equip.equip_id == 0) {
      // добавляем новую запись
      this.api.createEquip(this.equip).subscribe({
        next: (next) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Объект создан',
            detail: next.name,
          });
          this.resetEditMode();
        },
        error: (error) => this.messageService.add({
          severity: 'error',
          summary: 'Ошибка создания нового объекта',
          detail: error.message,
        })
      }
      );
    } else {
      // изменяем имеющуюся запись
      this.api.patchEquip(this.equip).subscribe({
        error: (error) => this.messageService.add({
          severity: 'error',
          summary: 'Ошибка сохранения',
          detail: error.message,
        }),
        complete: () => this.messageService.add({
          severity: 'success',
          summary: `Объект '${this.equip?.name}' сохранен`
        })
      }
      );
      this.resetEditMode();
    }
  }

  delete() {
    if (this.equip == undefined) {
      return;
    }
    this.confirmationService.confirm({
      message: 'Вы уверены, что хотите удалить объект?',
      accept: () => {
        this.api.deleteEquip(this.equip!.equip_id).subscribe(
          {
            error: (error) => this.messageService.add({
              severity: 'error',
              summary: `Ошибка удаления объекта ${this.equip!.name}`,
              detail: error.message,
            }),
            complete: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Объект удален',
              });
              this.router.navigate(['/equips']);
            },
          }
        );
      },
      acceptLabel: 'Да',
      rejectLabel: 'Отмена',
    })

  }

  setEditMode(): void {
    this.form.enable();
  }

  resetEditMode(): void {
    this.form.disable();
  }

}
