import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { InitiativePageComponent } from './components/initiative-page/initiative-page.component';
import { InitiativeTableComponent } from './components/initiative-table/initiative-table.component';
import { SignalRService } from './services/signal-r.service';

const materials = [
  MatButtonModule,
  MatCheckboxModule,
  MatDividerModule,
  MatInputModule,
  MatTableModule,
  MatTooltipModule
]
@NgModule({
  declarations: [
    AppComponent,
    InitiativePageComponent,
    InitiativeTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    materials    
  ],
  providers: [SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
