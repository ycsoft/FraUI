import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoContentHeight]'
})
export class AutoContentHeightDirective implements OnInit {
  ngOnInit(): void {
    this.el.nativeElement.style.height = `${document.body.scrollHeight - 144}px`;
  }

  @Input('appAutoContentHeight') autoContentHeight: string;

  constructor(private el: ElementRef) {
  }

}
