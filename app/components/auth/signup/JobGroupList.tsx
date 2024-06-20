'use client';

import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import React from 'react';
import styled from 'styled-components';
import ButtonComp from '../../common/ButtomComp';

interface JobGroupListProps {
  jobGroup: JOB_GROUP_TYPES | undefined;
  onClick: (jopGrop: JOB_GROUP_TYPES) => void;
}

const ContainerUl = styled.ul`
  width: 318px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 16px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    width: 224px;
  }
`;

const JobGroupButton = styled(ButtonComp.Solid)`
  width: 100%;
  height: 40px;
  border-radius: 12px !important;
  padding: 11px 0;
`;

const jobList: { id: number; text: string; value: JOB_GROUP_TYPES }[] = [
  {
    id: 1,
    text: '기획',
    value: 'PLANNING',
  },
  {
    id: 2,
    text: '디자인',
    value: 'DESIGN',
  },
  {
    id: 3,
    text: '개발',
    value: 'DEVELOP',
  },
];

const JobGroupList = ({ jobGroup, onClick }: JobGroupListProps) => {
  return (
    <ContainerUl>
      {jobList.map((job) => (
        <li key={`li-${job.id}`}>
          <JobGroupButton
            text={job.text}
            isActive={jobGroup === job.value}
            onClick={() => onClick(job.value)}
            hoverEffect={false}
            focusEffect={false}
          />
        </li>
      ))}
    </ContainerUl>
  );
};

export default React.memo(JobGroupList);
