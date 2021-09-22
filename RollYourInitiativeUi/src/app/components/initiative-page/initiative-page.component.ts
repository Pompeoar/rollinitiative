import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'initiative-page',
  templateUrl: './initiative-page.component.html',
  styleUrls: ['./initiative-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InitiativePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
