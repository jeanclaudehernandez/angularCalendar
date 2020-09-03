import { Injectable } from '@angular/core';
import { Calendar, Month } from './models/calendar';
import { monthString } from './lib/helper';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  calendar: Calendar;
  currentMonth: Month;
  constructor() {
    this.calendar = new Calendar();
  }

  setCurrentMonth(year: number, month: number) {
    if (!this.calendar.getMonth(year, month)) {
        this.calendar.addMonth(year, month);
    }
    this.currentMonth = this.calendar.getMonth(year, month);
  }

  getCurrentMonth() {
    return this.currentMonth;
  }
}
