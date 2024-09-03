'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled, { css } from 'styled-components';
import Section from '../components/common/Section';
import BasicHeader from '../components/common/BasicHeader';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import ButtonComp from '../components/common/ButtomComp';
import { IMAGE_CDN } from '../constants/externalUrls';

const ContainerInnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 40px 0;
  overflow-x: hidden;

  & > section {
    width: 100%;
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 108px 20px 0;
  }
`;

const DescP1 = styled.p`
  ${({ theme }) => theme.font.display3}
  text-align: center;

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.display3}
  }
`;

const DescP2 = styled.p`
  ${({ theme }) => theme.font.display3}
  text-align: center;
  margin-bottom: 16px;

  span {
    background: ${({ theme }) => theme.color.gradient.normalReverse};
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin-bottom: 10px;
    ${({ theme }) => theme.font.display4}
  }
`;

const MoveButton = styled(ButtonComp.Gradient)`
  display: flex;
  margin: 40px auto 0;

  img {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
  }
`;

const QnASampleDiv = styled.div`
  box-shadow: 0px 0px 10px 0px #0000001a;
  padding: 0 30px;
  margin: 0 auto;
  width: 100%;
  max-width: 730px;
  border: 2px solid ${({ theme }) => `${theme.color.static.light}4d`};
  border-radius: 20px;
`;

const TitleP = styled.p`
  margin: 30px 0 24px;
  ${({ theme }) => theme.font.heading2};
  text-align: center;
`;

const JopGroupDiv = styled.div`
  display: flex;
  align-items: center;
`;

const JopGroupTitleP = styled.p`
  ${({ theme }) => theme.font.body1};
  margin-right: 16.2px;
`;

const JobGroupButton = styled.button<{ $isActive: boolean }>`
  border-radius: 8px;
  margin-right: 9px;
  padding: 4px 8px;
  ${({ theme }) => theme.font.body1};
  width: 60px;
  background-color: ${({ theme }) => theme.color.palette.coolNeutral99};
  color: ${({ theme }) => theme.color.interaction.inactive};

  ${({ $isActive }) =>
    $isActive &&
    css`
      background-color: ${({ theme }) => theme.color.primary.normal};
      color: ${({ theme }) => theme.color.static.light};
    `}
`;

const QnATitleP = styled.p`
  ${({ theme }) => theme.font.body2};
  margin: 18px 0 10.8px;
  padding: 10.8px 14.4px;
  color: ${({ theme }) => theme.color.interaction.inactive};
  border: 1px solid ${({ theme }) => theme.color.line.solid.normal};
  border-radius: 9px;
  cursor: pointer;
`;

const QnABodyP = styled.p`
  ${({ theme }) => theme.font.body2};
  margin: 18px 0 0;
  padding: 10.8px 14.4px 16px;
  color: ${({ theme }) => theme.color.interaction.inactive};
  border: 1px solid ${({ theme }) => theme.color.line.solid.normal};
  border-radius: 9px 9px 0 0;
  border-bottom: none;
  cursor: pointer;
`;

const QnADetailSampleWrapperDiv = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  max-width: 730px;
`;

const QnADetailSampleDiv = styled.div`
  box-shadow: 0px 0px 10px 0px #0000001a;
  padding: 30px;
  margin: 0 auto;
  flex: 1;
  border: 2px solid ${({ theme }) => `${theme.color.static.light}4d`};
  border-radius: 20px;
  backdrop-filter: blur(10px);
  background-color: ${({ theme }) => `${theme.color.static.light}4d`};

  &:last-of-type {
    margin-left: 18px;
  }
`;

const QnADetailTitleP = styled.p`
  ${({ theme }) => theme.font.heading2};
  color: ${({ theme }) => theme.color.label.string};

  & > span {
    display: inline-block;
    ${({ theme }) => theme.font.body1};
    padding: 2px 6px;
    width: 40px;
    height: 30px;
    margin-right: 8px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.palette.coolNeutral97};
  }
`;

const QnADetailBodyP = styled.p`
  ${({ theme }) => theme.font.body2};
  color: ${({ theme }) => theme.color.label.string};
  font-weight: 400;
  margin: 10px 0;
`;

const ReactionBoxDiv = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    display: flex;
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  padding: 4px 0;
  border-radius: 8px;

  span {
    display: inline-block;
    ${({ theme }) => theme.font.body3};
    color: ${({ theme }) => theme.color.label.normal};
    margin-left: 6px;
  }

  &:last-of-type {
    margin-left: 16px;
  }
`;

const ChoiceButton = styled(ButtonComp.Solid)`
  padding: 4px 10px;
  height: 26px;
  border-radius: 8px;
  ${({ theme }) => theme.font.body3};
