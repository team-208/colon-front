'use client';

import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import React from 'react';
import styled from 'styled-components';

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

const JobGroupButton = styled.button<{ $isActive: boolean }>`
  width: 100%;
  padding: 8px 16px;
  border-radius: 12px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.primary.normal : theme.color.palette.coolNeutral99};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.static.light : theme.color.label.normal};
`;

const JobGroupList = ({ jobGroup, onClick }: JobGroupListProps) => {
  return (
    <ContainerUl>
      <li>
        <JobGroupButton $isActive={jobGroup === 'PLANNING'} onClick={() => onClick('PLANNING')}>
          기획
        </JobGroupButton>
      </li>
      <li>
        <JobGroupButton $isActive={jobGroup === 'DESIGN'} onClick={() => onClick('DESIGN')}>
          디자인
        </JobGroupButton>
      </li>
      <li>
        <JobGroupButton $isActive={jobGroup === 'DEVELOP'} onClick={() => onClick('DEVELOP')}>
          개발
        </JobGroupButton>
      </li>
    </ContainerUl>
  );
};

export default React.memo(JobGroupList);
