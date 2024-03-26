import dayjs from 'dayjs';
export const cutText = (text: string, length: number, replace: string): string => {
  return text.length > length ? text.substring(0, length) + replace : text;
};

export const dateText = (date: Date): string => {
  const cur = new Date();
  const diff = Math.trunc((cur.getTime() - date.getTime()) / 1000 / 60); // 분단위

  if (diff < 60) {
    return diff + '분 전';
  } else if (diff < 60 * 24) {
    return Math.trunc(diff / 60) + '시간 전';
  } else if (diff <= 60 * 24 * 7) {
    return Math.trunc(diff / 60 / 24) + '일 전';
  } else {
    return dayjs(date).format('YY/MM/DD');
  }
};
