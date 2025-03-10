'use client';

import styled from 'styled-components';
import { JOB_GROUP_LABELS } from '../../constants';
import { dateText } from '@/app/utils/text';
import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import dayjs from 'dayjs';
import Image from 'next/image';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import ButtonComp from '../ButtomComp';
import Selector from '../Selector';
import { useMemo } from 'react';
import useReport from '@/app/hooks/useReport';
import useModal from '@/app/hooks/useModal';
import QnAReportModal from '../../board/qna/QnAReportModal';

interface Props {
  postId?: string;
  commentId?: number;
  major: JOB_GROUP_TYPES;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  isSelected: boolean;
  isAuthor: boolean;
  activeReport?: boolean;
  onClickModify: () => void;
  onClickDelete: () => void;
}

const ContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const UserInfoDiv = styled.div`
  display: flex;
`;

const MajorP = styled.p<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.font.caption1};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.color.static.light : theme.color.label.normal};
  background: ${({ $isSelected, theme }) =>
    $isSelected ? theme.color.gradient.normal : theme.color.palette.coolNeutral97};
  border-radius: 5px;
  padding: 2px 6px;

  & > img {
    margin-right: 2px;
  }
`;

const AuthorP = styled.p`
  display: flex;
  align-items: center;
  margin-left: 6px;
  ${({ theme }) => theme.font.caption1};
  color: ${({ theme }) => theme.color.label.normal};
  font-weight: 400;

  & > span:first-of-type {
    display: inline-block;
    ${({ theme }) => theme.font.body2};
    margin-right: 2px;
  }

  & > span:last-of-type {
    display: inline-block;
    margin-left: 2px;
  }
`;

const ModifyOption = styled(Selector.Option)`
  color: ${({ theme }) => theme.color.label.normal};
`;

const DeleteOption = styled(Selector.Option)`
  color: ${({ theme }) => theme.color.status.destructive};
`;

const ReportButton = styled(ButtonComp.OutlinedPrimary)`
  height: 22px;
  padding: 4px 8px;
  border-radius: 7px;
  ${({ theme }) => theme.font.caption2};
`;

const Header = ({
  postId,
  commentId,
  major,
  nickname,
  createdAt,
  updatedAt,
  isSelected,
  isAuthor,
  activeReport = true,
  onClickModify,
  onClickDelete,
}: Props) => {
  const { requestReport } = useReport();
  const { openModal, closeModal } = useModal();

  const isDeletedComment = useMemo(() => nickname === null, []);

  const handleReport = () => {
    const handleConfirm = async (reason: string) => {
      if (!postId) {
        return;
      }

      requestReport({ postId: parseInt(postId), commentId, reason });
      closeModal();
    };

    openModal({
      modalProps: {
        contents: <QnAReportModal onConfirm={handleConfirm} onCancel={() => closeModal()} />,
      },
    });
  };

  return (
    <ContainerDiv>
      <UserInfoDiv>
        {!isDeletedComment && (
          <MajorP $isSelected={isSelected}>
            {isSelected && (
              <Image alt="채택 아이콘" src={`${IMAGE_CDN}/icon/Crown.png`} width={14} height={14} />
            )}
            {JOB_GROUP_LABELS[major] ?? ''}
          </MajorP>
        )}

        <AuthorP>
          {!isDeletedComment && (
            <>
              <span>{nickname}</span>
              <span>•</span>
            </>
          )}
          <span>
            {dateText(dayjs(updatedAt))} {updatedAt !== createdAt && '(편집됨)'}
          </span>
        </AuthorP>
      </UserInfoDiv>

      {!isDeletedComment && isAuthor ? (
        <Selector
          defaultOption={{ idx: 0, text: '최신순' }}
          selectorButton={
            <Image alt="더보기 아이콘" src={`${IMAGE_CDN}/icon/dots.png`} width={16} height={16} />
          }
        >
          <ModifyOption idx={0} text="수정" clickEvent={onClickModify} />
          <DeleteOption idx={1} text="삭제" clickEvent={onClickDelete} />
        </Selector>
      ) : (
        <>
          {activeReport && (
            <ReportButton isActive={false} onClick={handleReport}>
              신고
            </ReportButton>
          )}
        </>
      )}
    </ContainerDiv>
  );
};

export default Header;
export type HeaderType = { Header: typeof Header };
