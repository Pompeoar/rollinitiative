import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitiativeTableComponent } from './components/initiative-table/initiative-table.component';
import { SessionComponent } from './components/session/session.component';

const routes: Routes = [
  { path: '', component: SessionComponent },
  { path: 'table/:id', component: InitiativeTableComponent },
  { path: 'table', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }