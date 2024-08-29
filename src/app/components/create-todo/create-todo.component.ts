import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FocusDirective } from '../../directives/focus.directive';
import { ToDoService } from '../../services/todo.service';
import { ModalService } from '../../services/modal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [ReactiveFormsModule, FocusDirective],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.css',
})
export class CreateTodoComponent implements OnInit {
  @Input() length: number = 0;

  id?: string | null;
  content: string = '';

  todoService: ToDoService = inject(ToDoService);
  modalService: ModalService = inject(ModalService);
  route = inject(ActivatedRoute);

  form = new FormGroup({
    content: new FormControl<string>(this.content, [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  submit() {
    if (this.id) {
      this.todoService
        .edit(parseInt(this.id), {
          todo: this.form.value.content as string,
          completed: false,
        })
        .subscribe(() => this.modalService.close());
    } else {
      this.todoService
        .create({
          todo: this.form.value.content as string,
          completed: false,
          userId: 1,
        })
        .subscribe(() => this.modalService.close());
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams.id;
    this.content = this.todoService.todos.todos.find(
      (todo) => todo.id === parseInt(this.id!),
    )?.todo!;
    this.form.patchValue({ content: this.content });
  }
}
