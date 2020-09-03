import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reminder, Day, Month, Weather } from '@app/models/calendar';
import * as moment from 'moment';

@Component({
    selector: 'app-month',
    templateUrl: './month.component.html',
    styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {
    @Input() month: Month;
    @Output() moveReminder = new EventEmitter();
    weeks: Day[][];
    weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thrusday', 'Friday', 'Saturday'];

    constructor() {}

    ngOnInit() {
        this.weeks = this.month.getWeeks();
    }

    onMoveReminder(event: Reminder) {
        this.moveReminder.emit(event);
    }

}
