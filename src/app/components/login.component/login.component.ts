import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router'; // ← Add ActivatedRoute
import { toObservable } from '@angular/core/rxjs-interop'; // For signal to observable if needed
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form: FormGroup;
  loading = false; // ← For submit button disable + spinner

  // Inject services (modern way with inject() is fine too)
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // ← To read returnUrl

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  

  submit() {
    if (this.form.invalid || this.loading) return;

    this.loading = true;

    const { email, password } = this.form.value;

    this.auth.login(email!, password!).subscribe({
      next: () => {
        // Redirect to returnUrl if provided by the guard, otherwise go to dashboard
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.loading = false;
        alert(err.error?.message || 'Login failed. Please try again.');
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}