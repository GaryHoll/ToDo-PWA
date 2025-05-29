import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../../services/todo.service';
import { ProgressIndicatorComponent } from '../progress-indicator/progress-indicator.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProgressIndicatorComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnChanges {
  @Input() selectedListId: string | null = null;

  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  newTodoText = '';
  completedCount = 0;
  totalCount = 0;

  constructor(private todoService: TodoService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedListId']) {
      this.filterTodos();
    }
  }

  filterTodos() {
    if (this.selectedListId) {
      this.todoService.getTodosByListId(this.selectedListId).subscribe(todos => {
        this.todos = todos;
        this.filteredTodos = todos;
        this.updateProgress();
      });
    } else {
      this.filteredTodos = [];
      this.updateProgress();
    }
  }

  updateProgress() {
    this.totalCount = this.filteredTodos.length;
    this.completedCount = this.filteredTodos.filter(todo => todo.completed).length;
  }

  toggleCompletion(todo: Todo) {
    this.todoService.toggleTodoCompletion(todo.id);
    this.updateProgress();
  }

  deleteTodo(todoId: string) {
    this.todoService.deleteTodo(todoId);
    this.updateProgress();
  }

  addTodo() {
    if (this.newTodoText.trim() && this.selectedListId) {
      this.todoService.addTodo(this.newTodoText, this.selectedListId);
      this.newTodoText = '';
      this.updateProgress();
    }
  }
}
