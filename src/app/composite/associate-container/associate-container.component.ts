import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FuserService } from '../fuser.service';
import { Feature } from 'src/app/feature.model';

@Component({
  selector: 'associate-container',
  templateUrl: './associate-container.component.html',
  styleUrls: ['./associate-container.component.css']
})
export class AssociateContainerComponent implements OnInit {

  private testString = 'Hello';
  @Input() modalOpened: boolean;
  private modalSubscription: any;
  @Input() features: Feature[];
  @Input() keys: string[];
  @Input() value: any;
  @Input() modalVals: Feature[];
  

  constructor(private fuserService: FuserService) { }

  ngOnInit() {
    // console.log('init status of modalOpened: ', this.modalOpened);
    console.log('received features: ', this.features);
    console.log('received keys: ', this.keys);
    this.modalSubscription = this.fuserService.modalOpened.subscribe(
      (openStatus: boolean) => this.modalOpened = openStatus
    )
  }

  onOpenModal(e: Event) {
    e.stopPropagation();
    //open the modal
    this.fuserService.openModal();
    //get the modalVals, to be used in the view
    this.modalVals = this.fuserService.sendModalVals();
  }

  onSelectModalFeatures(checked: boolean, feature: Feature) {
    console.log('checked: ', checked);
    this.value = feature;
    console.log('value: ', this.value);
    if (checked) {
      this.fuserService.collectModalVals(this.value);
    } else {
      //if unchecking a value, remove it from things to be added to modal
      this.fuserService.removeFromModalVals(this.value);
    }
  }

}
