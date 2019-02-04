import { Injectable } from '@angular/core';
import { Feature } from './feature.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComposerService {

  private features: Feature[] = [
    {id: 1, lat: 34, lng: 'east', selected: false, bgColor: 'seagreen'},
    {id: 2, lat: 42, lng: 'west', selected: false, bgColor: 'lightsalmon'},
    {id: 3, lat: 37, lng: 'north', selected: false, bgColor: 'skyblue'},
  ];

  key: string = '';
  selectionChanged = new Subject<any>();

  constructor() { }

  getFeatures() {
    return this.features.slice();
  }

  getKeys() {
    //get id, lat, and lng keys
    return Object.keys(this.features[0]).slice(0,3);
  }

  setSelection(feature: Feature) {
    console.log('setSelection receives this feature: ', feature);
    this.selectionChanged.next(feature);
  }

  setKey() {
    this.key = 'hi';
  }

  getKey() {
    console.log('getKey: ', this.key);
    return this.key;
  }
  
}
