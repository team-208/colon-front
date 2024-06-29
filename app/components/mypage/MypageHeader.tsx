'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { myPageHeaderState } from '@/app/recoils';
import { useRecoilValue } from 'recoil';
import HeaderComp from '../common/HeaderComp';
import ConfirmHeader from '../common/ConfirmHeader';
import MobileRenderBox from '../common/HeaderComp/MobileRenderBox';
import { IMAGE_CDN } from '@/app/constants/externalUrls';

const ContainerFlex = styled(HeaderComp.Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MyPageHeader = () => {
  const { isModify, onConfirm, onCancel } = useRecoilValue(myPageHeaderState);

  const { back } = useRouter();

  return (
    <>
      {isModify ? (
        <ConfirmHeader onConfirm={onConfirm} onCancel={onCancel} />
      ) : (
        <ContainerFlex>
          <MobileRenderBox renderMode="visible">
            <button onClick={back}>
              <Image
                alt="더보기 아이콘"
                src={`${IMAGE_CDN}/icon/Icon_Back.png`}
                width={24}
                height={24}
              />
            </button>
          </MobileRenderBox>
          <MobileRenderBox renderMode="hidden">
            <FlexRowDiv>
              <HeaderComp.Logo margin="0 24px 0 0" />
              <HeaderComp.Navigation />
            </FlexRowDiv>
          </MobileRenderBox>

          <FlexRowDiv>
            <HeaderComp.AlertButton />
            <HeaderComp.ProfileButton />
          </FlexRowDiv>
        </ContainerFlex>
      )}
    </>
  );
};

export default MyPageHeader;
