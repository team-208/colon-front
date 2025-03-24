import { isEmpty } from 'lodash';
import { useInsertPostReportMutation } from '../api/report/mutations';
import useAuth from './useAuth';

const useReport = () => {
  const { mutateAsync: insertPostReport } = useInsertPostReportMutation();
  const { userInfo } = useAuth();

  const requestReport = async ({
    postId,
    commentId,
    reason,
  }: {
    postId: number;
    commentId?: number;
    reason: string;
  }) => {
    if (isEmpty(userInfo)) {
      window.alert('로그인 후 이용할 수 있습니다.');
    }

    const { success } = await insertPostReport({
      postId,
      commentId,
      userNickname: userInfo?.user.nick_name ?? '',
      status: 'REGISTERED',
      reason,
    });

    if (!success) {
      window.alert('신고하기에 실패하였습니다. 잠시 후 다시 시도해 주세요.');
      return;
    }

    window.alert(
      `신고가 완료되었습니다. 빠른 시일 내로 처리할게요.\n원활한 이야기 공간을 만드는 데 도움 주셔서 감사합니다!`,
    );
  };

  return {
    requestReport,
  };
};

export default useReport;
