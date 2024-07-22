import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from "@angular/router";
import { BackendService } from '../../services/backend.service';
import { RegNewUser } from '../../interface/reg-new-user';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnDestroy{

  public formReg?: FormGroup;

  private readonly unSubscribe$$ = new Subject<void>();

  constructor(private readonly fb: FormBuilder, 
    private readonly router: Router, 
    private readonly service: BackendService,
    private readonly cdr: ChangeDetectorRef) {
      this.formReg = this.fb.group({
        login: this.fb.control("", Validators.required),
        password: this.fb.control("", Validators.required),
        confirmPass: this.fb.control("", Validators.required),
        email: this.fb.control("", Validators.required)
      });
    }

  public goLog() {
    this.router.navigateByUrl("");
  }

  public regNewUser(): void {
    if(this.formReg?.valid){
      if(this.formReg.get("password")?.value == this.formReg.get("confirmPass")?.value){
        const body = {
          username:   this.formReg.get("login")?.value,
          password: this.formReg.get("password")?.value,
          email: this.formReg.get("email")?.value
        }
        this.service.regNewUser$(body as RegNewUser)
        .pipe(takeUntil(this.unSubscribe$$))
        .subscribe((data) => {
          console.log(data);
          this.cdr.detectChanges();
        });
        console.log("Registration successful");
      }
      else{
        console.log("confirmPass");
      }
    }
    else{
      console.log("Form invalid")
    }
    this.cdr.detectChanges();
  }

  public ngOnDestroy(): void {
    this.unSubscribe$$.next();
    this.unSubscribe$$.complete();
  }
}
