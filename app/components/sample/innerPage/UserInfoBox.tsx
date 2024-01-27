'use client';
import React, { useCallback, useEffect } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState, useRecoilValueLoadable } from 'recoil';
import { userState, userTagText, userQuestionList, QuestionList } from '@/app/recoils/sample';

//4. 비동기 처리 selector
// https://stackoverflow.com/questions/76849958/recoil-async-selector-does-not-work-with-next-js
type QuestionListComponentProps = { userID: number };
const QuestionListComponent = ({ userID }: QuestionListComponentProps) => {
  const { state, contents } = useRecoilValueLoadable(userQuestionList(userID));

  switch (state) {
    case 'loading':
      return <div>loading...</div>;
      break;
    case 'hasValue':
      return (
        <div>
          {(contents as QuestionList).map((v) => (
            <p key={v.id}>{v.title}</p>
          ))}
        </div>
      );
      break;
    case 'hasError':
      return <div>데이터 불러오기에 실패했습니다.</div>;
      break;
  }
};

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
      <div style={paddingStyle}>
        <h3>나의 질문 리스트</h3>
        {/* <React.Suspense fallback={<div>Loading...</div>}> */}
        <QuestionListComponent userID={user.id} />
        {/* </React.Suspense> */}
      </div>
    </div>
  );
}
