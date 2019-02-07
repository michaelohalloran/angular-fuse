import { Component, OnInit } from '@angular/core';
import { trigger, animate, state, style, transition } from '@angular/animations';

@Component({
  selector: 'animate',
  templateUrl: './animate.component.html',
  styleUrls: ['./animate.component.css'],
  animations: [
    // trigger('colorChange', [
    //   transition('* => *', [
    //     style({opacity: 0.2, backgroundColor: 'green', transform: 'scale(1)'}),
    //     animate('4000ms ease-in', 
    //     style({opacity: 1, backgroundColor: 'red', transform: 'scale(1.5)'}))
    //   ])
    // ])
    trigger('colorChange', [
      state('start', style({opacity: 0.8, backgroundColor: 'green', transform: 'scale(1.5)'})),
      state('end', style({opacity: 1, backgroundColor: 'lightsalmon', transform: 'scale(1)'})),
      transition('* => *', animate(1000))
    ]),
    trigger('textChange', [
      state('init', style({opacity: 0.2, backgroundColor: 'mediumturquoise', color: 'blue', transform: 'scale(1)'})),
      state('final', style({opacity: 1, backgroundColor: 'blueviolet', padding: '10%', color: 'white', transform: 'scale(1.2)'})),
      transition('init<=>final', animate(2000)),
      // transition('final=>init', animate(2000)),
    ])
  ]
})
export class AnimateComponent implements OnInit {

  userInput: string = '';
  defaultStartText: string = '';
  defaultEndText: string = '';
  private changeColor: string = '';
  private changeText: string = '';

  constructor() { }

  ngOnInit() {
    this.defaultStartText = 'Click to start animation';
    this.defaultEndText = 'Click to reset animation state';
  }

  startAnim() {
    console.log('hit startAnim');
    //replace text in start box with input
    
    //animate background color and text?
    this.changeColor = 'start';
    this.defaultStartText = this.userInput;
    this.changeText = this.changeText === 'init' ? 'final': 'init';
  }

  revertAnim() {
    console.log('hit revertAnim');
    this.changeColor = 'end';
    this.changeText = '';
  }

}
