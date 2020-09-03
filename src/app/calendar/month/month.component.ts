import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reminder, Month } from '@app/models/calendar';

@Component({
    selector: 'app-month',
    templateUrl: './month.component.html',
    styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {
    @Input() month: Month;
    @Output() moveReminder = new EventEmitter();
    weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thrusday', 'Friday', 'Saturday'];

    constructor() {}

    get weeks() {
        return this.month.getWeeks();
    }

    ngOnInit() {
    }

    onMoveReminder(event: Reminder) {
        this.moveReminder.emit(event);
    }

}
