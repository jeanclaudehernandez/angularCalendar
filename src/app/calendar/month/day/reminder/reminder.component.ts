import { Component, OnInit, OnDestroy, Input, TemplateRef, ViewChild, Output, EventEmitter} from '@angular/core';
import { Reminder } from '@app/models/calendar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
    selector: 'app-reminder',
    templateUrl: './reminder.component.html',
    styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
    @Input() reminder: Reminder;
    @Input() key: number;
    @ViewChild('dialog', {static: false}) template: TemplateRef<any>;
    @Output() editReminder = new EventEmitter();
    @Output() removeReminder = new EventEmitter();
    reminderDialog: any;
    weatherAvailable: boolean;
    dateString: string;
    hourString: string;

    constructor(private dialog: MatDialog) {}

    ngOnInit() {
        try {
            this.reminder.getWeather().then((res) => {
                this.weatherAvailable = true;
            });
        } catch (error) {
            this.weatherAvailable = false;
        }
    }

    openDialog() {
        const dialogConfig = new MatDialogConfig();
        this.dateString = moment(this.reminder.dateTime).format('YYYY-MM-DD');
        this.hourString = moment(this.reminder.dateTime).format('HH:mm');
        this.reminderDialog = this.dialog.open(this.template);
    }

    edit() {
        this.editReminder.emit(this.key);
        this.reminderDialog.close();
    }

    remove() {
        this.removeReminder.emit(this.key);
        this.reminderDialog.close();
    }
}
