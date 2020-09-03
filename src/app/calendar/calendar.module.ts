import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { CalendarComponent } from './calendar.component';
import { MonthComponent } from './month/month.component';
import { DayComponent } from './month/day/day.component';
import { ReminderComponent } from './month/day/reminder/reminder.component';
import { ReminderInputComponent } from './month/day/reminder-input/reminder-input.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';  
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    ColorPickerModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    CalendarComponent,
    MonthComponent,
    DayComponent,
    ReminderComponent,
    ReminderInputComponent
  ],
  exports: [
    CalendarComponent,
    NgxMaterialTimepickerModule,
    ColorPickerModule
  ]
})
export class CalendarModule {}
