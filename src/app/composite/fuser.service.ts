import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuserService {

  private features: any[] = [
    {id: 1, lat: 39, lng: 'east', selected: false, bgColor:'#feb236',},
    {id: 2, lat: 42, lng: 'north', selected: false, bgColor:'#d64161',},
    {id: 3, lat: 97, lng: 'west', selected: false, bgColor:'#ff7b25',},
  ];

  private keys: string[] = [];
  private options: any[] = [];
  private storedComposites: any[] = [];
  optionsChanged = new Subject<any[]>();

  constructor() { }

  getFeatures() {
    //slice, because features should not change (e.g., it's loaded from some external API call)
    return this.features.slice();
  }

  getOptions() {
    //don't slice or it won't update on the page
    return this.options;
  }

  makeRowKeys() {
    this.keys = Object.keys(this.features[0]).slice(0,3);
    return this.keys;
  }

  updateOptions(newOpt: any) {
    //collect current row vals, check if our newOpt's row val is there
    let currentRows = this.options.reduce((acc, next)=> {
      acc.push(next.row);
      return acc;
    }, []);
    //only push to array if nothing else of same row type is there
    if(!currentRows.includes(newOpt.row)) {
      this.options.unshift(newOpt);
    } else {
      //if it is there, replace it with what we are about to unshift
      let itemToReplace = this.options.find(opt => opt.row === newOpt.row);
      let replaceIdx = this.options.indexOf(itemToReplace);
      this.options[replaceIdx] = newOpt;
    }
    this.optionsChanged.next(this.options);
  }

  getSavedComposites() {
    return this.storedComposites;
  }

  resetOptions() {
    this.options = [];
  }

  saveComposite(arr: any[]) {
    this.storedComposites.unshift(arr);
    //clear options after each, so it's not overwritten
    this.resetOptions();
    this.optionsChanged.next(this.options);
  }


}
