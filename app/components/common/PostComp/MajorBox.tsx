'use client';

import styled from 'styled-components';
import { JOB_GROUP_LABELS } from '../../constants';

interface Props {
  authorMajor: string;
  requestedMajor: string;
}

const MajorP = styled.p`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.font.body3};
  color: ${({ theme }) => theme.color.label.normal};
  background-color: ${({ theme }) => theme.color.palette.coolNeutral97};
  border: 1px solid ${({ theme }) => theme.color.palette.coolNeutral97};
  width: fit-content;
  height: 24px;
  border-radius: 6px;
  overflow: hidden;

  & > span {
    padding: 2px 4px;
  }

  & > span:last-of-type {
    margin-left: 2px;
    display: inline-block;
    border-radius: 5px;
    overflow: hidden;
    color: ${({ theme }) => theme.color.primary.normal};
    background-color: ${({ theme }) => theme.color.static.light};
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.caption2};
    height: 20px;
  }
`;

const MajorBox = ({ authorMajor, requestedMajor }: Props) => {
  return (
    <MajorP>
      <span>{JOB_GROUP_LABELS[authorMajor] ?? ''}</span>
      <span>
        {`>`}
        {JOB_GROUP_LABELS[requestedMajor] ?? ''}
      </span>
    </MajorP>
  );
};

export default MajorBox;
export type MajorBoxType = {MajorBox: typeof MajorBox}