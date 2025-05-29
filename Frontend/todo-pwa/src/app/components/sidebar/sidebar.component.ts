import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListService, TodoList } from '../../services/list.service';
import { ThemeService, ColorTheme } from '../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="sidebar-overlay" *ngIf="isOpen" (click)="onClose()"></div>
    <aside [class.open]="isOpen">
      <div class="sidebar-header">
        <h2>My Lists</h2>
        <button (click)="onAddList()" class="add-list-button" title="Add new list">
          <span class="material-icons">add</span>
        </button>
      </div>

      <div class="theme-section">
        <h3>Color Theme</h3>
        <div class="theme-buttons">
          <button 
            *ngFor="let theme of themes" 
            (click)="setColorTheme(theme)"
            [class.active]="currentTheme === theme"
            [style.background-color]="getThemeColor(theme)"
            [title]="theme + ' theme'"
          ></button>
        </div>
      </div>

      <div class="lists">
        <div 
          *ngFor="let list of todoLists" 
          class="list-item"
          [class.active]="selectedListId === list.id"
          (click)="onSelectList(list.id)"
        >
          <span class="list-name">{{ list.name }}</span>
          <button 
            (click)="onDeleteList(list.id); $event.stopPropagation()" 
            class="delete-button"
            title="Delete list"
          >
            <span class="material-icons">delete</span>
          </button>
        </div>
      </div>

      <div *ngIf="isAddingList" class="add-list-form">
        <input 
          type="text" 
          [(ngModel)]="newListName" 
          placeholder="Enter list name"
          (keyup.enter)="onSaveList()"
        />
        <div class="form-actions">
          <button (click)="onSaveList()">Save</button>
          <button (click)="onCancelAdd()">Cancel</button>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 998;
    }

    aside {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: 250px;
      background-color: var(--surface-color);
      border-right: 1px solid var(--border-color);
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      z-index: 1000;
      color: #333333;
    }

    aside.open {
      transform: translateX(0);
    }

    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    h2 {
      margin: 0;
      font-size: 1.2rem;
      color: #333333;
    }

    .add-list-button {
      background: none;
      border: none;
      color: #333333;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .add-list-button:hover {
      background-color: var(--border-color);
    }

    .theme-section {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1rem;
      color: #333333;
    }

    .theme-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .theme-buttons button {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .theme-buttons button:hover {
      transform: scale(1.1);
    }

    .theme-buttons button.active {
      border-color: #333333;
    }

    .lists {
      padding: 1rem;
      overflow-y: auto;
      max-height: calc(100vh - 200px);
    }

    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      border-radius: 4px;
      cursor: pointer;
      color: #333333;
    }

    .list-item:hover {
      background-color: var(--border-color);
    }

    .list-item.active {
      background-color: var(--primary-color);
      color: white;
    }

    .list-item.active .delete-button {
      color: white;
    }

    .list-name {
      flex: 1;
    }

    .delete-button {
      background: none;
      border: none;
      color: #333333;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .delete-button:hover {
      background-color: var(--border-color);
    }

    .add-list-form {
      padding: 1rem;
      border-top: 1px solid var(--border-color);
    }

    .add-list-form input {
      width: 100%;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background-color: var(--background-color);
      color: var(--input-text-color);
    }

    .form-actions {
      display: flex;
      gap: 0.5rem;
    }

    .form-actions button {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .form-actions button:first-child {
      background-color: var(--primary-color);
      color: white;
    }

    .form-actions button:last-child {
      background-color: var(--error-color);
      color: white;
    }
  `]
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() listSelected = new EventEmitter<string>();
  @Output() listAdded = new EventEmitter<string>();
  @Output() listDeleted = new EventEmitter<string>();

  todoLists: TodoList[] = [];
  newListName = '';
  selectedListId: string | null = null;
  isAddingList = false;
  themes: ColorTheme[] = ['green', 'red', 'yellow', 'blue'];
  currentTheme: ColorTheme = 'green';

  constructor(
    private listService: ListService,
    private themeService: ThemeService
  ) {
    this.themeService.colorTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  ngOnInit() {
    this.loadLists();
    this.listService.getSelectedListId().subscribe(id => {
      this.selectedListId = id;
    });
  }

  private loadLists() {
    this.todoLists = this.listService.getLists();
  }

  onSelectList(listId: string) {
    this.selectedListId = listId;
    this.listSelected.emit(listId);
  }

  onAddList() {
    this.isAddingList = true;
  }

  onSaveList() {
    if (this.newListName.trim()) {
      const newList = this.listService.createList(this.newListName);
      this.newListName = '';
      this.loadLists();
      this.listAdded.emit(newList.id);
    }
  }

  onCancelAdd() {
    this.isAddingList = false;
    this.newListName = '';
  }

  onDeleteList(listId: string) {
    this.listService.deleteList(listId);
    this.loadLists();
    if (this.selectedListId === listId) {
      this.selectedListId = null;
    }
    this.listDeleted.emit(listId);
  }

  onClose() {
    this.close.emit();
  }

  setColorTheme(theme: ColorTheme) {
    this.themeService.setColorTheme(theme);
  }

  getThemeColor(theme: ColorTheme): string {
    const colors = {
      green: '#1B5E20',
      red: '#b71c1c',
      yellow: '#E65100',
      blue: '#0D47A1'
    };
    return colors[theme];
  }
}
