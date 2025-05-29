import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header>
      <button (click)="onMenuClick()" class="menu-button" title="Toggle menu">
        <span class="material-icons">menu</span>
      </button>
      <h1>Todo PWA</h1>
      <div class="header-actions">
        <div *ngIf="!isLoggedIn" class="login-form">
          <input type="email" [(ngModel)]="loginData.email" placeholder="Email" />
          <input type="password" [(ngModel)]="loginData.password" placeholder="Password" />
          <button (click)="onLogin()">Login</button>
        </div>
        <button *ngIf="isLoggedIn" (click)="onLogout()" class="logout-button">
          Logout
        </button>
      </div>
    </header>
  `,
  styles: [`
    header {
      display: flex;
      align-items: center;
      padding: 1rem;
      background-color: var(--surface-color);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid var(--border-color);
      color: #333333;
    }

    h1 {
      margin: 0;
      font-size: 1.5rem;
      color: #333333;
    }

    .menu-button {
      background: none;
      border: none;
      color: #333333;
      cursor: pointer;
      padding: 0.5rem;
      margin-right: 1rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .menu-button:hover {
      background-color: var(--border-color);
    }

    .header-actions {
      margin-left: auto;
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .login-form {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .login-form input {
      padding: 0.5rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background-color: var(--background-color);
      color: var(--input-text-color);
    }

    .login-form button {
      padding: 0.5rem 1rem;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .login-form button:hover {
      background-color: var(--primary-dark);
    }

    .logout-button {
      padding: 0.5rem 1rem;
      background-color: var(--error-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .logout-button:hover {
      opacity: 0.9;
    }
  `]
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  isLoggedIn = false;
  
  loginData = {
    email: '',
    password: ''
  };

  onMenuClick() {
    this.toggleSidebar.emit();
  }

  onLogin() {
    // TODO: Implement actual login logic
    console.log('Login attempt:', this.loginData);
    this.isLoggedIn = true;
    this.loginData = { email: '', password: '' };
  }

  onLogout() {
    this.isLoggedIn = false;
    this.loginData = { email: '', password: '' };
  }
}
