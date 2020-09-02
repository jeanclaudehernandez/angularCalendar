import { Component, OnInit, OnDestroy, Input, TemplateRef, ViewChild} from '@angular/core';
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
    @ViewChild('dialog', {static: false}) template: TemplateRef<any>;
    dateString: string;
    hourString: string;

    constructor(private dialog: MatDialog) {}

    ngOnInit() {
        this.reminder.getWeather();
    }

    openDialog() {
        const dialogConfig = new MatDialogConfig();
        this.dateString = moment(this.reminder.dateTime).format('YYYY-MM-DD');
        this.hourString = moment(this.reminder.dateTime).format('HH:mm');
        this.dialog.open(this.template);
    }
}
