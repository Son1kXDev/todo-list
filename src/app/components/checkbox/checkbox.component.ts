import { Component, Input } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
})
export class CheckboxComponent {
  @Input() title: string = 'TITLE';
  @Input() checked: boolean = false;
  @Input() id: number = 0;
}
