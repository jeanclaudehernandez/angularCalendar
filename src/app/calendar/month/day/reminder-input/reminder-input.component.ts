import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Reminder } from '@app/models/calendar';
import * as moment from 'moment';

@Component({
    selector: 'app-reminder-input',
    templateUrl: './reminder-input.component.html',
    styleUrls: ['./reminder-input.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ReminderInputComponent implements OnInit {
    @Input() date: Date;
    @Output() submitReminder = new EventEmitter();
    dateString = '';
    color = new FormControl('');
    reminder = new FormControl('');
    city = new FormControl('');
    hour = '00:00';
    errorMessage = '';


    constructor() {}

    ngOnInit() {
        this.dateString = moment(this.date).format('YYYY MMMM DD');
    }

    updateTime(event: any) {
        this.hour = event;
    }

    submit() {
        this.errorMessage = '';
        const date = moment(this.date).format('YYYY-MM-DD');
        try {
            const reminder = new Reminder(this.reminder.value, `${date}T${this.hour}`,
                this.city.value, this.color.value);
            this.submitReminder.emit({
                description: this.reminder.value,
                dateTime: `${date}T${this.hour}`,
                city: this.city.value,
                color: this.color.value
            });
        } catch (error) {
            this.errorMessage = error.message;
        }
    }
}
