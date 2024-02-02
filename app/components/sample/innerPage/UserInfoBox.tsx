'use client';
import React, { useCallback } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { userState, userTagText } from '@/app/recoils/sample';

const paddingStyle = { padding: '10px 0' };

export default function UserInfoBox() {
  // 1. useRecoilState 를 이용한 get, set
  const [user, setUser] = useRecoilState(userState);

  //2. userRecoilValue, userSetRecoilState를 이용한 각각의 get, set
  // const user = useRecoilValue(userState);
  // const setUser = useSetRecoilState(userState);

  //3. 파생 데이터 사용하기
  const tagText = useRecoilValue(userTagText);

  const changeName = useCallback(() => {
    // 사용자 닉네임 변경 API 호출 로직

    setUser((cur) => {
      return { ...cur, username: '베트맨' };
    });
  }, []);

  return (
    <div>
      <div style={paddingStyle}>
        <h3>기본 정보</h3>
        <p>
          이름: {user.name} ({user.username})
        </p>
        <p>태그: {tagText}</p>
        <button onClick={changeName}>닉네임 변경</button>
      </div>
    </div>
  );
}
