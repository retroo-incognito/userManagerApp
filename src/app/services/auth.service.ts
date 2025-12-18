import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';


interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  user = signal<LoginResponse['user'] | null>(null);
  token = signal<string | null>(null);

  isLoggedIn = computed(() => this.token() !== null);

  constructor(private http: HttpClient) { }


  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(res => {
          this.token.set(res.token);
          this.user.set(res.user);
          localStorage.setItem('token', res.token);
        })
      );
  }

  register(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
    this.user.set(null);
  }
}
