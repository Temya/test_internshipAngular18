import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';
import { ToDos } from '../../interface/to-dos';
import { BackendService } from '../../services/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { EditComponentDialogComponent } from '../edit-component-dialog/edit-component-dialog.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit, OnDestroy {
  public todos: ToDos[] = [];
  public secondToDos: ToDos[] = [];
  public toDoText = new FormControl('');
  public state = true;
  public num?: number;
  public editToDoInput?: ToDos;

  private readonly unSubscribe$$ = new Subject<void>();

  constructor(
    private readonly service: BackendService,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog
  ) {
    console.log(service.userId);
  }

  ngOnInit(): void {
    this.service
      .getToDosUser$()
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe(data => {
        console.log(data.todos);
        this.todos = data.todos;
        this.cdr.detectChanges();
      });

    this.service
      .getToDos$()
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe(data => {
        this.num = data.total;
      });
  }

  public deleteToDo(id: number) {
    this.service
      .deleteToDo$(id)
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe(data => {
        console.log(data);
      });
    this.todos = this.todos.filter(data => data.id != id);
    console.log(this.todos);
  }

  public addToDo() {
    const body = {
      id: this.num,
      todo: this.toDoText.value,
      completed: false,
      userId: this.service.userId,
    };
    this.service
      .addToDo$(body as ToDos)
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe(data => {
        console.log(data);
      });
    this.secondToDos.push(body as ToDos);
    this.toDoText.setValue('');
  }

  public editToDo(id: number) {
    this.editToDoInput = this.todos.find(data => data.id == id);
    const dialogReg = this.dialog.open(EditComponentDialogComponent, {
      data: this.editToDoInput?.todo,
    });

    dialogReg
      .afterClosed()
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe(result => {
        console.log(result);
        if (result) {
          this.service
            .editToDo$(result, this.editToDoInput?.id as number)
            .pipe(takeUntil(this.unSubscribe$$))
            .subscribe(data => {
              console.log(data);
            });
          this.todos.map(data => {
            if (data.id == this.editToDoInput?.id) {
              data.todo = result;
            }
          });
        }
      });
  }

  public ngOnDestroy(): void {
    this.unSubscribe$$.next();
    this.unSubscribe$$.complete();
  }
}
