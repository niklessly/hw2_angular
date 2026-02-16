import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoItem as TodoItemModel } from '../../types/todo.types';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.html',
  styleUrls: ['./todo-item.css']
})
export class TodoItemComponent {
  @Input() todo!: TodoItemModel;
  @Output() statusChange = new EventEmitter<{ id: string, status: string }>();
  @Output() delete = new EventEmitter<string>();
  @Output() restore = new EventEmitter<string>();
  @Output() edit = new EventEmitter<{ id: string, title: string }>();

  isEditing = false;
  editedTitle = '';

  startEdit(): void {
    this.isEditing = true;
    this.editedTitle = this.todo.title;
  }

  saveEdit(): void {
    if (this.editedTitle.trim()) {
      this.edit.emit({ id: this.todo.id, title: this.editedTitle.trim() });
      this.isEditing = false;
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedTitle = this.todo.title;
  }

  onStatusChange(status: string): void {
    this.statusChange.emit({ id: this.todo.id, status });
  }

  onDelete(): void {
    this.delete.emit(this.todo.id);
  }

  onRestore(): void {
    this.restore.emit(this.todo.id);
  }

  onArchive(): void {
    this.statusChange.emit({ id: this.todo.id, status: 'archived' });
  }
}