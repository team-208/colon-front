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

const JobGroupButton = styled(ButtonComp.Basic)`
  width: 100%;
  height: 40px;
  border-radius: 12px;
`;

const JobGroupList = ({ jobGroup, onClick }: JobGroupListProps) => {
  return (
    <ContainerUl>
      <li>
        <JobGroupButton
          text="기획"
          isActive={jobGroup === 'PLANNING'}
          onClick={() => onClick('PLANNING')}
        />
      </li>
      <li>
        <JobGroupButton
          text="디자인"
          isActive={jobGroup === 'DESIGN'}
          onClick={() => onClick('DESIGN')}
        />
      </li>
      <li>
        <JobGroupButton
          text="개발"
          isActive={jobGroup === 'DEVELOP'}
          onClick={() => onClick('DEVELOP')}
        />
      </li>
    </ContainerUl>
  );
};

export default React.memo(JobGroupList);
