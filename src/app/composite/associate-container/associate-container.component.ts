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
  

  constructor(private fuserService: FuserService) { }

  ngOnInit() {
    // console.log('init status of modalOpened: ', this.modalOpened);
    console.log('received features: ', this.features);
    this.modalSubscription = this.fuserService.modalOpened.subscribe(
      (openStatus: boolean) => this.modalOpened = openStatus
    )
  }

  onOpenModal(e: Event) {
    e.stopPropagation();
    console.log('fired onOpen from child');
    console.log('child opened status before opening: ', this.modalOpened);
    this.fuserService.openModal();
    console.log('child opened status: ', this.modalOpened);
  }

  ngOnChanges() {
    console.log('child changes modalOpened status: ', this.modalOpened);
  }

}
