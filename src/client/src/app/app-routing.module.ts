import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageMainComponent } from './components/page-main/page-main.component';
import { PageObjectsComponent } from './components/page-objects/page-objects.component';

const routes: Routes = [
  { path: 'main', component: PageMainComponent },
  { path: 'objects', component: PageObjectsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
