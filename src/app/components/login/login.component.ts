import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from "@angular/router";
import { BackendService } from '../../services/backend.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {

  public formLogin?: FormGroup;

  private readonly unSubscribe$$ = new Subject<void>();

  constructor(private readonly fb: FormBuilder,
    private readonly router: Router, 
    private readonly service: BackendService,
    private readonly cdr: ChangeDetectorRef
  ) 
  {  
    this.formLogin = this.fb.group({
      login: this.fb.control("", Validators.required),
      password: this.fb.control("", Validators.required)
    });
  }

  public goReg() {
    this.router.navigateByUrl("registration");
  }

  public auth() {
    this.service.checkAuth$(this.formLogin?.get("login")?.value as string, this.formLogin?.get("password")?.value as string)
    .pipe(takeUntil(this.unSubscribe$$))
    .subscribe((data) => 
      {        
        if(data) 
        {      
          this.service.userData = data;
          localStorage.setItem("token", data.token);
          this.service.userId = data.id;    
          this.router.navigateByUrl("main");
        }
        else 
        {
          console.log("Invalid login or password");
        }
        this.cdr.detectChanges();       
      }
    )
  }

  public ngOnDestroy(): void {
    this.unSubscribe$$.next();
    this.unSubscribe$$.complete();
  }
}
