import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Feature } from '../feature.model';

@Injectable({
  providedIn: 'root'
})
export class FuserService {

  private features: Feature[] = [
    {id: 1, lat: 39, lng: 'east', selected: false},
    {id: 2, lat: 42, lng: 'north', selected: false},
    {id: 3, lat: 97, lng: 'west', selected: false},
  ];

  private keys: string[] = [];
  private options: any[] = [];
  private storedComposites: any[] = [];
  modalOpened = new Subject<boolean>();
  optionsChanged = new Subject<any[]>();
  private modalVals: Feature[] = [];
  private colors: string[] = [];


  constructor() { 
    this.features = this.features.map(feature => {
      //check colors array to be sure color hasn't been used yet
      //push new color into colors array, delete old ones (when?)
      //check that color's rgb (or hex) values are not too close/similar by setting some limits on closeness
      feature.bgColor = this.generateRandomColor();
      return feature;
    })
  }

  // https://repl.it/@mike314151/HSL-Color-Generator?language=html&folderId=
  generateRandomColor = () => {

    let letters = '0123456789abcdef'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random()*16)];
    }
    return color;
  }

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

  //to merge saved composite into a single object
  mergeObj = obj => {
    return obj.reduce((final, next)=> {
      for (let key in next) {
        final[key] = next[key];
        return final;
      }
    }, {});
  }

  saveComposite(arr: any[]) {
    //extract just the values from options array

    //use mergeObj w/ pointer notation here?
    let compositeVals = arr.map(item => {
      let key = item.row;
      return {
        [key]: item['val']
      };
    });
    //merge into single object:
    let compositeObj = this.mergeObj(compositeVals);
    this.storedComposites.unshift(compositeObj);
    //clear options after each, so it's not overwritten
    this.resetOptions();
    this.optionsChanged.next(this.options);
  }

  sendModalVals() {
    return this.modalVals;
  }

  openModal() {
    this.modalOpened.next(true);
  }

  collectModalVals(val: Feature) {
    this.modalVals.push(val);
  }

  removeFromModalVals(val: Feature) {
    let removeIdx = this.modalVals.indexOf(val);
    this.modalVals = [...this.modalVals.slice(0, removeIdx), ...this.modalVals.slice(removeIdx + 1)];
  }

  closeModal() {
    this.modalOpened.next(false);
    //clear modalVals each time we close
    this.modalVals = [];
  }


}
