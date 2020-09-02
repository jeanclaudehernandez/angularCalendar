import { Component, OnInit, OnDestroy, Input } from '@angular/core';


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
    currentYear: number;
    currentMonth: number;
    currentDay: number;
    @Input()currentDate: Date;

    constructor() {}

    ngOnInit() {
        this.currentYear = this.currentDate.getFullYear();
        this.currentMonth = this.currentDate.getMonth() + 1;
        this.currentDay = this.currentDate.getDate();
    }
}
