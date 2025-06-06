import { IMAGE_CDN } from '@/app/constants/externalUrls';

export const ALARM_CONTENT_TYPES = {
  REPORTE_COMPLETE: 'REPORTE_COMPLETE',
  POST_SCRAP: 'POST_SCRAP',
  POST_COMMENT: 'POST_COMMENT',
  POST_REACTION: 'POST_REACTION',
  COMMENT_SCRAP: 'COMMENT_SCRAP',
  COMMENT_REPLY: 'COMMENT_REPLY',
  COMMENT_REACTION: 'COMMENT_REACTION',
};

export const ALARM_MESSAGES: {
  [contentType: string]: { title: string; content: string; icon: string };
} = {
  REPORTE_COMPLETE: {
    title: `신고가 완료되었습니다. 빠른 시일 내로 처리할게요.\n원활한 이야기 공간을 만드는 데 도움 주셔서 감사합니다!`,
    content: '',
    icon: `${IMAGE_CDN}/qna/EmojiComment.png`,
  },
};
