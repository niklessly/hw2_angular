import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoItemComponent } from './components/todo-item/todo-item';
import { TodoItem, TodoFilter } from './types/todo.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  todos: TodoItem[] = [];
  newTodoTitle = '';
  currentFilter: TodoFilter = 'all';

  get stats() {
    const all = this.todos.length;
    const active = this.todos.filter(t => t.status === 'active').length;
    const done = this.todos.filter(t => t.status === 'done').length;
    const deleted = this.todos.filter(t => t.status === 'deleted').length;

    return { all, active, done, deleted };
  }

  get filteredTodos() {
    switch (this.currentFilter) {
      case 'active':
        return this.todos.filter(t => t.status === 'active');
      case 'done':
        return this.todos.filter(t => t.status === 'done');
      case 'deleted':
        return this.todos.filter(t => t.status === 'deleted');
      default:
        return this.todos;
    }
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        title: this.newTodoTitle.trim(),
        status: 'active'
      };
      this.todos.push(newTodo);
      this.newTodoTitle = '';
    }
  }

  handleStatusChange(event: { id: string, status: string }) {
    const todo = this.todos.find(t => t.id === event.id);
    if (todo && todo.status !== 'deleted') {
      todo.status = event.status as any;
    }
  }

  handleDelete(id: string) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.status = 'deleted';
    }
  }

  handleRestore(id: string) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.status = 'active';
    }
  }

  setFilter(filter: TodoFilter) {
    this.currentFilter = filter;
  }
}