import { useState, useMemo } from 'react';

import { dayjs } from '@/utils/datetime';

const QUARTERS = [
  { id: 1, name: 'Q1', months: [{ index: 1, name: 'January'}, { index: 2, name: 'February'}, { index: 3, name: 'March' }] },
  { id: 2, name: 'Q2', months: [{ index: 4, name: 'April' }, { index: 5, name: 'May' }, { index: 6, name: 'June' }] },
  { id: 3, name: 'Q3', months: [{ index: 7, name: 'July' }, { index: 8, name: 'August' }, { index: 9, name: 'September' }] },
  { id: 4, name: 'Q4', months: [{ index: 10, name: 'October' }, { index: 11, name: 'November' }, { index: 12, name: 'December' }] },
];

const getWeeks = (year, month) => {
  const now = dayjs();
  const startDay = dayjs(`${year}-${month}`).startOf('month').startOf('isoWeek');
  const endDay = dayjs(`${year}-${month}`).endOf('month').endOf('isoWeek');

  const weeksCount = (endDay.diff(startDay, 'days') + 1) / 7;

  const weeks = [];
  let startDate = startDay;

  for (let i = 1; i <= weeksCount; i++) {
    const startWeek = startDate.clone();
    const endWeek = startWeek.add(6, 'days');

    weeks.push({
      nw: startWeek.isoWeek(),
      startDate: startWeek.format('YYYY-MM-DD'),
      endDate: endWeek.format('YYYY-MM-DD'),
      isDateWeek: (start, end) => startWeek.isBetween(dayjs(start), dayjs(end), 'day', '[]')
        || endWeek.isBetween(dayjs(start), dayjs(end), 'day', '[]')
        || dayjs(start).isBetween(startWeek, endWeek, 'day', '[]')
        || dayjs(end).isBetween(startWeek, endWeek, 'day', '[]'),
      isLast: i === weeksCount,
      isCurrent: now.isBetween(startWeek, endWeek, 'day', '[]'),
    });

    startDate = startWeek.add(7, 'days');
  }

  return weeks;
};

export default function useCalendarDate() {
  const now = dayjs();

  const [selectedYear, setSelectedYear] = useState(now.year())
  const [selectedQuarter, setSelectedQuarter] = useState(now.quarter())

  const currentQuarter = QUARTERS[selectedQuarter - 1];

  const currentQuarterMonths = useMemo(() => {
    const length = currentQuarter.months.length;

    return currentQuarter.months.map((month, index) => {
      const weeks = getWeeks(selectedYear, month.index);

      return {
        ...month,
        isLast: index === length - 1,
        weeks: getWeeks(selectedYear, month.index),
        lastWeek: weeks[weeks.length - 1],
      }
    });
  }, [currentQuarter, selectedYear]);

  const setPrevQuarter = () => {
    if (selectedQuarter <= 1) {
      setSelectedQuarter(QUARTERS.length);
      setSelectedYear(selectedYear-1);
      return
    }

    setSelectedQuarter(selectedQuarter-1);
  };

  const setNextQuarter = () => {
    if (selectedQuarter >= QUARTERS.length) {
      setSelectedQuarter(1);
      setSelectedYear(selectedYear+1);
      return
    }

    setSelectedQuarter(selectedQuarter+1);
  };

  const setToday = () => {
    const now = dayjs();

    setSelectedYear(now.year());
    setSelectedQuarter(now.quarter());
  };

  const setDate = (date) => {
    const selectedDate = dayjs(date);

    setSelectedYear(selectedDate.year());
    setSelectedQuarter(selectedDate.quarter());
  };

  return {
    currentQuarter,
    currentQuarterMonths,
    currentYear: selectedYear,
    setPrevQuarter,
    setNextQuarter,
    setToday,
    setDate,
  };
}