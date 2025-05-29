import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TodoList {
  id: string;
  name: string;
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private readonly STORAGE_KEY = 'todo_lists';
  private lists: TodoList[] = [];
  private selectedListId = new BehaviorSubject<string | null>(null);

  constructor() {
    this.loadLists();
  }

  private loadLists(): void {
    const storedLists = localStorage.getItem(this.STORAGE_KEY);
    if (storedLists) {
      this.lists = JSON.parse(storedLists);
    } else {
      // Initialize with default lists
      this.lists = [
        { id: '1', name: 'Personal', createdAt: Date.now() },
        { id: '2', name: 'Work', createdAt: Date.now() },
        { id: '3', name: 'Shopping', createdAt: Date.now() }
      ];
      this.saveLists();
    }
  }

  private saveLists(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.lists));
  }

  getLists(): TodoList[] {
    return [...this.lists];
  }

  getSelectedListId(): Observable<string | null> {
    return this.selectedListId.asObservable();
  }

  getSelectedList(): TodoList | null {
    const selectedId = this.selectedListId.value;
    return selectedId ? this.lists.find(list => list.id === selectedId) || null : null;
  }

  createList(name: string): TodoList {
    const newList: TodoList = {
      id: Date.now().toString(),
      name: name.trim(),
      createdAt: Date.now()
    };
    this.lists.push(newList);
    this.saveLists();
    return newList;
  }

  deleteList(id: string): void {
    this.lists = this.lists.filter(list => list.id !== id);
    if (this.selectedListId.value === id) {
      this.selectedListId.next(null);
    }
    this.saveLists();
  }

  selectList(id: string | null): void {
    this.selectedListId.next(id);
  }

  updateList(id: string, name: string): TodoList | null {
    const list = this.lists.find(list => list.id === id);
    if (list) {
      list.name = name.trim();
      this.saveLists();
      return list;
    }
    return null;
  }
}
