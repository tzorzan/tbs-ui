import { Component, OnInit } from '@angular/core';
import {TBSService} from "../tbs.service";

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {

  private lightOn: boolean;

  constructor(private tbsService: TBSService) {
    this.lightOn = true;
  }

  ngOnInit() {
  }

  public onClick(){
    this.lightOn = !this.lightOn;
    console.debug("Switch " + this.lightOn);
    if(this.lightOn) {
      this.tbsService.enter();
    } else {
      this.tbsService.exit();
    }
  }

}
