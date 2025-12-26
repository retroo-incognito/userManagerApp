import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

interface LoginResponse {
  token: string;
  user: {
    id: string;
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

  constructor(private http: HttpClient) {
    this.loadTokenFromStorage();
  }

  private loadTokenFromStorage(): void {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.token.set(storedToken);

      // Verify token is still valid
      this.verifyToken().subscribe({
        next: (response: any) => {
          this.user.set(response.user);
        },
        error: () => {
          // Token invalid, clear it
          this.logout();
        }
      });
    }
  }

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

  verifyToken(): Observable<any> {
    const token = this.token();
    return this.http.get(`${this.apiUrl}/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
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
