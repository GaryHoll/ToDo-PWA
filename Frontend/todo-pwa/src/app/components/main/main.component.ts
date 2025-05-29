import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { ListService } from '../../services/list.service';
import { TodoService } from '../../services/todo.service';

/**
 * Main component that displays the todo list for the selected list.
 * Handles list selection changes and updates the list service accordingly.
 */
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, TodoListComponent],
  template: `
    <div class="main-container">
      <app-todo-list [selectedListId]="selectedListId"></app-todo-list>
    </div>
  `,
  styles: [`
    .main-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 1rem;
    }
  `]
})
export class MainComponent implements OnChanges {
  /** The ID of the currently selected list */
  @Input() selectedListId: string | null = null;

  constructor(
    private listService: ListService,
    private todoService: TodoService
  ) {}

  /**
   * Handles changes to the selected list ID
   * Updates the list service when the selection changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedListId']) {
      this.listService.selectList(this.selectedListId);
    }
  }
} 