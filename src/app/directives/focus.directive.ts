import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appFocus]',
  standalone: true,
})
export class FocusDirective implements OnInit, AfterViewInit {
  el: ElementRef = inject(ElementRef);

  constructor() {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.el.nativeElement.focus();
  }
}
