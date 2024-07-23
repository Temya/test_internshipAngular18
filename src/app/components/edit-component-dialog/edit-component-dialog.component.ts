import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-edit-component-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit-component-dialog.component.html',
  styleUrl: './edit-component-dialog.component.scss',
})
export class EditComponentDialogComponent {
  public editToDoText = new FormControl('');

  readonly data = inject<string>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<EditComponentDialogComponent>);

  constructor(private readonly service: BackendService) {
    this.editToDoText.setValue(this.data);
  }

  public saveEditToDo() {
    this.dialogRef.close(this.editToDoText.value);
  }
}
