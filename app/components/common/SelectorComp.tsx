'use client';

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

export type MenuType = { id: number; text: string; value: number | string };

interface Props {
  defaultIdx?: number;
  menuList: MenuType[];
  onChange: (menu: MenuType) => void;
}

const SelectorContainerDiv = styled.div`
  position: relative;
`;

const SelectorButton = styled.button`
  ${({ theme }) => theme.font.caption1};
  color: ${({ theme }) => theme.color.label.normal};
  padding: 4px 8px;
  background-color: transparent;
`;

const MenuDiv = styled.div`
  position: absolute;
  right: 0;
  background: #ffffff;
  padding: 8px 0;
  border-radius: 8px;
  box-shadow:
    0px 6px 15px 3px rgba(25, 35, 40, 0.2),
    0px 4px 6px -5px rgba(25, 35, 40, 0.1);
`;

const MenuLi = styled.li<{ $isActive: boolean }>`
  ${({ theme }) => theme.font.caption1};
  color: ${({ theme, $isActive }) => ($isActive ? theme.color.primary.normal : '#000000')};
  width: 100px;
  padding: 6px 12px;

  &:hover {
    background: ${({ theme }) => theme.color.background.alternative};
  }
`;

const SelectorComp = ({ defaultIdx, menuList, onChange }: Props) => {
  const [toggle, setToggle] = useState(false);
  const [curMenu, setCurMenu] = useState(menuList[defaultIdx ?? 0]);

  const handleClickButton = useCallback(() => {
    setToggle((v) => !v);
  }, []);

  const handleClickMenu = useCallback((menu: MenuType) => {
    onChange(menu);
    setCurMenu(menu);
  }, []);

  return (
    <SelectorContainerDiv>
      <SelectorButton onClick={handleClickButton}>{curMenu.text}</SelectorButton>
      {toggle && (
        <MenuDiv>
          <ul>
            {menuList.map((menu) => (
              <MenuLi
                key={`id-${menu.text}`}
                $isActive={curMenu.value === menu.value}
                onClick={() => handleClickMenu(menu)}
              >
                {menu.text}
              </MenuLi>
            ))}
          </ul>
        </MenuDiv>
      )}
    </SelectorContainerDiv>
  );
};

export default React.memo(SelectorComp);
