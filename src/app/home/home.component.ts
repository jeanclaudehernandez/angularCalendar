import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentDate: Date;
  dateString: string;
  isLoading = false;

  constructor() { }

  ngOnInit() {
    this.isLoading = true;
    this.currentDate = new Date();
  }
}

