import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  stats: any = [
    {
      date: '19/07/2022',
      total: 25,
      success: 11,
      fail: 9,
    },
    {
      date: '19/07/2022',
      total: 25,
      success: 11,
      fail: 9,
    },
    {
      date: '19/07/2022',
      total: 25,
      success: 11,
      fail: 9,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
