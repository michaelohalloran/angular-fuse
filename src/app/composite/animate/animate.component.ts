import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'animate',
  templateUrl: './animate.component.html',
  styleUrls: ['./animate.component.css']
})
export class AnimateComponent implements OnInit {

  userInput: string = '';
  defaultStartText: string = '';
  defaultEndText: string = '';

  constructor() { }

  ngOnInit() {
    this.defaultStartText = 'Click to start animation';
    this.defaultEndText = 'Click to revert animation';
  }

  startAnim() {
    console.log('hit startAnim');
    //replace text in start box with input
    this.defaultStartText = this.userInput;
    //animate background color and text?
  }

  revertAnim() {
    console.log('hit revertAnim');
  }

}
