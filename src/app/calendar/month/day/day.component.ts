import { Component, OnInit, OnDestroy, Input, ViewChild, TemplateRef } from '@angular/core';
import { ReminderInputComponent } from './reminder-input/reminder-input.component';
import { Day } from '@app/models/calendar';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
    selector: 'app-day',
    templateUrl: './day.component.html',
    styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
    @Input() day: Day;
    @Input() inactive: boolean;
    @ViewChild('reminderInputDialog', {static: false}) template: TemplateRef<any>;

    dialogRef: any;

    constructor(private dialog: MatDialog) {}

    ngOnInit() {
        const reminderData = {
            description: 'mi reminder que tiene letras.',
            city: 'london',
            dateTime: '2020-9-' + this.day.day,
            color: '#3c1361'
        };
    }

    openDialog() {
        const config = new MatDialogConfig();
        config.minWidth = '400px';
        this.dialogRef = this.dialog.open(this.template, config);
    }

    addReminder(event: any) {
        this.day.addReminder(event);
    }
}
