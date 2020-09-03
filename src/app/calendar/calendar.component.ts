import { Component, OnInit, Input } from '@angular/core';
import { Month, Reminder, Calendar } from '../models/calendar';
import { monthString, addMonth, subtractMonth } from '../lib/helper';
import * as moment from 'moment';


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
        this.currentMonth = this.calendar.months[monthString(year, month)];
    }

    onMoveReminder(event: Reminder) {
        this.calendar.placeReminder(event);
    }

    nextMonth() {
        const {year, month} = addMonth(this.currentMonth.year, this.currentMonth.month);
        const monthId = monthString(year, month);
        if (!this.calendar.months[monthId]) {
            this.calendar.addMonth(year, month);
        }
        this.currentMonth = this.calendar.months[monthId];
    }

    previousMonth() {
        const {year, month} = subtractMonth(this.currentMonth.year, this.currentMonth.month);
        const monthId = monthString(year, month);
        if (!this.calendar.months[monthId]) {
            this.calendar.addMonth(year, month);
        }
        this.currentMonth = this.calendar.months[monthId];
    }

    get dateString() {
        return moment(new Date(monthString(this.currentMonth.year, this.currentMonth.month + 1))).format('YYYY-MMMM');
    }
}
