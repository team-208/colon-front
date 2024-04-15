'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import hljs from 'highlight.js';
import { debounce } from 'lodash';
import 'highlight.js/styles/github.css';
import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';

interface Props {
  setHTML: (value: string) => void;
  initValue?: string;
}

const ToolbarContainer = styled.div`
  border-color: #919191 !important;
  border-bottom: none !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-bottom: 0 !important;
`;

const Container = styled.div`
  width: 100%;
  min-height: 300px;
  max-height: 300px;
  border: 1px solid #919191;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: auto;

  .ql-container.ql-snow {
    border: none;
  }
`;

hljs.configure({
  languages: ['javascript', 'typescript', 'ruby', 'python', 'java', 'cpp', 'kotlin', 'sql'],
});

const options = {
  modules: {
    syntax: {
      highlight: (text: any) => hljs.highlightAuto(text).value,
    },
    toolbar: '#toolbar-container',
  },
  placeholder:
    '질문에 대한 구체적인 설명을 해주세요.\n상황을 설명해주시면 더욱 좋은 답변을 받으실 수 있어요!\n\nex.',
  theme: 'snow', // or bubble
};

const QuillEditor = (props: Props) => {
  const { setHTML, initValue } = props;
  const editorRef = useRef<ReactQuill | null>(null);

  const handleClickContainer = useCallback(() => {
    if (!editorRef.current) return;
    editorRef.current.focus();
  }, []);

  const handleChangeEditor = useCallback(
    debounce((v: ReactQuill.Value) => {
      setHTML(v.toString());
    }, 300),
    [setHTML],
  );

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.onEditorChange = (eventName) => {
        if (eventName === 'text-change') {
          handleChangeEditor((editorRef.current as ReactQuill).value);
        }
      };

      if (initValue) {
        editorRef.current.value = initValue;
      }
    }
  }, [initValue]);

  return (
    <>
      <ToolbarContainer id="toolbar-container">
        <span className="ql-formats">
          <select className="ql-font"></select>
          <select className="ql-size"></select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-underline"></button>
          <button className="ql-strike"></button>
        </span>
        <span className="ql-formats">
          <select className="ql-color"></select>
          <select className="ql-background"></select>
        </span>
        <span className="ql-formats">
          <button className="ql-script" value="sub"></button>
          <button className="ql-script" value="super"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-header" value="1"></button>
          <button className="ql-header" value="2"></button>
          <button className="ql-blockquote"></button>
          <button className="ql-code-block"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
          <button className="ql-indent" value="-1"></button>
          <button className="ql-indent" value="+1"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-direction" value="rtl"></button>
          <select className="ql-align"></select>
        </span>
        <span className="ql-formats">
          <button className="ql-link"></button>
          <button className="ql-image"></button>
          <button className="ql-video"></button>
          <button className="ql-formula"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-clean"></button>
        </span>
      </ToolbarContainer>
      <Container id="container" onClick={handleClickContainer}>
        <ReactQuill {...options} ref={editorRef} />
      </Container>
    </>
  );
};

export default QuillEditor;
