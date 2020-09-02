import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

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
    this.dateString = moment(this.currentDate).format('MMMM YYYY');

  }
}

