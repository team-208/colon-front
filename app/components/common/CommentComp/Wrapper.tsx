'use client';

import { IMAGE_CDN } from '@/app/constants/externalUrls';
import Image from 'next/image';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  isNestedComment?: boolean;
  children: ReactNode;
}

const ContainerDiv = styled.div<{ $isNestedComment: boolean }>`
  display: flex;
  padding: 20px;

  background-color: ${({ $isNestedComment, theme }) =>
    $isNestedComment ? theme.color.background.alternative : theme.color.background.normal};

  ${({ theme }) => theme.mediaQuery.mobile} {
  }
`;

const NestedIconImage = styled(Image)`
  margin-right: 12px;
`;

const Wrapper = ({ className, isNestedComment, children }: Props) => {
  return (
    <ContainerDiv className={className} $isNestedComment={!!isNestedComment}>
      {isNestedComment && (
        <NestedIconImage
          alt="대댓글 아이콘"
          src={`${IMAGE_CDN}/icon/Icon_Reply.png`}
          width={16}
          height={16}
        />
      )}
      {children}
    </ContainerDiv>
  );
};

export default Wrapper;
export type WrapperType = { Wrapper: typeof Wrapper };
