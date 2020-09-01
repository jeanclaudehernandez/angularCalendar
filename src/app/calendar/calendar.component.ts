import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { Remainder, Day, Month } from '@app/models/calendar';
import * as moment from 'moment';

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

@Component({
    selector: 'app-month',
    template: `<table>
        <thead>
            <tr>
                <th></th>
            </tr>
        </thead>
    </table>`,
    styleUrls: ['./calendar.component.scss']
})
export class MonthComponent implements OnInit {
    @Input() month: number;

    constructor() {}

    ngOnInit() {

    }
}

@Component({
    selector: 'app-day',
    template: ``,
    styleUrls: ['./calendar.component.scss']
})
export class DayComponent implements OnInit {
    @Input() month: number;

    constructor() {}

    ngOnInit() {

    }
}
@Component({
    selector: 'app-remainder',
    template: 'aqui iria el html del remainder',
    styleUrls: ['./calendar.component.scss']
})
export class RemainderComponent implements OnInit {
    @Input() month: number;

    constructor() {}

    ngOnInit() {

    }
}
