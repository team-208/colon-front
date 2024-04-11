'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import hljs from 'highlight.js';
import { ReactQuillProps } from 'react-quill';
import 'highlight.js/styles/github.css';
// import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';

const Container = styled.div`
  width: 100%;
  min-height: 300px;
  max-height: 300px;
  border: 1px solid #717171;
  border-radius: 10px;
  overflow: auto;

  #toolbar {
    border-top: none;
    border-left: none;
    border-right: none;
  }

  .ql-container.ql-snow {
    border: none !important;
  }
`;

type customEditor = ReactQuillProps & { forwardRef: React.MutableRefObject<any> };
const ReactQuill = dynamic(
  async () => {
    const { default: Quill } = await import('react-quill');
    return ({ forwardRef, ...props }: customEditor) => <Quill ref={forwardRef} {...props} />;
  },
  { ssr: false },
);

hljs.configure({
  languages: ['javascript', 'typescript', 'ruby', 'python', 'java', 'cpp', 'kotlin', 'sql'],
});

const options = {
  modules: {
    syntax: {
      highlight: (text: any) => hljs.highlightAuto(text).value,
    },
    toolbar: '#toolbar',
    // toolbar: [['image']],
  },
  placeholder:
    '질문에 대한 구체적인 설명을 해주세요.\n상황을 설명해주시면 더욱 좋은 답변을 받으실 수 있어요!\n\nex.',
  theme: 'snow', // or bubble
};

interface QuillRef {
  value: string;
  focus: () => void;
}

const QuillEditor = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<QuillRef>();

  const handleFileInput = () => {
    if (!quillRef.current) return;
    // const file = inputRef.current?.files[0];

    // const editor = quillRef.current.getEditor();
    // const { index } = editor?.selection;
    // editor?.insertEmbed(index, 'image', 'url');
  };

  const handleClickContainer = () => {
    if (!quillRef.current) return;

    quillRef.current.focus();
  };

  const getValue = (): string => {
    if (!quillRef.current) return '';

    console.log(quillRef.current.value);
    return quillRef.current.value;
  };

  return (
    <>
      <Container onClick={handleClickContainer}>
         <div id="toolbar">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-link"></button>
          <button className="ql-code-block"></button>

          <button
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            ❤️
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
        </div>
        <ReactQuill forwardRef={quillRef} {...options}/>
      </Container>
      <button onClick={getValue}>Test</button>
    </>
  );
};

export default QuillEditor;
