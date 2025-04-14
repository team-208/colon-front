import styled from 'styled-components';
import Icon from '../../common/Icon/Icon';
import ModalComp from '@/app/components/common/ModalComp';
import { useMemo, useState } from 'react';
import MobileRenderBox from '../../common/HeaderComp/MobileRenderBox';

interface Props {
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}

const ContainerModal = styled(ModalComp.Confirm)`
  width: 355px;
  height: 532px;
`;

const HeaderDiv = styled.div`
  width: 100%;
  height: max-content;
  padding: 7px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color.line.solid.neutral};

  p {
    ${({ theme }) => theme.font.body1};
    color: ${({ theme }) => theme.color.label.normal};
    line-height: 42px;
    text-align: left;
  }
`;

const WrapperDiv = styled.div`
  height: calc(100% - 86px - 57px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 30px;
  }
`;

const TitleH1 = styled.h1`
  ${({ theme }) => theme.font.heading1};
  color: ${({ theme }) => theme.color.label.normal};
  margin-bottom: 20px;
`;

const RadioButton = styled.button`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.font.body2};
  color: ${({ theme }) => theme.color.label.normal};
  cursor: pointer;

  & > span {
    display: inline-block;
    margin: 0px 4px 0;
  }

  &:not(:first-of-type) {
    margin-top: 16px;
  }
`;

const DetailReasonDiv = styled.div`
  margin-left: 28px;
  margin-top: 4px;
  padding: 8px 4px;
  border-radius: 4px;
  background-color: #ecf8ff;

  & > div {
    text-align: left;
    ${({ theme }) => theme.font.caption1};
    color: ${({ theme }) => theme.color.label.normal};
    font-weight: 400;
    display: flex;
    align-items: center;
  }

  & > div > div {
    width: 2px;
    height: 2px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.color.label.normal};
    margin: 0 8px;
  }
`;

const ETCInput = styled.input`
  float: left;
  margin: 4px 0 0 28px;
  padding: 8px;
  width: calc(100% - 28px);
  border: 1px solid ${({ theme }) => theme.color.line.solid.normal};
  border-radius: 4px;
  ${({ theme }) => theme.font.caption1};
  color: ${({ theme }) => theme.color.label.normal};
  outline: none;

  ::placeholder {
    color: ${({ theme }) => theme.color.interaction.inactive};
  }

  &:focus {
    border-color: ${({ theme }) => theme.color.primary.normal};
  }
`;

const InfoDescriptionP = styled.p`
  margin-bottom: 10px;
  ${({ theme }) => theme.font.body3};
  color: ${({ theme }) => theme.color.label.normal};
  font-weight: 400;
`;

const REPORT_REASON_TYPES = {
  UNPLEASANT: 1,
  SPAM: 2,
  ETC: 3,
};

const REPORT_REASON_LABELS: { [reasonType: number]: string } = {
  1: '불쾌한 표현',
  2: '스팸 홍보 / 도배',
};

const QnAReportModal = ({ onConfirm, onCancel }: Props) => {
  const [selectedReason, setSelectedReason] = useState<number>();
  const [reason, setReason] = useState<string>('');

  const isOpenUnpleasant = useMemo(
    () => selectedReason === REPORT_REASON_TYPES.UNPLEASANT,
    [selectedReason],
  );
  const isOpenSpam = useMemo(() => selectedReason === REPORT_REASON_TYPES.SPAM, [selectedReason]);
  const isOpenETC = useMemo(() => selectedReason === REPORT_REASON_TYPES.ETC, [selectedReason]);

  const handleConfirm = () => {
    const isEmptyETCReason = isOpenETC && !reason;
    if (!selectedReason || isEmptyETCReason) {
      window.alert(isEmptyETCReason ? '신고 이유를 입력해주세요.' : '신고 이유를 선택해주세요.');
      return;
    }

    onConfirm(isOpenETC ? reason : REPORT_REASON_LABELS[selectedReason]);
  };

  return (
    <ContainerModal
      isReverseButton
      confirmLabel="제출"
      cancelLabel="취소"
      onConfirm={handleConfirm}
      onCancel={onCancel}
    >
      <MobileRenderBox renderMode="visible">
        <HeaderDiv>
          <p>신고하기</p>
        </HeaderDiv>
      </MobileRenderBox>
      <WrapperDiv>
        <div>
          <TitleH1>어떤 점이 불편하셨나요?</TitleH1>

          {/* 불쾌한 표현 */}
          <RadioButton
            onClick={() => {
              setSelectedReason(REPORT_REASON_TYPES.UNPLEASANT);
            }}
          >
            <Icon
              name={isOpenUnpleasant ? 'icRadioActive' : 'icRadioInactive'}
              width="24px"
              height="24px"
            />
            <span>{REPORT_REASON_LABELS[REPORT_REASON_TYPES.UNPLEASANT]}</span>
            <Icon name={'icNormalCaretDown'} width="12px" height="12px" />
          </RadioButton>

          {isOpenUnpleasant && (
            <DetailReasonDiv>
              <div>
                <div /> 욕설/차별/혐오
              </div>
              <div>
                <div /> 직/간접적으로 타인을 공격하는 내용
              </div>
              <div>
                <div /> 계층/지역/종교/성별 등을 혐오하거나 비하하는 표현
              </div>
              <div>
                <div /> 신체/외모/취향 등을 경멸하는 표현
              </div>
            </DetailReasonDiv>
          )}

          {/* 스팸 홍보 / 도배 */}
          <RadioButton
            onClick={() => {
              setSelectedReason(REPORT_REASON_TYPES.SPAM);
            }}
          >
            <Icon
              name={isOpenSpam ? 'icRadioActive' : 'icRadioInactive'}
              width="24px"
              height="24px"
            />
            <span>{REPORT_REASON_LABELS[REPORT_REASON_TYPES.SPAM]}</span>
            <Icon name={'icNormalCaretDown'} width="12px" height="12px" />
          </RadioButton>

          {isOpenSpam && (
            <DetailReasonDiv>
              <div>
                <div /> 사행성 오락이나 도박을 홍보하거나 권장하는 내용 등
              </div>
              <div>
                <div /> 부적절한 스팸 홍보 행위
              </div>
            </DetailReasonDiv>
          )}

          {/* 기타 */}
          <RadioButton
            onClick={() => {
              setSelectedReason(REPORT_REASON_TYPES.ETC);
            }}
          >
            <Icon
              name={isOpenETC ? 'icRadioActive' : 'icRadioInactive'}
              width="24px"
              height="24px"
            />
            <span>기타</span>
          </RadioButton>

          <ETCInput
            placeholder="내용을 작성해 주세요"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
            }}
            onClick={() => {
              setSelectedReason(REPORT_REASON_TYPES.ETC);
            }}
          />
        </div>

        <InfoDescriptionP>
          {`명예, 저작권 침해 등 권리침해의 경우\n권리보호센터로 접수해 주시길 바랍니다.`}
        </InfoDescriptionP>
      </WrapperDiv>
    </ContainerModal>
  );
};

export default QnAReportModal;
