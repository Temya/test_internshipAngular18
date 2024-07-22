import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegNewUser } from '../interface/reg-new-user';
import { ToDos } from '../interface/to-dos';
import { ToDosParams } from '../interface/to-dos-params';
import { Userdata } from '../interface/userdata';
import { Userparams } from '../interface/userparams';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  
  public userId = 13;
  public userData?: Userdata;

  constructor(private readonly http: HttpClient) { }

  public getUsers$(): Observable<Userparams> {
    const url = "https://dummyjson.com/users?limit=10&skip=10&select=username,password";
    return this.http.get<Userparams>(url)
  }

  public checkAuth$(username: string, password: string) : Observable<Userdata> {
    const url = `https://dummyjson.com/auth/login`;
    return this.http.post<Userdata>(url, {username, password});    
  }

  public isAuth(): boolean {
    console.log(this.userData);
    if(this.userData)
    {
      return true;
    }
    return false;
  }

  // public verifiAuth$(): Observable<> {
  //   const url = "";
  //   return this.http.get<>()
  // }

  public regNewUser$(body: RegNewUser) : Observable<Userparams> {
    const url = 'https://dummyjson.com/users/add';
    return this.http.post<Userparams>(url, body);
  }

  public getToDos$(): Observable<ToDosParams> {
    const url = "https://dummyjson.com/todos";
    return this.http.get<ToDosParams>(url);
  }

  public getToDosUser$() : Observable<ToDosParams> {
    const url = `https://dummyjson.com/todos/user/${this.userId}`;
    return this.http.get<ToDosParams>(url);
  }

  public deleteToDo$(toDoId: number) : Observable<ToDosParams> {
    const url = `https://dummyjson.com/todos/${toDoId}`;
    return this.http.delete<ToDosParams>(url);
  }

  public addToDo$(body: ToDos) : Observable<ToDosParams> {
    const url = "https://dummyjson.com/todos/add";
    return this.http.post<ToDosParams>(url, body);
  }

  public editToDo$(todo: string, id: number) : Observable<ToDosParams> {
    const url = `https://dummyjson.com/todos/${id}`;
    return this.http.put<ToDosParams>(url, {todo});
  }
}
