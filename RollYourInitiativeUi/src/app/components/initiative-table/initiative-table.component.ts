import { DataSource } from '@angular/cdk/table';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Character } from 'src/app/models/chart-model';
import { SignalRService } from 'src/app/services/signal-r.service';



@Component({
  selector: 'initiative-table',
  templateUrl: './initiative-table.component.html',
  styleUrls: ['./initiative-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InitiativeTableComponent implements OnInit {
  model: Character = { name: '', initiative: { advantage: false, bonus: 0, value: 0 }, sticky: false };
  displayedColumns: string[] = ['Name', 'Initiative', 'Advantage', 'Bonus', 'Edit', 'Action'];
  dataSource = new CharacterDataSource(this.http);
  public round: number = 0
  @ViewChild(MatTable)
  table!: MatTable<Character>;

  constructor(public signalRService: SignalRService, private http: HttpClient){}


  ngOnInit() {
    this.signalRService.attachCharacterDataSource(this.dataSource);
    this.signalRService.startConnection();
  } 

  addData() {
    if(this.model.name != ""){
      this.signalRService.addCharacter(this.model);
    }
  }

  deleteCharacter(character: Character) {
    this.signalRService.deleteCharacter(character);
  }

  updateModel(character: Character){
    this.model = character;
  }

  advanceRound(){
  this.round++;
    this.signalRService.advanceRound();
  }

  endCombat(){
    this.round = 0;
    this.signalRService.endCombat();
  }
}

export class CharacterDataSource implements DataSource<Character> {
  private _dataStream = new ReplaySubject<Character[]>();

  constructor(private http: HttpClient) {  }

  connect(): Observable<Character[]> {
    return this._dataStream.asObservable();
  }

  disconnect() {
    this._dataStream.complete();
  }

  setData(data: Character[]) {
    this._dataStream.next(data);
  }
}


