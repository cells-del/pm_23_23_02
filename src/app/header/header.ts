import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HeaderProfile } from './header-profile/header-profile';
import { Contact } from './contact/contact';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderProfile, Contact],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() middleName: string = '';
  @Input() subtitle: string[] = [];
  @Input() aboutText1: string = '';
  @Input() aboutText2: string = '';
  @Input() contacts: any[] = [];
  @Output() saveName = new EventEmitter<{ firstName: string; lastName: string }>();

  onSaveName(data: { firstName: string; lastName: string }) {
    this.saveName.emit(data);
  }
}
