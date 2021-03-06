import { Component, OnInit, OnDestroy } from '@angular/core';
import { FuserService } from './fuser.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'composite',
  templateUrl: './composite.component.html',
  styleUrls: ['./composite.component.css']
})
export class CompositeComponent implements OnInit, OnDestroy {

  private features: any[] = [];
  private rowKeys: string[] = [];

  private selectedKey: string = '';
  private selectedCellValue: any;
  private selectionColor: string;
  private options: any[] = [];
  private optionsSubscription: Subscription;
  private savedComps: any[];
  private modalOpened: boolean;
  private modalSubscription: Subscription;
  private displaySubscription: Subscription;
  private displayChanged: boolean = false;


  constructor(private fuserService: FuserService) { }

  ngOnInit() {

    this.features = this.fuserService.getFeatures();
    this.options = this.fuserService.getOptions();
    this.savedComps = this.fuserService.getSavedComposites();
    this.optionsSubscription = this.fuserService.optionsChanged.subscribe(
      (options: any[]) => this.options = options
    )
    this.modalSubscription = this.fuserService.modalOpened.subscribe(
      (openStatus: boolean) => this.modalOpened = openStatus
    )

    this.displaySubscription = this.fuserService.displayChanged.subscribe(
      (bool: boolean) => {
        this.displayChanged = bool;
        console.log('bool from fuser: ', bool);
      }
    )

    this.rowKeys = this.fuserService.makeRowKeys();
  }

  onSelectKey(key: string) {
    this.selectedKey = key;
  }

  setColumnWidth() {
    //100% / this.features.length + 2, e.g., 3 features should have 100/5 = 20% width
    let cellWidth = `${100/(this.features.length + 2)}%`;
    return cellWidth;
  }

  onSetComposite(feature: string, key: string, idx: number) {
    this.onSelectKey(key);
    this.selectionColor = feature['bgColor'];
    this.selectedCellValue = feature[this.selectedKey];
    this.toggleSelected(this.features, idx);
    //push selectedCellValue object into options array, with value and key
    let newestOption = {val: this.selectedCellValue, row: this.selectedKey, color: this.selectionColor};
    this.fuserService.toggleDisplayStatus();
    this.fuserService.updateOptions(newestOption);
  }

  findOption(array: any[], key: string, property: string, alternative:any) {
    //find the option that matches the current rowKey
    let found = array.find(option => option.row === key);
    return found ? found[property] : alternative;
  }

  setDisplay(key: string) {
    //check that options exists first:
    return this.findOption(this.options, key, 'val', null);
  }
  
  setColor(key: string) {
    return this.findOption(this.options, key, 'color', '#00A591');
  }

  toggleSelected(arr: any[], idx: number) {
    //change the selected feature's selected prop to true, but all others to false (i.e., toggle)
    for(let i = 0; i < arr.length; i++) {
      let selectedStatus = arr[i].selected;
      selectedStatus = !selectedStatus;
      arr[i].selected = (i === idx) ? true : false;
    }
  }

  onStoreComposite() {
    //take current composite obj, push into stored array
    this.fuserService.saveComposite(this.options);
  }


  onCloseModal(e: Event) {
    // this.modalOpened = false;
    // modal.modalOpened = this.modalOpened;
    // console.log('modal classes: ', modal);
    //only fire if modal is open
    if (this.modalOpened) {
      this.fuserService.closeModal();
    }
  }

  ngOnDestroy() {
    this.optionsSubscription.unsubscribe();
    this.modalSubscription.unsubscribe();
    this.displaySubscription.unsubscribe();
  }

}
