import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Header } from './header/header';
import { Content } from './content/content';
import { Footer } from './footer/footer';
import { ResumeService } from './services/resume.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Content, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  resumeData: any = null;
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(
    private resumeService: ResumeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.resumeService.getData().subscribe({
      next: (data) => {
        this.resumeData = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSaveData(data: { firstName: string; lastName: string }) {
    this.resumeService.saveData(data.firstName, data.lastName).subscribe({
      next: (res) => {
        console.log(res.message);
        alert('Імʼя збережено успішно!');
      },
      error: (err) => {
        alert('Помилка: ' + err.message);
      }
    });
  }
}
