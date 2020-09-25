import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlexService } from 'src/app/pages/_flex/flex.service';
import { Subscription } from 'rxjs';

interface usersFlexDto {
  ok: boolean;
  message: Message[];
}

interface Message {
  _id: string;
  name: string;
  surname: string;
  email: string;
  zone: string;
  phone: number;
  __v: number;
}

@Component({
  selector: 'fury-view-sell-modal',
  templateUrl: './view-sell-modal.component.html',
})
export class ViewSellModalComponent implements OnInit, OnDestroy {

  form: FormGroup;

  sb$: Subscription;

  arrayFlexs: any[];

  constructor(public dialogRef: MatDialogRef<ViewSellModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private flexService: FlexService) { }

  ngOnInit() {
   this.form = this.fb.group({
     flexId: ["", [Validators.required]]
   })

   /** Get flex users */
   this.sb$ = this.flexService.getAllUsers()
   .subscribe( (data: usersFlexDto) => {
    this.arrayFlexs = data.message;
   })
  }

  close(){
    if(this.form.get("flexId").value == ""){
      return this.form.setErrors({ isRequired: true });
    }
    this.dialogRef.close(this.form.get("flexId").value);
  }

  ngOnDestroy(){
    this.sb$?.unsubscribe();
  }

}
