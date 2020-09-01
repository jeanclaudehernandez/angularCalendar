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
