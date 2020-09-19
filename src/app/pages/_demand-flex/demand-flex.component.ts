import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { DemandFlexService } from './demand-flex.service';

@Component({
  selector: 'fury-demand-flex',
  templateUrl: './demand-flex.component.html',
  styleUrls: ['./demand-flex.component.scss']
})
export class DemandFlexComponent implements OnInit {

  private productId: string;
  private userFlexId: string;
  private readonly VAPID_KEY = "BGEnylfm6fx69tPMGyhdp16JVyyIQ5MDaxJC2vjsLf_2SqWU3WQbqOEGZMn-jebC9Nowb0B5jeJeEV7j5QtsAE4"

  constructor(private demandFlex: DemandFlexService,
              private swUpdate: SwUpdate,
              private swPush: SwPush) { }

  ngOnInit(): void {
  }

  /** Subscribe to notifications */
  susbscribeNotifications() {
    if(this.swUpdate.isEnabled){
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_KEY
      })
      .then( sub => {
        // this.demandFlex.demandFlex(this.productId, this.userFlexId, sub)
        this.demandFlex.demandFlex("5f542d3ba7a39519942b1f75", "5f5ea529120da22c781a0a75", sub)
          .subscribe( data => {
            console.log(data);
          })
      })
    } 
  }

  /** When send the flex to take the product */
  onDemandFlex() {
    /** Validate form */

    /** Send the notification */
    this.susbscribeNotifications();

  }

}
