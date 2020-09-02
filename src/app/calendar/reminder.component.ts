import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { Reminder, Day, Month } from '@app/models/calendar';
import * as moment from 'moment';

@Component({
    selector: 'app-reminder',
    template: 'aqui iria el html del reminder',
    styleUrls: ['./calendar.component.scss']
})
export class ReminderComponent implements OnInit {
    @Input() month: number;

    constructor() {}

    ngOnInit() {

    }
}
