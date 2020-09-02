import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { Reminder, Day, Month } from '@app/models/calendar';
import * as moment from 'moment';
import { DayComponent } from './day.component';

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