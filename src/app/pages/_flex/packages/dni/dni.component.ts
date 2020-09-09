import { Component, OnInit } from '@angular/core';
import { FlexService } from '../../flex.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'fury-dni',
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.scss']
})
export class DniComponent implements OnInit {

  public personDNI: string;

  constructor(private dialogRef: MatDialogRef<DniComponent>) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close(this.personDNI);
  }

}
