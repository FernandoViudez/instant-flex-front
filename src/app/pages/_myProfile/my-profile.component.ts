import { Component, OnInit } from '@angular/core';
import { MyProfileService } from './my-profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fury-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  private sb: Subscription;
  public userData;
  constructor(private myProfileService: MyProfileService) { }

  ngOnInit(): void {
    this.sb = this.myProfileService.getMe()
    .subscribe( (data: any) => {
      console.log(data);
      this.userData = data.message;
    })
  }

}
