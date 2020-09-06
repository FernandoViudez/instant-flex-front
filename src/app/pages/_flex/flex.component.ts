import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/_services/storage.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'fury-flex',
  templateUrl: './flex.component.html',
  styleUrls: ['./flex.component.scss']
})
export class FlexComponent implements OnInit {

  name: string;

  constructor(private storageService: StorageService,
              private authService: AuthService) { }

  ngOnInit(): void {
    let payload = this.authService.validateAndReturnToken(this.storageService.getTokenIntoStorage());

    this.name = payload.name;

  }

}
