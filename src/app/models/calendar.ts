import * as moment from 'moment';
import getWeather from '../weatherApi';
import { parseForecast, MonthHead, MonthTail,
     weeksInMonth, chunkArrayInGroups, addMonth, subtractMonth, daysInMonth } from '../lib/helper';
import { stringLiteral } from '@babel/types';
import { monthString, emonth } from '../lib/helper';

export class Weather {
    maxTemp: number;
    minTemp: number;
    humidity: number;
    condition: string;
    conditionIcon: string;
    chanceOfRain: number;

    constructor(data: any) {
        this.maxTemp = data.maxtemp_c;
        this.minTemp = data.mintemp_c;
        this.condition = data.condition.text;
        this.conditionIcon = data.condition.icon;
        this.humidity = data.avghumidity;
        this.chanceOfRain = data.daily_chance_of_rain;
    }
}

export class Reminder {
    description: string;
    dateTime: Date;
    city: string;
    color: string;
    weather: Weather;

    constructor(description: string, dateTime: string, city: string, color: string) {
        const validationError = this.getValidationError(description, dateTime, city, color);
        if (validationError) {
            throw Error(validationError);
        }
        this.description = description;
        this.dateTime = new Date(dateTime);
        this.city = city;
        this.color = color;
    }

    getValidationError(description: string, dateTime: string, city: string, color: string): string {
        if (description.length > 30) {
            return 'Reminder length has to be lower than 30.';
        }
        if (description.length < 1) {
            return 'Reminder cannot be empty.';
        }
        const date = new Date(dateTime);
        if (date.toDateString() === 'Invalid Date') {
           return 'Date and Time must be valid.';
        }
        if (city.length < 1) {
           return 'Field City cannot be empty.';
        }
        if (color === undefined || color === '') {
            return 'Field Color cannot be empty.';
        }
        return '';
    }

    getWeather(): Promise<void | Weather> {
        return getWeather(this.city, this.dateTime).then((response) => {
            const forecast = parseForecast(this.dateTime, response).day;
            this.weather = new Weather(forecast);
        });
    }

}

export class Day {
    reminders: Reminder[];
    day: number;
    date: Date;

    constructor(day: number, date: string) {
        this.day = day;
        this.reminders = [];
        this.date = new Date(date);
        if (this.date.toDateString() === 'Invalid Date') {
            throw Error('Date and Time must be valid.');
        }
    }

    addReminder(data: any): void {
        this.reminders.push(new Reminder(data.description, data.dateTime, data.city, data.color));
    }

    sortReminders(): void {
        const compareReminders = (r1: Reminder, r2: Reminder) => {
            const time1 = r1.dateTime.getTime();
            const time2 = r2.dateTime.getTime();
            return time1 >= time2 ? 1 : -1;
        };
        this.reminders.sort(compareReminders);
    }

    deleteReminder(index: number): void {
        if (this.reminders.length > index) {
            this.reminders.splice(index, 1);
        } else {
            throw Error(`Index ${index} does not exist in reminders`);
        }
    }

    deleteAllReminders(): void {
        this.reminders = [];
    }

}

export class Month {
    days: Day[];
    year: number;
    month: number;
    head: Day[];
    tail: Day[];
    weekCount: number;

    constructor(year: number, month: number) {
        if (!(typeof year === 'number' || year > 0)) {
            throw Error ('Year must be a number and higher than 0.');
        }
        if (!(typeof month === 'number') || (month < 1 || month > 12)) {
            throw Error ('Month must be a number and between 1 and 12 inclusive.');
        }
        this.year = year;
        this.month = month;
        this.days = [];
        for (let i = 1; i <= moment(`${year}  ${month}`, 'YYYY-MM').daysInMonth(); i++) {
            this.days.push(new Day(i, `${year}-${month}-${i}`));
        }
        this.weekCount = weeksInMonth(new Date(`${year}-${emonth(month)}-01`));
        const {year: nextYear, month: nextMonth} = addMonth(year, month);
        this.tail = MonthTail(year, month)
            .map((day: number) => new Day(day, `${monthString(nextYear, nextMonth)}-${day}`));
        const {year: previousYear, month: previousMonth} = subtractMonth(year, month);
        this.head = MonthHead(year, month)
            .map((day: number) => new Day(day, `${monthString(previousMonth, previousMonth)}-${day}`));

    }

    getWeeks() {
        const allDays = this.head.concat(this.days.concat(this.tail));
        return chunkArrayInGroups(allDays, 7);
    }

    placeReminder(reminder: Reminder) {
        const day = this.days[reminder.dateTime.getDate() - 1];
        day.addReminder(reminder);
        day.sortReminders();
    }
}

export class Calendar {
    months: any;
    constructor() {
        this.months = {};
    }

    addMonth(year: number, month: number) {
        this.months[monthString(year, month)] = new Month(year, month);
    }

    placeReminder(reminder: Reminder) {
        const month = reminder.dateTime.getMonth() + 1;
        const year = reminder.dateTime.getFullYear();
        const monthId = monthString(year, month);
        if (!this.months[monthId]) {
            this.addMonth(year, month);
        }
        this.getMonth(year, month).placeReminder(reminder);
    }

    getMonth(year: number, month: number) {
        return this.months[monthString(year, month)];
    }
}