`;

const BottomImageBoxDiv = styled.div`
  position: absolute;
  z-index: -1;
  bottom: 0;
  left: 50%;
  width: 100vw;
  height: 225px;
  max-width: 1440px;
  transform: translateX(-50%);
`;

export default function Home() {
  // hooks
  const { push, replace } = useRouter();
  const { userInfo, isFetchedUserInfo } = useAuth();

  // events
  const handleClick = () => {
    push('/login');
  };

  useEffect(() => {
    if (!isEmpty(userInfo)) {
      replace('/qna');
    }
  }, [userInfo]);

  if (!isFetchedUserInfo) {
    return <></>;
  }

  return (
    <main style={{ maxWidth: 'none' }}>
      <BasicHeader />
      <ContainerInnerDiv>
        <Section direction="column" padding="0">
          <DescP2>
            <span>기획자, 개발자, 디자이너</span>가
          </DescP2>
          <DescP1>모두 모여 소통하는 공간</DescP1>

          <MoveButton isActive size="lg" onClick={handleClick}>
            <span>Co:lon에서 소통하기!</span>
            <Image
              alt="소통하기 화살표 아이콘"
              src={`${IMAGE_CDN}/icon/Icon_Arrow_Right.svg`}
              width={24}
              height={24}
            />
          </MoveButton>
        </Section>

        <Section direction="column" padding="0" margin="64px 0 20px">
          <QnASampleDiv>
            <TitleP>도움을 받고싶은 직군에 바로 질문해보세요</TitleP>

            <JopGroupDiv>
              <JopGroupTitleP>질문할 직군</JopGroupTitleP>
              <JobGroupButton $isActive>전체</JobGroupButton>
              <JobGroupButton $isActive={false}>개발</JobGroupButton>
              <JobGroupButton $isActive={false}>기획</JobGroupButton>
              <JobGroupButton $isActive={false}>디자인</JobGroupButton>
            </JopGroupDiv>

            <QnATitleP>10자 이상 구체적으로 작성해주세요.</QnATitleP>
            <QnABodyP>30자 이상 구체적으로 작성해주시면 좋은 답변을 얻을 수 있어요!</QnABodyP>
          </QnASampleDiv>
        </Section>

        <Section direction="row" padding="0 0 10px">
          <QnADetailSampleWrapperDiv>
            <QnADetailSampleDiv>
              <QnADetailTitleP>
                <span>답변</span>
                도움받은 답변을 채택해보세요
              </QnADetailTitleP>

              <QnADetailBodyP>
                {`화면 설계 시 소수점은 제거해주시는 게 좋아요.\nCmd+Shift+'로 snap to pixel grid를 적용해보세요.`}
              </QnADetailBodyP>

              <ReactionBoxDiv>
                <div>
                  <IconButton type="button">
                    <Image
                      alt="엄지척 이모지"
                      src={`${IMAGE_CDN}/icon/Icon_Like_Gray.svg`}
                      width={20}
                      height={20}
                    />
                    <span>999</span>
                  </IconButton>

                  <IconButton type="button">
                    <Image
                      alt="댓글 아이콘"
                      src={`${IMAGE_CDN}/qna/Icon_Comment.png`}
                      width={20}
                      height={20}
                    />
                    <span>999</span>
                  </IconButton>
                </div>

                <ChoiceButton isActive onClick={() => {}}>
                  글쓴이 채택
                </ChoiceButton>
              </ReactionBoxDiv>
            </QnADetailSampleDiv>

            <QnADetailSampleDiv>
              <QnADetailTitleP>공감되는 글에 반응을 표시해보세요</QnADetailTitleP>

              <QnADetailBodyP>
                {`직군 간 서로 이해하려는 태도가 중요한 것 같아요.\n비단 IT업계 뿐 아니라 모든 업계에 해당되는 부분이죠.`}
              </QnADetailBodyP>

              <ReactionBoxDiv>
                <Image alt="이모지" src={`${IMAGE_CDN}/qna/EmojiAdd.png`} width={24} height={24} />

                <Image
                  alt="스크랩 아이콘"
                  src={`${IMAGE_CDN}/icon/bookmark-stroke.svg`}
                  width={24}
                  height={24}
                />
              </ReactionBoxDiv>
            </QnADetailSampleDiv>
          </QnADetailSampleWrapperDiv>
        </Section>
      </ContainerInnerDiv>

      <BottomImageBoxDiv>
        <Image alt="상단 이미지1" src={`${IMAGE_CDN}/main/main-bottom.png`} fill />
      </BottomImageBoxDiv>
    </main>
  );
}
