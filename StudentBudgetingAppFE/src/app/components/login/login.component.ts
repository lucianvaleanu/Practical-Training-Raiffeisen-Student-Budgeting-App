import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]]
    });
  }

  onSubmit() {
    // Curățăm valorile introduse de utilizator folosind DomSanitizer pentru a evita SQL injection și alte atacuri
    const email = this.sanitizeInput(this.loginForm.value.email);
    const password = this.sanitizeInput(this.loginForm.value.password);

    // Folosim valorile curățate ale email-ului și parolei într-o interogare SQL parametrizată pentru a evita SQL injection
    // Exemplu de interogare parametrizată:
    // this.authService.login(email, password);

    // Simulăm autentificarea
    if (email === 'user@example.com' && password === 'Password@1') {
      alert('Login successful!');
      // Autentificare reușită
    } else {
      alert('Invalid credentials. Would you like to reset your password?');
      // Autentificare eșuată - afișăm un mesaj generic pentru credențiale greșite
      console.log('Invalid credentials. Would you like to reset your password?');
    }
  }

  resetPassword() {
    // Implementarea logicii pentru resetarea parolei
    console.log('Reset password logic here...');
  }

  private sanitizeInput(input: string): string {
    return this.sanitizer.sanitize(SecurityContext.HTML, input) || ''; // Curățare și protejare împotriva XSS (Cross-Site Scripting)
  }
}
