'use client';

import React from 'react';
import styled from 'styled-components';

interface JobGroupListProps {
  jobGroup: string;
  onClick: (jopGrop: string) => void;
}

const ContainerUl = styled.ul`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-column-gap: 20px;
`;

const JobGroupButton = styled.button<{ $isActive: boolean }>`
  width: 100%;
  padding: 8px 16px;
  border-radius: 2px;
  background-color: ${({ $isActive }) => ($isActive ? '#c3c3c3' : 'white')};
  border: 1px solid #c3c3c3;
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
