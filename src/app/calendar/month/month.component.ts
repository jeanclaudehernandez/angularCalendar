import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Reminder, Month, Day } from '@app/models/calendar';

@Component({
    selector: 'app-month',
    templateUrl: './month.component.html',
    styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit, OnChanges {
    @Input() month: Month;
    @Output() moveReminder = new EventEmitter();
    weeks: Day[][];
    weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thrusday', 'Friday', 'Saturday'];

    constructor() {}

    ngOnChanges(change: any) {
        this.weeks = change.month.currentValue.getWeeks();
    }

    ngOnInit() {
    }

    onMoveReminder(event: Reminder) {
        this.moveReminder.emit(event);
    }

}
