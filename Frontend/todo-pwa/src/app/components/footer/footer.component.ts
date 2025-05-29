import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer>
      <div class="footer-content">
        <p>&copy; {{ currentYear }} Todo PWA. All rights reserved.</p>
        <a href="https://github.com/yourusername/todo-pwa" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: var(--surface-color);
      padding: 1rem;
      text-align: center;
      box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
      border-top: 1px solid var(--border-color);
      z-index: 100;
    }

    .footer-content {
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      color: var(--text-color);
    }

    a {
      color: var(--primary-color);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    a:hover {
      color: var(--primary-dark);
    }

    @media (max-width: 600px) {
      .footer-content {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
} 