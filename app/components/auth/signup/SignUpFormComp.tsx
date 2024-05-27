'use client';

import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import useAuth from '@/app/hooks/useAuth';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import JobGroupList from './JobGroupList';
import ProfileList, { PROFILE_TYPES } from './ProfileList';
import useNickNameQuery from '@/app/api/auth/nickName/queries';
import Image from 'next/image';
import { IMAGE_CDN } from '@/app/constants/externalUrls';

const IntroduceDiv = styled.div`
  margin: 40px 0 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin: 34px 0 154px;
  }
`;

const TitleH1 = styled.h1`
  ${({ theme }) => theme.font.heading1};

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.heading2};
  }
`;

const JobGroupTitleH2 = styled.h2`
  ${({ theme }) => theme.font.body1};
  margin: 40px 0 16px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.body2};
    margin: 28px 0 12px;
  }
`;

const ProfileTitleH2 = styled.h2`
  ${({ theme }) => theme.font.body1};
  margin: 40px 0 16px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.body2};
    margin: 32px 0 16px;
  }
`;

const FooterDiv = styled.div`
  position: fixed;
  bottom: 0;
  padding-bottom: 124px;
  margin: 0 auto;
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.color.static.light};

  ${({ theme }) => theme.mediaQuery.mobile} {
    padding-bottom: 48px;
  }
`;

const DescP = styled.p`
  white-space: pre-wrap;
  text-align: center;
  ${({ theme }) => theme.font.body2};
  color: ${({ theme }) => theme.color.primary.string};

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.caption1};
  }
`;

const CompleteButton = styled.button`
  margin: 16px 20px 0;
  background-color: #c3c3c3;
  border-radius: 15px;
  width: calc(100% - 40px);
  max-width: 640px;
  height: 50px;
  background-color: ${({ theme }) => theme.color.primary.normal};
  color: ${({ theme }) => theme.color.static.light};
  ${({ theme }) => theme.font.body1};

  &:disabled {
    background-color: ${({ theme }) => theme.color.interaction.disable};
    color: ${({ theme }) => theme.color.label.disable};
  }
`;

const ImageBoxDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 260px;
  bottom: 0;

  ${({ theme }) => theme.mediaQuery.mobile} {
    height: 50vw;
  }
`;

const SignUpFormComp = () => {
  // state
  const [major, setMajor] = useState<JOB_GROUP_TYPES>();
  const [profile, setProfile] = useState<PROFILE_TYPES>('KAKAO');
  const [randomNickName, setRandomNickName] = useState<string>('');

  // hooks
  const { signUp, userInfo } = useAuth();

  // queries
  const { refetch: refetchNickName } = useNickNameQuery();

  // useMemos
  const kakaoNickname = useMemo(
    () => userInfo?.kakaoUserInfo?.preferred_username ?? '',
    [userInfo?.kakaoUserInfo?.preferred_username],
  );
  const isDisable = useMemo(() => !(major && profile), [major, profile]);

  // events
  const handleClickJobGroup = useCallback(
    (jobGroup: JOB_GROUP_TYPES) => {
      setMajor(jobGroup);
    },
    [setMajor],
  );

  const handleClickProfile = useCallback(
    (profile: PROFILE_TYPES) => {
      setProfile(profile);
    },
    [setProfile],
  );

  const handleClick = useCallback(async () => {
    if (isDisable) {
      return;
    }

    // TODO: 디자인 가이드 배포시 random nickname profile image 추가작업 필요.
    const isKaKaoProfile = profile === 'KAKAO';

    signUp({
      major: major as JOB_GROUP_TYPES,
      profileUrl: isKaKaoProfile
        ? userInfo?.kakaoUserInfo?.avatar_url ?? ''
        : userInfo?.user?.profile_url ?? '',
      nickname: isKaKaoProfile ? kakaoNickname : randomNickName,
    });
  }, [isDisable, profile]);

  const handleRefreshRandomNickName = async () => {
    const { data: randomNickName } = await refetchNickName();
    if (randomNickName?.success) {
      setRandomNickName(randomNickName?.nickname);
    }
  };

  // useEffects
  useEffect(() => {
    handleRefreshRandomNickName();
  }, []);

  return (
    <>
      <IntroduceDiv>
        <TitleH1>회원가입</TitleH1>

        <JobGroupTitleH2>종사하시는 직군과 가장 유사한 분야를 선택해주세요!</JobGroupTitleH2>
        <JobGroupList jobGroup={major} onClick={handleClickJobGroup} />

        <ProfileTitleH2>사용하실 프로필을 선택해 주세요!</ProfileTitleH2>
        <ProfileList
          profile={profile}
          kakaoNickname={kakaoNickname}
          randomNickname={randomNickName}
          onClick={handleClickProfile}
        />
      </IntroduceDiv>

      <FooterDiv>
        {!isDisable && (
          <>
            <ImageBoxDiv>
              <Image
                alt="하단 블러 이미지"
                src={`${IMAGE_CDN}/signup/login-blur-background.png`}
                sizes="100px"
                fill
              />
            </ImageBoxDiv>
            <DescP>{`프로필이 완성되었어요!\nCO:LON에서 다양한 사람들을 만날 준비가 되셨나요?`}</DescP>
          </>
        )}

        {/* TODO: 디자인 가이드 배포 후, 공용 모듈화 필요 */}
        <CompleteButton disabled={isDisable} onClick={handleClick}>
          이야기하러 가기!
        </CompleteButton>
      </FooterDiv>
    </>
  );
};

export default SignUpFormComp;
