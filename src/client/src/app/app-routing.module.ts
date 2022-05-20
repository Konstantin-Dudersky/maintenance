import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageMainComponent } from './components/page-main/page-main.component';
import { PageEquipComponent } from './components/page-equip/page-equip.component';
import { PageEquipsComponent } from './components/page-equips/page-equips.component';

const routes: Routes = [
  { path: 'main', component: PageMainComponent },
  { path: 'equips', component: PageEquipsComponent },
  { path: 'equip/:id', component: PageEquipComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
