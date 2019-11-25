import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';
const USER_ID='UserId'
@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    if (!token) return;
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,  token);
  }

  public saveUserId(userId:string){
    if (!userId) return;
    window.localStorage.removeItem(USER_ID);
    window.localStorage.setItem(USER_ID, userId);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public getUserId(): string {
    return localStorage.getItem(USER_ID);
  }
}