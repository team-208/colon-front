import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import React from 'react';
import styled from 'styled-components';
import ButtonComp from '@/app/components/common/ButtomComp';

interface Props {
  jobGroup: JOB_GROUP_TYPES | undefined;
  onClick: (jopGrop: JOB_GROUP_TYPES) => void;
}

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 28px;
  margin: 20px 0 24px 0;

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin: 20px 0;
  }
`;

const TitleP = styled.p`
  ${({ theme }) => theme.font.body2};
  color: ${({ theme }) => theme.color.label.normal};
  margin-right: 18px;
  line-height: 28px !important;
`;

const ContainerUl = styled.ul`
  li {
    display: inline-block;
  }

  :not(:last-of-type) {
    margin-right: 10px;
  }
`;

const JobGroupButton = styled(ButtonComp.Solid)`
  min-width: 56px;
  height: fit-content;
  padding: 4px 8px !important;
  border-radius: 8px !important;
  text-align: center;

  color: ${({ theme, isActive }) =>
    isActive ? theme.color.static.light : theme.color.interaction.inactive} !important;
`;

const jobList: { id: number; text: string; value: JOB_GROUP_TYPES }[] = [
  {
    id: 1,
    text: '전체',
    value: 'ALL',
  },
  {
    id: 2,
    text: '기획',
    value: 'PLANNING',
  },
  {
    id: 3,
    text: '디자인',
    value: 'DESIGN',
  },
  {
    id: 4,
    text: '개발',
    value: 'DEVELOP',
  },
];

const JobGroupList = ({ jobGroup, onClick }: Props) => {
  return (
    <ContainerDiv>
      <TitleP>질문할 직군</TitleP>
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
    </ContainerDiv>
  );
};

export default React.memo(JobGroupList);
