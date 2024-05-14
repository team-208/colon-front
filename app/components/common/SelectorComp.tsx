'use client';

import React, { ReactNode, useState, useCallback, createContext, useContext } from 'react';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import Image from 'next/image';
import styled from 'styled-components';

interface Props {
  defaultOption: { idx: number; text: string };
  children: ReactNode;
}

interface OptionProps {
  text: string;
  idx: number;
  clickEvent: (v: number) => void;
}

interface Context {
  curIdx: number;
  setCurIdx: React.Dispatch<React.SetStateAction<number>>;
  setCurText: React.Dispatch<React.SetStateAction<string>>;
}

const SelectorContainerDiv = styled.div`
  position: relative;
`;

const SelectorButton = styled.button`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.font.caption1};
  color: ${({ theme }) => theme.color.label.normal};
  padding: 4px 8px;
  background-color: transparent;

  img {
    margin-left: 4px;
  }
`;

const OptionDiv = styled.div`
  position: absolute;
  right: 0;
  background: #ffffff;
  padding: 8px 0;
  border-radius: 8px;
  box-shadow:
    0px 6px 15px 3px rgba(25, 35, 40, 0.2),
    0px 4px 6px -5px rgba(25, 35, 40, 0.1);
`;

// TODO: $isActive 처리 디자인 나오면 수정
const OptionLi = styled.li<{ $isActive: boolean }>`
  ${({ theme }) => theme.font.caption1};
  color: ${({ theme, $isActive }) => ($isActive ? theme.color.primary.normal : '#000000')};
  width: 100px;
  padding: 6px 12px;

  &:hover {
    background: ${({ theme }) => theme.color.background.alternative};
  }
`;

const SelectorContext = createContext<Context | null>(null);

const SelectorComp = ({ defaultOption, children }: Props) => {
  const [toggle, setToggle] = useState(false);
  const [curIdx, setCurIdx] = useState(defaultOption.idx);
  const [curText, setCurText] = useState(defaultOption.text);

  const provider = { curIdx, setCurIdx, setCurText };

  const handleClickButton = useCallback(() => {
    setToggle((v) => !v);
  }, []);

  return (
    <SelectorContext.Provider value={provider}>
      <SelectorContainerDiv>
        <SelectorButton onClick={handleClickButton}>
          {curText}
          <Image
            alt="정렬 아이콘"
            src={`${IMAGE_CDN}/icon/chevron-down.png`}
            width={8}
            height={4.5}
          />
        </SelectorButton>
        {toggle && (
          <OptionDiv>
            <ul>{children}</ul>
          </OptionDiv>
        )}
      </SelectorContainerDiv>
    </SelectorContext.Provider>
  );
};

const Option = ({ text, idx, clickEvent }: OptionProps) => {
  const context = useContext(SelectorContext);
  const isActive = context?.curIdx === idx;

  return (
    <OptionLi
      key={`option-${idx}`}
      $isActive={isActive}
      onClick={() => {
        context?.setCurIdx(idx);
        context?.setCurText(text);
        clickEvent(idx);
      }}
    >
      {text}
    </OptionLi>
  );
};

SelectorComp.Option = Option;

export default SelectorComp;
