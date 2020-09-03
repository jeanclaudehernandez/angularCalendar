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
    @Input() edit = false;
    @Input() editReminder: Reminder;
    @Output() submitReminder = new EventEmitter();
    dateString = '';
    color = new FormControl('');
    reminder = new FormControl('');
    city = new FormControl('');
    selectedDate: Date;
    hour = '00:00';
    errorMessage = '';


    constructor() {}

    ngOnInit() {
        this.dateString = moment(this.date).format('YYYY MMMM DD');
        if (this.edit) {
            this.city.setValue(this.editReminder.city);
            this.color.setValue(this.editReminder.color);
            this.reminder.setValue(this.editReminder.description);
            this.hour = moment(this.editReminder.dateTime).format('HH:mm');
            this.selectedDate = this.editReminder.dateTime;
        }
    }

    updateTime(event: any) {
        this.hour = event;
    }

    submit() {
        this.errorMessage = '';
        let date: string;
        if (this.edit) {
            date = moment(this.selectedDate).format('YYYY-MM-DD');
        } else {
            date = moment(this.date).format('YYYY-MM-DD');
        }
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
