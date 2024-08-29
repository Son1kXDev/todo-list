import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemComponent } from './components/item/item.component';
import { ToDoService } from './services/todo.service';
import { AsyncPipe, NgForOf, NgIf, NgStyle } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { FocusDirective } from './directives/focus.directive';
import { ModalService } from './services/modal.service';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ItemComponent,
    NgForOf,
    NgStyle,
    ModalComponent,
    CreateTodoComponent,
    FocusDirective,
    NgIf,
    AsyncPipe,
    EditTodoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  modalService: ModalService = inject(ModalService);
  todoService: ToDoService = inject(ToDoService);

  ngOnInit(): void {
    this.todoService?.getAll()?.subscribe();
  }

  addTodo() {
    this.modalService.open('new note');
  }
}
