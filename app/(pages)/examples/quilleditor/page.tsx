'use client';

import { useState } from 'react';
import { createTextFile } from '@/app/utils/text';
import QuillEditor from '@/app/components/common/QuillEditor';

export default function QuilleditorPage() {
  const [content, setContent] = useState('');

  const handleClickSave = (isTemporary: boolean) => {

    // content text .txt 파일로 변환 storage 저장
    // directory, file 명 논의하기
    const file = createTextFile(content, 'userid_date');

    const obj = {
      title: 'title',
      content: 'storage_file_url',
      temporary: isTemporary,
    };

    // obj 객체 posts DB 저장
  };

  const setHTML = (v: string) => {
    setContent(v);
  };

  return (
    <>
      {/* <QuillEditor setHTML={setHTML} initValue="<p>안녕하세요</p>" /> */}
      <QuillEditor setHTML={setHTML} />
      <div>
        <button
          onClick={() => {
            handleClickSave(true);
          }}
        >
          임시저장
        </button>
        <button
          onClick={() => {
            handleClickSave(false);
          }}
        >
          질문하기
        </button>
      </div>
    </>
  );
}
