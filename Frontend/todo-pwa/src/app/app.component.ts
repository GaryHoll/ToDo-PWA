import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListService } from './services/list.service';
import { MainComponent } from './components/main/main.component';

/**
 * Root application component that manages the overall layout and state
 * of the application, including sidebar visibility and list selection.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MainComponent
  ],
  template: `
    <div class="app">
      <!-- Header with sidebar toggle -->
      <app-header (toggleSidebar)="toggleSidebar()"></app-header>
      
      <!-- Sidebar for list navigation -->
      <app-sidebar 
        [isOpen]="sidebarOpen" 
        (close)="closeSidebar()"
        (listSelected)="onListSelected($event)"
      ></app-sidebar>
      
      <!-- Main content area -->
      <main>
        <app-main [selectedListId]="selectedListId"></app-main>
      </main>
      
      <!-- Footer -->
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    main {
      flex: 1;
      padding: 1rem;
      padding-bottom: 5rem; /* Space for footer */
    }
  `]
})
export class AppComponent {
  title = 'todo-pwa';
  sidebarOpen = false;
  selectedListId: string | null = null;

  constructor(private listService: ListService) {}

  /**
   * Toggles the sidebar visibility state
   */
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  /**
   * Closes the sidebar
   */
  closeSidebar() {
    this.sidebarOpen = false;
  }

  /**
   * Handles list selection from the sidebar
   * @param listId - The ID of the selected list
   */
  onListSelected(listId: string) {
    this.selectedListId = listId;
    this.listService.selectList(listId);
    this.closeSidebar();
  }
}
