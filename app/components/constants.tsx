export interface JobGroupLabelTypes {
  [key: string]: string;
  PLANNING: string;
  DESIGN: string;
  DEVELOP: string;
}

export const JOB_GROUP_LABELS: JobGroupLabelTypes = {
  PLANNING: '기획',
  DESIGN: '디자인',
  DEVELOP: '개발',
  ALL: '전체',
};
