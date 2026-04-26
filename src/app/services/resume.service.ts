import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = 'http://localhost:3000/api/resume';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(err => {
        console.error('Помилка GET запиту:', err);
        return throwError(() => new Error('Не вдалося отримати дані з сервера'));
      })
    );
  }

  saveData(firstName: string, lastName: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { firstName, lastName }).pipe(
      catchError(err => {
        console.error('Помилка POST запиту:', err);
        return throwError(() => new Error('Не вдалося зберегти імʼя'));
      })
    );
  }
}
