import * as moment from 'moment';

export class Remainder {
    description: string;
    dateTime: Date;
    city: string;
    color: string;

    constructor(description: string, dateTime: Date, city: string, color: string) {
        if (description.length > 30) {
            throw new Error('Remainder length has to be lower than 30.');
        }
        try {
            const date = new Date(dateTime);
        } catch {
            throw new Error('Date and Time must be valid.');
        }
        if (city.length < 1) {
            throw new Error ('Field City cannot be empty.');
        }
        if (color === undefined) {
            throw new Error ('Field Color cannot be empty.');
        }
        this.description = description;
        this.dateTime = dateTime;
        this.city = city;
        this.color = color;
    }
}

export class Day {
    remainders: Remainder[];
    day: number;
    weather: string;
    constructor(day: number) {
        this.day = day;
    }

}

export class Month {
    days: Day[];
    year: number;
    month: number;

    constructor(year: number, month: number) {
        if (!(typeof year === 'number' && year < 0)) {
            throw new Error ('Year must be a number and higher than 0.');
        }
        if (!(typeof month === 'number' && month >= 1 && month <= 12)) {
            throw new Error ('Month must be a number and between 1 and 12 inclusive.');
        }
        this.days = [];
        for (let i = 1; i <= moment(`${year}  ${month}`, 'YYYY-MM').daysInMonth(); i++) {
            this.days.push(new Day(i));
        }

    }
}