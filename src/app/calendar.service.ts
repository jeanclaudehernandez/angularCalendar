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
    const monthId = monthString(year, month);
    if (!this.calendar.months[monthId]) {
        this.calendar.addMonth(year, month);
    }
    this.currentMonth = this.calendar.months[monthId];
  }

  getCurrentMonth() {
    return this.currentMonth;
  }
}
