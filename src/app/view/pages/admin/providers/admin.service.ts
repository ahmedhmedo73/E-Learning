import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  currentUser = new BehaviorSubject(null);
  isLogin: boolean | undefined;

  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  AddVideo(formData: any) {
    return this._HttpClient.post(
      'https://localhost:7189/VidAdmin/uploadvideo',
      formData
    );
  }

  GetVideo(section: string) {
    return this._HttpClient.get(
      'https://localhost:7189/Section/GitVideo?name=' + section
    );
  }

  AddQuistion(formData: any) {
    return this._HttpClient.post(
      'https://localhost:7189/Question/SetQuestion',
      formData
    );
  }

  DeleteVideo(id: number) {
    return this._HttpClient.delete(
      'https://localhost:7189/VidAdmin/Deletevid?id=' + id
    );
  }
}
