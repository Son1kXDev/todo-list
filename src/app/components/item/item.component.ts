import { Component, inject, Input } from '@angular/core';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { SingleTodoResponse } from '../../models/todo';
import { NgStyle } from '@angular/common';
import { ToDoService } from '../../services/todo.service';
import { ModalService } from '../../services/modal.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CheckboxComponent, NgStyle, RouterLink],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  @Input() todo: SingleTodoResponse;
  @Input() length: number;

  todoService: ToDoService = inject(ToDoService);
  modalService: ModalService = inject(ModalService);
  router: Router = inject(Router);

  deleteThis() {
    this.todoService.deleteById(this.todo.id).subscribe();
  }

  editThis() {
    this.modalService.open('Edit note');
    this.router.navigate(['/'], { queryParams: { id: this.todo.id } });
  }
}
