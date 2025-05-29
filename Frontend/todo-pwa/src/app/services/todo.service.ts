import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  listId: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  private todos$ = this.todosSubject.asObservable();

  constructor() {
    // Initialize with some sample todos
    this.todosSubject.next([
      { id: '1', text: 'Buy groceries', completed: false, listId: '1' },
      { id: '2', text: 'Finish project', completed: true, listId: '2' },
      { id: '3', text: 'Call mom', completed: false, listId: '1' },
      { id: '4', text: 'Book flight', completed: false, listId: '3' }
    ]);
  }

  getTodosByListId(listId: string): Observable<Todo[]> {
    return this.todos$.pipe(
      map(todos => todos.filter(todo => todo.listId === listId))
    );
  }

  addTodo(text: string, listId: string): void {
    const currentTodos = this.todosSubject.value;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      listId
    };
    this.todosSubject.next([...currentTodos, newTodo]);
  }

  deleteTodo(todoId: string): void {
    const currentTodos = this.todosSubject.value;
    this.todosSubject.next(
      currentTodos.filter(todo => todo.id !== todoId)
    );
  }

  toggleTodoCompletion(todoId: string): void {
    const currentTodos = this.todosSubject.value;
    this.todosSubject.next(
      currentTodos.map(todo =>
        todo.id === todoId
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }
} 