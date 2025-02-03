import { GetAlarmResponse } from './type';

export const fetchGetAlarmList = async () => {
  const res = await fetch('/api/alram');

  const jsonData = (await res.json()) as GetAlarmResponse;
  return jsonData;
};
