'use client';
import React, { useCallback } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { userState, userTagText } from '@/app/recoils/sample';

export default function UserInfoBox() {
  // const [user, setUser] = useRecoilState(userState);
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);
  const tagText = useRecoilValue(userTagText);

  const changeName = useCallback(() => {
    setUser({ ...user, name: '홍길똥' });
  }, []);

  return (
    <div>
      <p>
        이름: {user.name} ({user.username})
      </p>
      <p>태그: {tagText}</p>
      <button onClick={changeName}>이름 변경</button>
    </div>
  );
}
