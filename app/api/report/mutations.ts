import { useMutation } from '@tanstack/react-query';
import { fetchInsertPostReport } from './fetch';
import { InsertPostReportRequest } from './type';

export const useInsertPostReportMutation = () =>
  useMutation({ mutationFn: (body: InsertPostReportRequest) => fetchInsertPostReport(body) });
