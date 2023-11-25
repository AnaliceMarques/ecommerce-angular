import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  usuarioLogado!:any
  constructor(){
    this.usuarioLogado = JSON.parse(localStorage.getItem('USER') || 'null');

  }

}
