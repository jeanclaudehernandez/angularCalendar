import * as helper from './helper';

describe('helper functions', () => {

    describe('get calendar string', () => {
        it('should get correct calendar string from date object', () => {
            const date = new Date('2020-05-02');
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            expect(helper.getCalendarString(year, month)).toBe('2020-May');
        });
    });

    describe('monthString', () => {
        it('should correctly concat both strings', () => {
            const [year, month] = [2020, 12];
            expect(helper.monthString(year, month)).toEqual('2020-12');
        });

        it('should prepend 0 to months lower than 10', () => {
            const [year, month] = [2020, 9];
            expect(helper.monthString(year, month)).toEqual('2020-09');
        })
    });

    describe('addMonth', () => {
        it('should add month', () => {
            const month = 3;
            const year = 2020;
            const result = helper.addMonth(year, month);
            expect(result).toEqual({year: 2020, month: 4});
        });

        it('should correcty handle december', () => {
            const month = 12;
            const year = 2020;
            const result = helper.addMonth(year, month);
            expect(result).toEqual({year: 2021, month: 1});
        });
    });

    describe('subtractMonth', () => {
        it('should subtract month', () => {
            const month = 11;
            const year = 2020;
            const result = helper.subtractMonth(year, month);
            expect(result).toEqual({year: 2020, month: 10});
        });

        it('should correctly handle january', () => {
            const month = 1;
            const year = 2020;
            const result = helper.subtractMonth(year, month);
            expect(result).toEqual({year: 2019, month: 12});
        });
    });

    describe('emonth', () => {
        it('emonth should return month prepend with 0 when month is lower than 10', () => {
            expect(String(helper.emonth(9))).toBe('09');
        });

        it('emonth should return month when is higher or equal to 10', () => {
            expect(String(helper.emonth(11))).toBe('11');
        });
    });
});
