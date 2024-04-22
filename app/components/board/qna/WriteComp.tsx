'use client';

import { useState } from 'react';
import { Post } from '@/app/types/data';

interface Props {
  defaultPost?: Post;
}

export const WriteComp = (props: Props) => {
  const { defaultPost } = props;
  const [post, setPost] = useState<Post | null>(defaultPost || null);

  return (
    <div>
      WriteComp
      <input defaultValue={defaultPost?.title} />
    </div>
  );
};

export default WriteComp;
