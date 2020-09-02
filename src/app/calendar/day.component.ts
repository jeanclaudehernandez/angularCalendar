import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { Reminder, Day, Month } from '@app/models/calendar';
import * as moment from 'moment';
import { ReminderInputComponent } from './reminder-input/reminder-input.component';
import { ReminderComponent } from './reminder.component';

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