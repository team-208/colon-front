'use client';

import { useState } from 'react';
import { Post } from '@/app/types/data';
import JobGroupList, { JOB_GROUP_LIST_TYPES } from './JobGroupList';

interface Props {
  defaultPost?: Post;
}

export const WriteComp = (props: Props) => {
  const { defaultPost } = props;
  const [major, setMajor] = useState<JOB_GROUP_LIST_TYPES>();
  const [post, setPost] = useState<Post | null>(defaultPost || null);

  return (
    <div>
      <JobGroupList jobGroup={major} onClick={(v) => setMajor(v)} />
      <input defaultValue={defaultPost?.title} />
    </div>
  );
};

export default WriteComp;
