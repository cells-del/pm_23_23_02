import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Header } from '../header/header';
import { Content } from '../content/content';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, Header, Content, Footer],
  templateUrl: './resume.html',
  styleUrl: './resume.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Resume implements OnInit {
  resumeData: any = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.http.get<any>('http://localhost:3000/api/resume').subscribe({
      next: (data) => {
        this.resumeData = {
          ...data,
          firstName: user?.firstName ?? data.firstName,
          lastName: user?.lastName ?? data.lastName
        };
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Помилка завантаження даних';
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  onSaveData(event: { firstName: string; lastName: string }) {
    this.http.post('http://localhost:3000/api/resume', event).subscribe({
      next: () => {
        this.authService.updateUser(event);

        this.resumeData = {
          ...this.resumeData,
          firstName: event.firstName,
          lastName: event.lastName
        };
        this.cdr.markForCheck();
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
