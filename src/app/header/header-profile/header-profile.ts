import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header-profile.html',
  styleUrl: './header-profile.scss'
})
export class HeaderProfile {
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() middleName: string = '';
  @Input() subtitle: string[] = [];
  @Input() aboutText1: string = '';
  @Input() aboutText2: string = '';
  @Output() saveName = new EventEmitter<{ firstName: string; lastName: string }>();

  greeting = 'Hello.';
  intro = "I'm";

  isEditing = false;
  editFirstName = '';
  editLastName = '';

  startEdit() {
    this.editFirstName = this.firstName;
    this.editLastName = this.lastName;
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveEdit() {
    this.firstName = this.editFirstName;
    this.lastName = this.editLastName;
    this.isEditing = false;
    this.saveName.emit({ firstName: this.firstName, lastName: this.lastName });
  }
}
