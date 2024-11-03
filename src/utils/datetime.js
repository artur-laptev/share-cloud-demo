import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';
import quarterOfYear from 'dayjs/plugin/quarterOfYear'

dayjs.extend(updateLocale);
dayjs.extend(isoWeek);
dayjs.extend(isBetween);
dayjs.extend(quarterOfYear)
dayjs.updateLocale('en', {
  weekStart: 1,
});

const FORMAT_DATE = 'DD.MM.YYYY';

export const getLocalDate = (date) => dayjs(date).format(FORMAT_DATE);

export { dayjs }