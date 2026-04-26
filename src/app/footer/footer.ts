import { Component, Input } from '@angular/core';
import { Skills } from './skills/skills';
import { Language } from './language/language';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [Skills, Language],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  @Input() skills: { name: string; value: number }[] = [];
  @Input() languages: { first: string; second: string; percent: number }[] = [];
}
