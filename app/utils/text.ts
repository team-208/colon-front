import dayjs from 'dayjs';
export const cutText = (text: string, length: number, replace: string): string => {
  return text.length > length ? text.substring(0, length) + replace : text;
};

export const dateText = (date: dayjs.Dayjs): string => {
  const cur = dayjs();
  const diff = Math.trunc(cur.diff(date, "minute"));

  if (diff > 60 * 24 * 7) {
    return dayjs(date).format('YY/MM/DD');
  }

  if (diff > 60 * 24) {
    return Math.trunc(diff / 60 / 24) + '일 전';
  }

  if (diff > 60) {
    return Math.trunc(diff / 60) + '시간 전';
  }

  return diff + '분 전';
};
