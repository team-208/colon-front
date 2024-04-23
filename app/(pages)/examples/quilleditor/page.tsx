'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { UnprivilegedEditor } from 'react-quill';
import { createTextFile } from '@/app/utils/text';

const QuillEditor = dynamic(() => import('@/app/components/common/QuillEditor'), { ssr: false });

export default function QuilleditorPage() {
  const [html, setHTML] = useState<string>('');
  const [text, setText] = useState<string>('');

  const handleClickSave = (isTemporary: boolean) => {
    // content text .txt 파일로 변환 storage 저장
    // directory, file 명 논의하기
    const file = createTextFile(html, 'userid_date');

    const obj = {
      title: 'title',
      content: 'storage_file_url',
      temporary: isTemporary,
    };

    // obj 객체 posts DB 저장
  };

  const setEditor = (editor: UnprivilegedEditor) => {
    setHTML(editor.getHTML());
    setText(editor.getText().replaceAll('\n', ' '));
  };

  return (
    <>
      {/* <QuillEditor setHTML={setHTML} initValue="<p>안녕하세요</p>" /> */}
      <QuillEditor setEditor={setEditor} />
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
