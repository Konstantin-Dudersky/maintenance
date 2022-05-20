import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Equip } from 'src/app/models/equip';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-page-equips',
  templateUrl: './page-equips.component.html',
})
export class PageEquipsComponent implements OnInit {

  objects$: Observable<Equip[]>;

  constructor(private api: ApiService) {
    this.objects$ = this.api.readObjects();
  }

  ngOnInit() {
  }


}
