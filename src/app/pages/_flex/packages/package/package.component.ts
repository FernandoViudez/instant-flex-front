import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlexService } from '../../flex.service';

@Component({
  selector: 'fury-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private flexService: FlexService) { }

  async ngOnInit() {
    let param = await this.getParam();
  
    this.getPackage(param);
  }

  getParam(): any{
    return new Promise((resolve, reject) => {
      
      this.activatedRoute.params
      .subscribe( param => {
        resolve(param['id']);
      })

    });
  }

  getPackage(param: string){
    this.flexService.getSpecificPackage(param)
    .subscribe( data => {
      console.log(data);
    })
  }

}
