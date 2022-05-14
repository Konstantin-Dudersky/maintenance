import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Object } from 'src/app/models/object';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-page-objects',
  templateUrl: './page-objects.component.html',
})
export class PageObjectsComponent implements OnInit {

  objects$: Observable<Object[]>;

  constructor(private api: ApiService) { 
    this.objects$ = this.api.readObjects();
  }

  ngOnInit() {
  }

}
