import { Component, OnInit, Input } from '@angular/core';
import { Month, Calendar } from '../models/calendar';
import { monthString, addMonth, subtractMonth } from '../lib/helper';
import { CalendarService } from '../calendar.service';
import * as moment from 'moment';


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
    currentDay: number;
    calendar: Calendar;
    months: Month[];
    @Input()currentDate: Date;

    constructor(private calendarService: CalendarService) {}

    ngOnInit() {
        this.calendar = this.calendarService.calendar;
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth() + 1;
        this.calendarService.setCurrentMonth(year, month);
    }

    changeMonth(year: number, month: number) {
        this.calendarService.setCurrentMonth(year, month);
    }

    nextMonth() {
        const {year, month} = addMonth(this.calendarService.currentMonth.year, this.calendarService.currentMonth.month);
        this.changeMonth(year, month);
    }

    previousMonth() {
        const {year, month} = subtractMonth(
            this.calendarService.currentMonth.year,
            this.calendarService.currentMonth.month
        );
        this.changeMonth(year, month);
    }

    get dateString() {
        return moment(new Date(monthString(this.calendarService.currentMonth.year,
             this.calendarService.currentMonth.month + 1))).format('YYYY-MMMM');
    }
}
