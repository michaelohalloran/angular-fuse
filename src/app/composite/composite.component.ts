import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FuserService } from './fuser.service';

@Component({
  selector: 'composite',
  templateUrl: './composite.component.html',
  styleUrls: ['./composite.component.css']
})
export class CompositeComponent implements OnInit, OnDestroy {

  private features: any[] = [];
  private rowKeys: string[] = [];

  private selectedKey: string = '';
  private selectedCell: any;
  private selectionColor: string;
  private options: any[] = [];
  private optionsSubscription: any;
  private savedComps: any[];

  constructor(private fuserService: FuserService) { }

  ngOnInit() {

    this.features = this.fuserService.getFeatures();
    this.options = this.fuserService.getOptions();
    this.savedComps = this.fuserService.getSavedComposites();
    this.optionsSubscription = this.fuserService.optionsChanged.subscribe(
      (options: any[]) => this.options = options
    )
    this.rowKeys = this.fuserService.makeRowKeys();
  }

  onSelectKey(key: string) {
    this.selectedKey = key;
  }

  onSetComposite(feature: string, key: string, idx: number) {
    this.onSelectKey(key);
    this.selectionColor = feature['bgColor'];
    this.selectedCell = feature[this.selectedKey];
    this.toggleSelected(this.features, idx);
    //push selectedCell object into options array, with value and key
    let newestOption = {val: this.selectedCell, row: this.selectedKey, color: this.selectionColor};
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

  ngOnDestroy() {
    this.optionsSubscription.unsubscribe();
  }

}
