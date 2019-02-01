import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComposerService } from '../composer.service';
import { Feature } from '../feature.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'grid-composite',
  templateUrl: './grid-composite.component.html',
  styleUrls: ['./grid-composite.component.css']
})
export class GridCompositeComponent implements OnInit, OnDestroy {

  features: Feature[] = [];
  keys: string[] = [];
  selectSubscription: Subscription;

  constructor(private composerService: ComposerService) { }

  createRowKeys() {
    let first = this.features[0];
    this.keys = Object.keys(first).slice(0,3);
    return this.keys;
  }

  ngOnInit() {
    this.features = this.composerService.getFeatures();
    this.createRowKeys();
    this.selectSubscription = this.composerService.selectionChanged.subscribe(
      (selection: Object) => console.log('subscribed selection: ', selection)
    )
  }

  toggleSelected(idx: number) {
    //toggle selected on all
    for(let i = 0; i < this.features.length; i++) {
      //if feature is the clicked one, toggle it
      if(this.features[i] === this.features[idx]) {
        this.features[idx].selected = true;
      } else {
      //otherwise, set selected to false (since we're dealing with one we didn't click)
        this.features[i].selected = false;
      }
    }
    return this.features;
  }

  getRowName(idx: number) {
    console.log('You selected row: ', this.keys[idx]);
    return this.keys[idx];
  }

  setSelected(feature: Feature, idx: number) {
    console.log('selected feature: ', feature);
    console.log('selected idx: ', idx);
    this.composerService.setSelection(feature);
    //set selectedVal
    //set selectedColor
    //set selectionKey
    //set cellToChange
  }

  saveCompositeFields() {
    console.log('hit save');
    //wrap composite columns into single object and save
  }

  ngOnDestroy() {
    this.selectSubscription.unsubscribe();
  }

}
