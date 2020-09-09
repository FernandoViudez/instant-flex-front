import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexService } from '../../flex.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { DniComponent } from '../dni/dni.component';

@Component({
  selector: 'fury-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  public package;
  private param: string;

  constructor(private activatedRoute: ActivatedRoute,
    private flexService: FlexService,
    private matDialog: MatDialog,
    private router: Router) { }

  async ngOnInit() {
    this.param = await this.getParam();

    this.getPackage(this.param);
  }

  getParam(): any {
    return new Promise((resolve, reject) => {

      this.activatedRoute.params
        .subscribe(param => {
          resolve(param['id']);
        })

    });
  }

  getPackage(param: string) {
    this.flexService.getSpecificPackage(param)
      .subscribe((data: any) => {
        console.log(data.message);
        this.package = data.message;
      })
  }

  backToList(){
    this.router.navigate(["/flex/packages"]);
  }

  sendToMaps() {
    let sentence: string;

    this.matDialog.open(DialogComponent)
      .afterClosed().subscribe(response => {

        if (!response) {
          return;
        }

        sentence = this.package.clientAdress.replace(/ /g, "+");
        response = response.replace(/ /g, "+");

        window.open(`https://www.google.com/maps/dir/${response}/${sentence}`, "_blank");

        /** Update the status of the buy, because there will be on route */
        this.flexService.onGenerateRoute(this.param)
          .subscribe((data: any) => {
            console.log(data);
            this.getPackage(this.param);
          })
      })

  }

  contactClient() {
    window.open(`https://api.whatsapp.com/send?phone=549${this.package.clientPhone}&text=Hola,%20soy%20el%20Flex.%20%20Ya%20estoy%20afuera!`, "_blank");
  }

  finishDeliver() {
    this.matDialog.open(DniComponent)
    .afterClosed()
    .subscribe( response => {

      if(!response) return;

      this.flexService.onFinishDeliver(this.param, { getDeliverPersonId: response })
      .subscribe(data => {
        console.log(data);
        /** Redirect the user to the list screens */
        this.router.navigate(["/flex/packages"]);

      })
    })
  }

}
