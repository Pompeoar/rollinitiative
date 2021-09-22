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
  

    public startConnection(sessionId: string){
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl(this.initiativeHubEndpoint)
                              .build();
      this.hubConnection
        .start()
        .then(() => {
          this.hubConnection.invoke("JoinGroup", sessionId);
          console.log('Connection started with Initiative Hub')
          this.fetchInitialData(sessionId);
        })
        .catch(err => console.log('Error while starting connection: ' + err));

      this.setSignalrClientMethods();
    }

  private fetchInitialData(sessionId: string) {
    this.http.get(environment.baseUrl + "api/initiative?sessionId=" + sessionId)
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

    public addCharacter(sessionId: string, character: Character) {      
      this.hubConnection
      .invoke('addorupdatecharacter', sessionId, character)
      .catch(err => console.error(err));
    }

    public deleteCharacter(sessionId: string, character: Character) {
      this.hubConnection
      .invoke('deletecharacter', sessionId, character)
      .catch(err => console.error(err));
    }

    advanceRound(sessionId: string,) {
      this.hubConnection
      .invoke('advanceRound', sessionId)
      .catch(err => console.error(err));
    }

    endCombat(sessionId: string,) {
      this.hubConnection
      .invoke('endCombat', sessionId)
      .catch(err => console.error(err));
    }
   
  
}
