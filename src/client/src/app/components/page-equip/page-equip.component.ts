import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, of, switchMap } from 'rxjs';

import { Equip } from 'src/app/models/equip';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-page-object',
  templateUrl: './page-equip.component.html',
})
export class PageEquipComponent implements OnInit {

  equip$: Observable<Equip> | undefined;
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
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(routeParams => {
        let id = Number(routeParams.get('id'));
        if (id == 0) {
          let new_equip = new Equip();
          this.form.enable();
          return of(new_equip)
        } else {
          this.form.disable();
          return this.api.readObjectById(id);
        }
      })
    ).subscribe(equip => {
      this.equip = equip;
      this.form_name.setValue(this.equip.name);
      this.form_description.setValue(this.equip.description);
      this.form_tech_params.setValue(this.equip.tech_params);
    })
  }

  saveChanges() {
    if (!this.equip) {
      return;
    }
    this.equip.name = this.form_name.value;
    this.equip.description = this.form_description.value;
    this.equip.tech_params = this.form_tech_params.value;
    if (this.equip.id == 0) {
      // добавляем новую запись
      this.api.createObject(this.equip).subscribe(
        (next) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Объект создан',
            detail: next.name,
          });
          this.resetEditMode();
        },
        (error) => this.messageService.add({
          severity: 'error',
          summary: 'Ошибка создания нового объекта',
          detail: error.message,
        }),
      );
    } else {
      // изменяем имеющуюся запись
      this.api.patchEquip(this.equip).subscribe(
        () => { },
        (error) => this.messageService.add({
          severity: 'error',
          summary: 'Ошибка сохранения',
          detail: error.message,
        })
        ,
        () => this.messageService.add({
          severity: 'success',
          summary: `Объект '${this.equip?.name}' сохранен`
        })
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
        this.api.deleteEquip(this.equip!.id).subscribe(
          (next) => { },
          (error) => console.error(error),
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Объект удален',
            });
            this.router.navigate(['/equips']);
          },
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