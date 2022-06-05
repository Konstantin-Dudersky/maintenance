import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
})
export class EventInfoComponent implements OnInit, OnChanges {

  @Input()
  visible: boolean = false;

  int_visible = false;

  @Output()
  closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'].currentValue) {
      this.int_visible = true;
    }
  }
  cmdClose() {
    // закрыть окно
    this.int_visible = false;
    this.closed.emit(true);
  }

}
