import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isVisible$ = new BehaviorSubject<boolean>(false);
  title: string = '';
  router: Router = inject(Router);

  open(title: string) {
    this.title = title;
    this.isVisible$.next(true);
  }

  close() {
    this.isVisible$.next(false);
    this.router.navigate(['/'], { queryParams: {} });
  }
}
