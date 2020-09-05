import { Component, OnInit } from '@angular/core';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';

@Component({
  selector: 'fury-sells',
  templateUrl: './sells.component.html',
  styleUrls: ['./sells.component.scss'],
  animations: [fadeInUpAnimation]
})
export class SellsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
