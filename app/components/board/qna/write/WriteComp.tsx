'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Post } from '@/app/types/data';

const fetchPost = async (id: string): Promise<Post> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        date: dayjs(),
        title: '안녕하세요. 궁금한게 있습니다.',
        content: '본문 내용입니다.',
        nickname: 'ohdal',
        modified: false,
        solved: false,
      });
    }, 1000);
  });
};

export const Writecomp = () => {
  // id 값이 있다면 수정모드
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [post, setPost] = useState<Post | null>(null);

  const getPost = async (id: string) => {
    // TODO: get post api 연동
    const data = await fetchPost(id);
    setPost(data);
  };

  useEffect(() => {
    if (id) getPost(id);
  }, []);

  return <div>WriteComp</div>;
};

export default Writecomp;
