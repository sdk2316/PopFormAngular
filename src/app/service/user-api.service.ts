import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private BaseUrl = "http://localhost:4200/api/";

  constructor(private _httpService: HttpClient) { }

  getUsers() {

    return this._httpService.get(this.BaseUrl + "users")
  }

  getSingleUsers(userId: number) {

    return this._httpService.get(`${this.BaseUrl}users/${userId}`)
  }

  addUser(user:User){
    return this._httpService.post(`${this.BaseUrl}users`,user);

  }


  updateUser(user:User){
    return this._httpService.put(`${this.BaseUrl}users/${user.id}`,user);

  }

 deleteUser(userId: number){
    return this._httpService.delete(`${this.BaseUrl}users/${userId}`);

  }
}
