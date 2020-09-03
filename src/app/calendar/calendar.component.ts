import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Month, Reminder, Calendar } from '../models/calendar';


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
    currentMonth: Month;
    currentDay: number;
    calendar: Calendar;
    months: Month[];
    @Input()currentDate: Date;

    constructor() {}

    ngOnInit() {
        this.calendar = new Calendar();
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth() + 1;
        this.calendar.addMonth(year, month);
        console.log(this.calendar.months);
        this.currentMonth = this.calendar.months[this.getMonthString(year, month)];
    }

    getMonthString(year: number, month: number) {
        const emonth = month < 10 ? '0' + month : month;
        return `${year}-${emonth}`;
    }

    onMoveReminder(event: Reminder) {
        this.calendar.placeReminder(event);
    }
}
