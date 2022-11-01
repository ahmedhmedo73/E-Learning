import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.scss'],
})
export class AdminPagesComponent implements OnInit {
  path: string = '';
  constructor(private router: Router) {
    this.path = this.router.url;
    this.router.events.subscribe((val: any) => {
      this.path = val.url;
    });
  }
  ngOnInit(): void {}
  signOut() {
    this.router.navigate(['/login']);
  }
}
