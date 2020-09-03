import * as moment from 'moment';

export const weeksInMonth = (date: Date) => {
    const month = moment(date).month();
    const year = moment(date).year();
    const extraDays = MonthHead(year, month).concat(MonthTail(year, month)).length;
    return 4 + (!extraDays ? 0 : (extraDays <= 7 ? 1 : 2));
};

export const MonthTail = (year: number, month: number) => {
    const lastOfMonth = new Date(year, month, 0);
    const diff =  6 - lastOfMonth.getDay();
    const days = [];
    for (let i = 1; i <= diff; i++) {
        days.push(i);
    }
    return days;
};

export const MonthHead = (year: number, month: number) => {

    const firstOfMonth = new Date(year, month - 1, 1);
    const diff = firstOfMonth.getDay();
    const lastofPreviousMonth = new Date(year, month - 1, 0).getDate();
    const days = [];
    for (let i = 0; i < diff; i++) {
        days.push(lastofPreviousMonth - i);
    }
    return days.sort();
};

export const parseForecast = (date: Date, data: any) => {
    const today = new Date();
    const diff = Math.ceil(((date.getTime() - today.getTime()) / (1000 * 3600 * 24)));
    if (diff >= 0) {
        return data.forecast.forecastday[diff];
    }
    return data.forecast.forecastday[0];
};

export const chunkArrayInGroups = (arr: any[], size: number ) => {
    const myArray = [];
    for (let i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i + size));
    }
    return myArray;
}

export const emonth = (month: number) => month < 10 ? '0' + month : month;

export const monthString = (year: number, month: number) => `${year}-${emonth(month)}`;

export const addMonth = (year: number, month: number) => {
    if (month === 12) {
        month = 1;
        year++;
    } else {
        month++;
    }
    return {year, month};
};

export const subtractMonth = (year: number, month: number) => {
    if (month === 1) {
        month = 12;
        year--;
    } else {
        month --;
    }
    return {year, month};
};

export const getCalendarString = (year: number, month: number) => {
    return moment(new Date(`${monthString(year, month)}-02`)).format('YYYY-MMMM');
};

export const daysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1 , 0).getDate();
};
