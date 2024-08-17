'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';
import useAuth from '@/app/hooks/useAuth';
import ButtonComp from './ButtomComp';

interface Props {
  word: string;
}

const ContainerDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextP = styled.p`
  ${({ theme }) => theme.font.heading1}
  color: ${({ theme }) => theme.color.interaction.inactive};
  text-align: center;
  margin-bottom: 44px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.heading2}
  }
`;

const NoSearchBox = ({ word }: Props) => {
  const { push } = useRouter();
  const { userInfo } = useAuth();

  return (
    <ContainerDiv>
      <TextP>
        검색하신 “{'{' + word + '}'}”를 찾지 못했어요.
        <br />
        질문하시는 건 어떠세요?
      </TextP>
      <ButtonComp.Solid
        text="질문하러 가기"
        isActive={true}
        onClick={() => {
          isEmpty(userInfo) ? push('/login') : push('/qna/write');
        }}
      />
    </ContainerDiv>
  );
};

export default NoSearchBox;
