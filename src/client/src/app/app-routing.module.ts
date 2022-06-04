import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageMainComponent } from './components/page-main/page-main.component';
import { PageEquipComponent } from './components/page-equip/page-equip.component';
import { PageEquipsComponent } from './components/page-equips/page-equips.component';
import { PageEquipStatComponent } from './components/page-equip-stat/page-equip-stat.component';

const routes: Routes = [
  { path: 'main', component: PageMainComponent },
  { path: 'equips', component: PageEquipsComponent },
  { path: 'equip/:id', component: PageEquipComponent },
  { path: 'equip-stat/:id', component: PageEquipStatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
