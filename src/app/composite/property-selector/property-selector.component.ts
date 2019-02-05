import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FuserService } from '../fuser.service';

@Component({
  selector: 'property-selector',
  templateUrl: './property-selector.component.html',
  styleUrls: ['./property-selector.component.css']
})
export class PropertySelectorComponent implements OnInit {

  @Input() displayVal: string = '';
  changeDisplay: boolean = false;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('fired on changes ', changes);
    const {previousValue, currentValue, firstChange} = changes.displayVal;
    this.changeDisplay = (previousValue !== currentValue && !firstChange) ? true : false;
    console.log('changeDisplay status: ', this.changeDisplay);
    return this.changeDisplay;
  }

}
