import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [],
  templateUrl: './education.html',
  styleUrl: './education.scss'
})
export class Education {
  @Input() educations: { title: string; place: string; date: string; description: string }[] = [];
  @Output() accordionToggled = new EventEmitter<boolean>();

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
    this.accordionToggled.emit(this.isOpen);
  }
}
