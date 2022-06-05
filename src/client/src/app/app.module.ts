import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// components
import { EventInfoComponent } from './components/event-info/event-info.component';
import { MenuComponent } from './components/menu/menu.component';
import { PageMainComponent } from './components/page-main/page-main.component';
import { PageEquipComponent } from './components/page-equip/page-equip.component';
import { PageEquipStatComponent } from './components/page-equip-stat/page-equip-stat.component';
import { PageEquipsComponent } from './components/page-equips/page-equips.component';

// primeng
import { ButtonModule } from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    EventInfoComponent,
    MenuComponent,
    PageMainComponent,
    PageEquipComponent,
    PageEquipStatComponent,
    PageEquipsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    // primeng
    ButtonModule,
    CalendarModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    MenubarModule,
    PanelModule,
    TableModule,
    ToastModule,
    ToolbarModule,
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// TODO обновить до v14 когда обновится primeblocks