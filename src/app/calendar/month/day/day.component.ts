import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Day, Reminder } from '@app/models/calendar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
    selector: 'app-day',
    templateUrl: './day.component.html',
    styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
    @Input() day: Day;
    @Input() inactive: boolean;
    @Output() moveReminder = new EventEmitter();
    @ViewChild('reminderInputDialog', {static: false}) template: TemplateRef<any>;
    dialogRef: any;
    isEditing = false;
    currentReminder: Reminder;
    currentReminderIndex: number;

    constructor(private dialog: MatDialog) {}

    ngOnInit() {
        const reminderData = {
            description: 'mi reminder que tiene letras.',
            city: 'london',
            dateTime: '2020-09-' + '0' + this.day.day + 'T20:01',
            color: '#3c1361'
        };
        if (this.day.day === 4) {
            this.day.addReminder(reminderData);
        }
    }

    openDialog() {
        const config = new MatDialogConfig();
        config.minWidth = '400px';
        this.dialogRef = this.dialog.open(this.template, config);
        this.dialogRef.beforeClosed().subscribe(() => {
            this.isEditing = false;
        });
    }

    addReminder(event: any) {
        if (this.isEditing) {
            this.removeReminder(this.currentReminderIndex);
            this.moveReminder.emit(new Reminder(event.description, event.dateTime, event.city, event.color));
        } else {
            this.day.addReminder(event);
            this.day.sortReminders();
        }
        if (this.dialogRef) {
            this.dialogRef.close();
        }
    }

    editReminder(index: number) {
        this.isEditing = true;
        this.currentReminder = this.day.reminders[index];
        this.currentReminderIndex = index;
        this.openDialog();
    }

    removeReminder(index: number) {
        this.day.deleteReminder(index);
    }

}
