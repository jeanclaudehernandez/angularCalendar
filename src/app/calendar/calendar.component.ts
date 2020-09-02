import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { Reminder, Day, Month } from '@app/models/calendar';
import * as moment from 'moment';
import { MonthComponent } from './month.component';

@Component({
    selector: 'app-calendar',
    template: `
        <app-month month="currentMonth" year="currentYear" day="currentDay"/>
    `,
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
    currentYear: number;
    currentMonth: number;
    currentDay: number;

    constructor() {}

    ngOnInit() {

    }
}
