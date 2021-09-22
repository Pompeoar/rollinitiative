import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CharacterDataSource } from '../components/initiative-table/initiative-table.component';
import { Character } from '../models/chart-model';



@Injectable()
export class SignalRService {


  constructor(private http: HttpClient){}

  private hubConnection!: signalR.HubConnection;
  private broadcastData!: CharacterDataSource;
  private initiativeHubEndpoint: string = environment.baseUrl +  'initiative';
  

    public startConnection(){
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl(this.initiativeHubEndpoint)
                              .build();
      this.hubConnection
        .start()
        .then(() => {
          console.log('Connection started with Initiative Hub')
          this.fetchInitialData();
        })
        .catch(err => console.log('Error while starting connection: ' + err));

      this.setSignalrClientMethods();
    }

  private fetchInitialData() {
    this.http.get(environment.baseUrl + "api/initiative")
      .pipe(take(1))
      .subscribe();
  }

    private setSignalrClientMethods(): void {
      this.hubConnection.on('broadcastinitdata', (data) => {
        this.broadcastData.setData(data);
      });     
    }

    public attachCharacterDataSource(datasource: CharacterDataSource){
      this.broadcastData = datasource;
    }

    public addCharacter(character: Character) {      
      this.hubConnection
      .invoke('addorupdatecharacter', character)
      .catch(err => console.error(err));
    }

    public deleteCharacter(character: Character) {
      this.hubConnection
      .invoke('deletecharacter', character)
      .catch(err => console.error(err));
    }

    advanceRound() {
      this.hubConnection
      .invoke('advanceRound')
      .catch(err => console.error(err));
    }

    endCombat() {
      this.hubConnection
      .invoke('endCombat')
      .catch(err => console.error(err));
    }
   
  
}
