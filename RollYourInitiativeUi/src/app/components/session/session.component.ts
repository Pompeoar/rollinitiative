import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  model: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  startSession() {
    this.navigateTo(this.makeid(6));
  }

  joinSession() {
    this.navigateTo(this.model);
  }

  navigateTo(sessionId: string) {
    this.router.navigate([`/table/${sessionId}`])
  }

  makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result.slice(0, 3) + "-" + result.slice(3);
  }

}
