export type TodoStatus = 'active' | 'done' | 'deleted' | 'archived';

export interface TodoItem {
    id: string;
    title: string;
    status: TodoStatus;
}

export type TodoFilter = 'all' | 'active' | 'done' | 'deleted' | 'archived';