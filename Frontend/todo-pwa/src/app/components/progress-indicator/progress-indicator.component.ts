import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-container" *ngIf="total > 0">
      <div class="progress-bar">
        <div class="progress-fill" [style.width.%]="percentage"></div>
      </div>
      <div class="progress-text">
        {{ completed }} of {{ total }} tasks completed ({{ percentage }}%)
      </div>
    </div>
  `,
  styles: [`
    .progress-container {
      margin-bottom: 1.5rem;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background-color: var(--surface-color);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }

    .progress-fill {
      height: 100%;
      background-color: var(--primary-color);
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 0.9rem;
      color: var(--text-color);
      text-align: center;
    }
  `]
})
export class ProgressIndicatorComponent {
  @Input() completed: number = 0;
  @Input() total: number = 0;

  get percentage(): number {
    if (this.total === 0) return 0;
    return Math.round((this.completed / this.total) * 100);
  }
} 