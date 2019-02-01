import { Component, OnInit, Input } from '@angular/core';
import { Feature } from '../../feature.model';

@Component({
  selector: 'grid-row',
  templateUrl: './grid-row.component.html',
  styleUrls: ['./grid-row.component.css']
})
export class GridRowComponent implements OnInit {

  @Input() feature: Feature;
  @Input() rowName: string;

  constructor() { }

  ngOnInit() {
    console.log('received feature: ', this.feature);
    console.log('rowName: ', this.rowName);
  }

}
