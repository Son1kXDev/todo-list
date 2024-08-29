import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ManyTodoResponse, SingleTodoResponse } from '../models/todo';
import { Observable, retry, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  http: HttpClient = inject(HttpClient);
  baseUrl: string = 'https://dummyjson.com/todos/';

  todos: ManyTodoResponse = {
    todos: [],
    total: 0,
    skip: 0,
    limit: 0,
  };

  getAll(): Observable<ManyTodoResponse> {
    return this.http.get<ManyTodoResponse>(this.baseUrl).pipe(
      retry(2),
      tap((todos) => (this.todos = todos)),
    );
  }

  deleteById(id: number): Observable<SingleTodoResponse> {
    return this.http
      .delete<SingleTodoResponse>(this.baseUrl + id)
      .pipe(
        tap(
          (todo) =>
            (this.todos.todos = [
              ...this.todos.todos.filter((t) => t.id !== todo.id),
            ]),
        ),
      );
  }

  edit(
    id: number,
    todo: Omit<SingleTodoResponse, 'userId' | 'id'>,
  ): Observable<SingleTodoResponse> {
    return this.http
      .patch<SingleTodoResponse>(this.baseUrl + id, todo)
      .pipe(
        tap(
          (todo) =>
            (this.todos.todos = this.todos.todos.map((t) =>
              t.id !== todo.id ? t : todo,
            )),
        ),
      );
  }

  create(todo: Omit<SingleTodoResponse, 'id'>): Observable<SingleTodoResponse> {
    return this.http
      .post<SingleTodoResponse>(this.baseUrl + 'add', todo)
      .pipe(tap((todo) => this.todos?.todos.push(todo)));
  }
}
