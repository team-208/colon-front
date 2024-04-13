'use client';

import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import useAuth from '@/app/hooks/useAuth';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import JobGroupList from './JobGroupList';
import ProfileList, { PROFILE_TYPES } from './ProfileList';
import useNickNameQuery from '@/app/api/auth/nickName/queries';

const ServiceImageP = styled.p`
  width: 100%;
  line-height: 40px;
  background-color: #e0e0e0;
  text-align: center;
`;

const IntroduceDiv = styled.div`
  margin: 50px 0 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TitleStrong = styled.strong`
  font-size: 24px;
`;

const SubtitleH3 = styled.h3`
  margin-top: 32px;
  font-size: 16px;
`;

const DescP = styled.p`
  margin: 50px auto 0;
  font-size: 20px;
  line-height: 28px;
  white-space: pre-wrap;
  text-align: center;
`;

const CompleteButton = styled.button`
  margin: 0 auto;
  background-color: #c3c3c3;
  border-radius: 4px;
  padding: 14px 24px;
  min-width: 240px;
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

  const handleClick = async () => {
    if (major && profile) {
      // TODO: 디자인 가이드 배포시 random nickname profile image 추가작업 필요.
      const isKaKaoProfile = profile === 'KAKAO';

      signUp({
        major,
        profileUrl: isKaKaoProfile
          ? userInfo?.kakaoUserInfo.avatar_url ?? ''
          : userInfo?.user.profile_url ?? '',
        nickname: isKaKaoProfile ? kakaoNickname : randomNickName,
      });
      return;
    }

    // TODO: 필수 정보 미입력시 처리 방법 논의 필요.
    // ex) alert or 버튼 비활성화 등.
    alert('필수정보를 입력해 주세요.');
  };

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
      <ServiceImageP>서비스 아이콘</ServiceImageP>

      <IntroduceDiv>
        <h2>
          <TitleStrong>프로필 만들기</TitleStrong>
        </h2>

        <SubtitleH3>종사하시는 직군과 가장 유사한 분야를 선택해주세요!</SubtitleH3>
        <JobGroupList jobGroup={major} onClick={handleClickJobGroup} />

        <SubtitleH3>사용하실 프로필을 선택해 주세요!</SubtitleH3>
        <ProfileList
          profile={profile}
          kakaoNickname={kakaoNickname}
          randomNickname={randomNickName}
          onClick={handleClickProfile}
        />

        <SubtitleH3>
          서비스 이용을 위한 약관 동의가 필요해요!(카카오 회원가입시 항목이 중복되어 검토 필요)
        </SubtitleH3>

        <DescP>{`프로필이 완성되었어요!\nCO:LON에서 다양한 사람들을 만날 준비가 되셨나요?`}</DescP>
      </IntroduceDiv>

      {/* TODO: 디자인 가이드 배포 후, 공용 모듈화 필요 */}
      <CompleteButton onClick={handleClick}>이야기하러 가기!</CompleteButton>
    </>
  );
};

export default SignUpFormComp;
