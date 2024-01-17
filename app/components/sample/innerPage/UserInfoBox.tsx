'use client';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState, userTagText } from '@/app/recoils/sample/user';

export default function UserInfoBox() {
  const user = useRecoilValue(userState);
  const tagText = useRecoilValue(userTagText);

  return (
    <div>
      <p>
        이름: {user.name} ({user.username})
      </p>
      <p>태그: {tagText}</p>
    </div>
  );
}
