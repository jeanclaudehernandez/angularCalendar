import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { Reminder, Day, Month } from '@app/models/calendar';
import * as moment from 'moment';

@Component({
    selector: 'reminder-input',
    templateUrl: './reminder-input.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class ReminderInputComponent implements OnInit {
    @Input() month: number;

    constructor() {}

    openModal(modal: any) {
    }

    ngOnInit() {

    }
}