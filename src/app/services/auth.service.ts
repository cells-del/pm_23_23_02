import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private readonly USER_KEY = 'cv_user';

  constructor(private http: HttpClient) {}

  register(data: { email: string; password: string; firstName: string; lastName: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data).pipe(
      tap((res: any) => {
        if (res.user) this.saveUser(res.user);
      })
    );
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        if (res.user) this.saveUser(res.user);
      })
    );
  }

  private saveUser(user: User): void {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    const raw = sessionStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  updateUser(data: { firstName: string; lastName: string }): void {
    const current = this.getUser();
    if (current) {
      this.saveUser({ ...current, ...data });
    }
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  logout(): void {
    sessionStorage.removeItem(this.USER_KEY);
  }
}
