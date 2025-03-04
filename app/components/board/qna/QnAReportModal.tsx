import styled from 'styled-components';
import Icon from '../../common/Icon/Icon';
import ModalComp from '@/app/components/common/ModalComp';
import { useMemo, useState } from 'react';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const ContainerModal = styled(ModalComp.Confirm)`
  width: 355px !important;
  height: 532px;
`;

const WrapperDiv = styled.div`
  height: calc(100% - 70px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

  & > p {
    text-align: left;
    ${({ theme }) => theme.font.caption1};
    color: ${({ theme }) => theme.color.label.normal};
    font-weight: 400;
    display: flex;
    align-items: center;
  }

  & > p > div {
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

const REPORT_REASON = {
  UNPLEASANT: 1,
  SPAM: 2,
  ETC: 3,
};

const QnAReportModal = ({ onConfirm, onCancel }: Props) => {
  const [selectedReason, setSelectedReason] = useState<number>();
  const isOpenUnpleasant = useMemo(
    () => selectedReason === REPORT_REASON.UNPLEASANT,
    [selectedReason],
  );
  const isOpenSpam = useMemo(() => selectedReason === REPORT_REASON.SPAM, [selectedReason]);
  const isOpenETC = useMemo(() => selectedReason === REPORT_REASON.ETC, [selectedReason]);

  return (
    <ContainerModal
      confirmLabel="취소"
      cancelLabel="제출"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <WrapperDiv>
        <div>
          <TitleH1>어떤 점이 불편하셨나요?</TitleH1>

          {/* 불쾌한 표현 */}
          <RadioButton
            onClick={() => {
              setSelectedReason(REPORT_REASON.UNPLEASANT);
            }}
          >
            <Icon
              name={isOpenUnpleasant ? 'icRadioActive' : 'icRadioInactive'}
              width="24px"
              height="24px"
            />
            <span>불쾌한 표현</span>
            <Icon name={'icNormalCaretDown'} width="12px" height="12px" />
          </RadioButton>

          {isOpenUnpleasant && (
            <DetailReasonDiv>
              <p>
                <div /> 욕설/차별/혐오
              </p>
              <p>
                <div /> 직/간접적으로 타인을 공격하는 내용
              </p>
              <p>
                <div /> 계층/지역/종교/성별 등을 혐오하거나 비하하는 표현
              </p>
              <p>
                <div /> 신체/외모/취향 등을 경멸하는 표현
              </p>
            </DetailReasonDiv>
          )}

          {/* 스팸 홍보 / 도배 */}
          <RadioButton
            onClick={() => {
              setSelectedReason(REPORT_REASON.SPAM);
            }}
          >
            <Icon
              name={isOpenSpam ? 'icRadioActive' : 'icRadioInactive'}
              width="24px"
              height="24px"
            />
            <span>스팸 홍보 / 도배</span>
            <Icon name={'icNormalCaretDown'} width="12px" height="12px" />
          </RadioButton>

          {isOpenSpam && (
            <DetailReasonDiv>
              <p>
                <div /> 사행성 오락이나 도박을 홍보하거나 권장하는 내용 등
              </p>
              <p>
                <div /> 부적절한 스팸 홍보 행위
              </p>
            </DetailReasonDiv>
          )}

          {/* 기타 */}
          <RadioButton
            onClick={() => {
              setSelectedReason(REPORT_REASON.ETC);
            }}
          >
            <Icon
              name={isOpenETC ? 'icRadioActive' : 'icRadioInactive'}
              width="24px"
              height="24px"
            />
            <span>기타</span>
          </RadioButton>

          <ETCInput />
        </div>

        <InfoDescriptionP>
          {`명예, 저작권 침해 등 권리침해의 경우\n권리보호센터로 접수해 주시길 바랍니다.`}
        </InfoDescriptionP>
      </WrapperDiv>
    </ContainerModal>
  );
};

export default QnAReportModal;
