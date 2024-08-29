import { Component, inject, Input, OnInit } from '@angular/core';
import { ToDoService } from '../../services/todo.service';
import { ModalService } from '../../services/modal.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css',
})
export class EditTodoComponent implements OnInit {
  @Input() content: string = '';
  @Input() id: number = 0;

  todoService: ToDoService = inject(ToDoService);
  modalService: ModalService = inject(ModalService);

  form = new FormGroup({
    content: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  submit() {
    this.todoService
      .edit(this.id, {
        todo: this.form.value.content as string,
        completed: false,
      })
      .subscribe(() => this.modalService.close());
  }

  ngOnInit(): void {}
}
