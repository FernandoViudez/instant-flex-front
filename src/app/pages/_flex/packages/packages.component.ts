import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlexService } from '../flex.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fury-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit, OnDestroy {
  sb: any;

  displayedColumns: string[] = ['Codgio del paquete', 'Acciones'];

  packagesToDeliver: any[];
  packagesOnRoute: any[];

  constructor(private flexService: FlexService,
              private router: Router) { }

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
    
  }

  ngOnDestroy(){
    this.sb?.unsubscribe();
  }

}
