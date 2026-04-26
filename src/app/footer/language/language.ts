import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [],
  templateUrl: './language.html',
  styleUrl: './language.scss'
})
export class Language {
  @Input() languages: { first: string; second: string; percent: number }[] = [];
}
