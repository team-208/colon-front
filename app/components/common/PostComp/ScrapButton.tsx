'use client';

import Image from 'next/image';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import { useCallback } from 'react';
import { useInsertPostScrapMutation } from '@/app/api/post/scrap/mutations';
import usePostScrapQuery from '@/app/api/post/scrap/queries';

interface Props {
  className?: string;
  postId: number;
  isScrap?: boolean;
}

const ScrapButton = ({ className, postId, isScrap }: Props) => {
  const { refetch } = usePostScrapQuery();
  const { mutateAsync } = useInsertPostScrapMutation();

  const handleClickScrap = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isScrap === undefined) {
      return;
    }

    e.preventDefault();
    const res = await mutateAsync({ postId });
    if (res.success) {
      refetch();
    }
  }, []);

  return (
    <button className={className} onClick={handleClickScrap}>
      <Image
        alt="스크랩 아이콘"
        src={
          isScrap ? `${IMAGE_CDN}/icon/bookmark-fill.svg` : `${IMAGE_CDN}/icon/bookmark-stroke.svg`
        }
        width={24}
        height={24}
      />
    </button>
  );
};

export default ScrapButton;
export type ScrapButtonType = { ScrapButton: typeof ScrapButton };
