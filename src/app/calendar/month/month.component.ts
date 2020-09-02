import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Reminder, Day, Month, Weather } from '@app/models/calendar';
import * as moment from 'moment';

@Component({
    selector: 'app-month',
    templateUrl: './month.component.html',
    styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {
    @Input() month: number;
    @Input() year: number;
    @Input() day: number;
    calendarMonth: Month;
    weeks: Day[][];
    weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thrusday', 'Friday', 'Saturday'];

    constructor() {}

    ngOnInit() {
        this.calendarMonth = new Month(this.year, this.month);
        this.weeks = this.calendarMonth.getWeeks();
    }

}
