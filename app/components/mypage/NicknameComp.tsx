'use client';

import { useState, useCallback } from 'react';
import styled from 'styled-components';

// TODO: 디자인시 NicnameP, NicknameInput width 통일
const NicknameP = styled.p`
  display: inline-block;
  width: 128px;
`;

const NicknameInput = styled.input`
  display: inline-block;
  width: 64px;
`;

const NicknameButton = styled.button`
  display: inline-block;
`;

const NicknameComp = () => {
  const [isModify, setIsModify] = useState(false);
  const [value, setValue] = useState('닉네임');

  const handleClickButton = useCallback(() => {
    if (isModify) {
      // TODO: 닉네임 수정 api 연동
      console.log('닉네임 수정', value);
    }

    setIsModify((v) => !v);
  }, [isModify, value]);

  return (
    <div>
      {isModify ? (
        <NicknameInput value={value} onChange={(e) => setValue(e.target.value)} />
      ) : (
        <NicknameP>{value}</NicknameP>
      )}
      <NicknameButton onClick={handleClickButton}>
        {isModify ? '저장 아이콘' : '수정 아이콘'}
      </NicknameButton>
    </div>
  );
};

export default NicknameComp;
