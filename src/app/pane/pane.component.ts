import { Component } from '@angular/core';

@Component({
  selector: 'app-pane',
  templateUrl: './pane.component.html',
  styleUrls: ['./pane.component.css']
})
export class PaneComponent {

  constructor() { }

  changeCity(city: any) {
    localStorage.setItem('city', city);
    window.location.reload();
  }
}
