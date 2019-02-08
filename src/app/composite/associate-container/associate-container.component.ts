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
  private checkBoxSelected: boolean = false;
  private checkedInputs: any[] = [];

  constructor(private fuserService: FuserService) { }

  ngOnInit() {
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
    //reset checkbox values and status (so button will be disabled on modal close)
    this.checkBoxSelected = false;
    this.checkedInputs.forEach(input => input.checked = false);
    this.checkedInputs = [];
  }

  onSelectModalFeatures(checked: boolean, feature: Feature, checkbox: HTMLInputElement) {
    this.checkBoxSelected = true;
    this.checkedInputs.push(checkbox);
    this.value = feature;
    if (checked) {
      this.fuserService.collectModalVals(this.value);
    } else {
      //if unchecking a value, remove it from things to be added to modal
      this.fuserService.removeFromModalVals(this.value);
    }


  }

}
