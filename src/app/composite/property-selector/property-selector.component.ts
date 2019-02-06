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
    // this.changeDisplay = (previousValue !== currentValue && !firstChange) ? true : false;
    // this.changeDisplay = !this.changeDisplay;
    setTimeout(()=> {
      console.log('hit setTimeout');
      this.changeDisplay = false;
    }, 50);
    setTimeout(()=> {
      this.changeDisplay = true;
      console.log('changeDisplay status: ', this.changeDisplay);
      return this.changeDisplay;
    }, 100);
  }

  // toggleClassName(e: any) {
  //   console.log('evt; ', e.target.classList);
  //   let classArr = Array.from(e.target.classList);
  //   console.log('classArr: ', classArr);
  //   console.log('classList: ', e.target.classList);
  //   // e.target.classList.toggle('selected-val');
  //   if(classArr.includes('selected-val')) {
  //     e.target.classList.remove('selected-val');
  //     console.log('classList after removing selected-val: ', e.target.classList);
  //     e.target.classList.add('selected2');
  //     console.log('classList after adding selected2: ', e.target.classList);
  //   } else if (classArr.includes('selected2')) {
  //     e.target.classList.remove('selected2');
  //     e.target.classList.add('selected-val');
  //   }
  // }

}
