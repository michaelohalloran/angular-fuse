import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FuserService } from '../fuser.service';

@Component({
  selector: 'property-selector',
  templateUrl: './property-selector.component.html',
  styleUrls: ['./property-selector.component.css']
})
export class PropertySelectorComponent implements OnInit {

  @Input() displayVal: string = '';

  constructor() { }

  ngOnInit() {}

}
