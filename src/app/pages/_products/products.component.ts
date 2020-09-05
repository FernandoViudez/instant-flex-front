import { Component, OnInit } from '@angular/core';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';

@Component({
  selector: 'fury-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ProductsComponent implements OnInit {

  ngOnInit(){}

}
