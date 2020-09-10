import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'fury-dialog',
  templateUrl: './dialog.component.html',
  styles: []
})
export class DialogComponent implements OnInit {

  public currentAdress;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,) { }

  ngOnInit(): void {
  }

  close(){
    console.log(this.currentAdress);
    if(!this.currentAdress || this.currentAdress == ""){
      /** Send feedback */
      return;
    }
    
    this.dialogRef.close(this.currentAdress);
  }

}
