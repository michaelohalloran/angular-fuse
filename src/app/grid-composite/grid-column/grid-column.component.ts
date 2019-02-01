import { Component, OnInit, Input } from '@angular/core';
import { Feature } from '../../feature.model';

@Component({
  selector: 'grid-column',
  templateUrl: './grid-column.component.html',
  styleUrls: ['./grid-column.component.css']
})
export class GridColumnComponent implements OnInit {

  @Input() feature: Feature;
  @Input() rowName: string;
  
  constructor() { }

  ngOnInit() {
  }

}
