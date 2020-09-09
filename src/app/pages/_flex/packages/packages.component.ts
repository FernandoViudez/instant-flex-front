import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlexService } from '../flex.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'fury-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit, OnDestroy {
  sb: any;

  displayedColumns: string[] = ['Codgio del paquete', 'Acciones'];

  packagesToDeliver: any[];

  constructor(private flexService: FlexService,
              private router: Router,
              private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.sb = this.flexService.getAllPackages()
    .subscribe( (data: any) => {
      this.packagesToDeliver = data.message;
    })
  }

  specificPackage(packageId: string){
    this.router.navigate(['flex/package', packageId ]);
  }

  backToFlex(){
    this.router.navigate(['/flex']);
  }

  markCannotDeliver(){
    this.flexService.onFinishDay(this.packagesToDeliver)
    .subscribe( data => {
      this.snack.open('Hemos dejado todas tus entregas como pendientes, mañana podrás comenzar nuevamente a entregar tus paquetes!', " CERRAR", { duration: 10000 });
    })
  }

  ngOnDestroy(){
    this.sb?.unsubscribe();
  }

}
