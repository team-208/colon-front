'use client';

import { useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import ReactQuill from 'react-quill';
import hljs from 'highlight.js';
import { debounce } from 'lodash';
import 'highlight.js/styles/github.css';
import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';

interface Props {
  setEditor: (editor: ReactQuill.UnprivilegedEditor) => void;
  initValue?: string;
}

const EditorContainer = styled.div`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.line.solid.normal};
`;

const ToolbarContainer = styled.div`
  position: relative;
  border: none !important;
  border-bottom: 1px solid ${({ theme }) => theme.color.line.solid.normal} !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-bottom: 0 !important;
  z-index: 2;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 258px;
  max-height: 258px;
  overflow: auto;
  z-index: 1;

  .ql-container {
    ${({ theme }) => theme.font.body1};
  }

  .ql-container.ql-snow {
    border: none;
  }

  .ql-editor.ql-blank::before {
    ${({ theme }) => theme.font.body1};
    color: ${({ theme }) => theme.color.interaction.inactive};
    font-style: normal;
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    min-height: 144px;
    max-height: 144px;

    .ql-editor.ql-blank::before,
    .ql-container {
      ${({ theme }) => theme.font.body2};
    }
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
    '질문에 대한 구체적인 설명을 해주세요.\n상황을 설명해주시면 더욱 좋은 답변을 받으실 수 있어요!',
  theme: 'snow', // or bubble
};

const QuillEditor = (props: Props) => {
  const { setEditor, initValue } = props;
  const editorRef = useRef<ReactQuill | null>(null);

  const handleClickContainer = useCallback(() => {
    if (!editorRef.current) return;
    editorRef.current.focus();
  }, []);

  const handleChangeEditor = useCallback(
    debounce((content, delta, source, editor) => {
      setEditor(editor);
    }, 350),
    [setEditor],
  );

  return (
    <EditorContainer onClick={handleClickContainer}>
      <ToolbarContainer id="toolbar-container">
        {/* <span className="ql-formats">
          <select className="ql-font"></select>
          <select className="ql-size"></select>
        </span> */}
        <span className="ql-formats">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          {/* <button className="ql-underline"></button>
          <button className="ql-strike"></button> */}
        </span>
        <span className="ql-formats">
          <select className="ql-color"></select>
          <select className="ql-background"></select>
        </span>
        {/* <span className="ql-formats">
          <button className="ql-script" value="sub"></button>
          <button className="ql-script" value="super"></button>
        </span> */}
        <span className="ql-formats">
          {/* <button className="ql-header" value="1"></button>
          <button className="ql-header" value="2"></button> */}
          <button className="ql-blockquote"></button>
          <button className="ql-code-block"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
          {/* <button className="ql-indent" value="-1"></button>
          <button className="ql-indent" value="+1"></button> */}
        </span>
        {/* <span className="ql-formats">
          <button className="ql-direction" value="rtl"></button>
          <select className="ql-align"></select>
        </span> */}
        <span className="ql-formats">
          <button className="ql-link"></button>
          <button className="ql-image"></button>
          {/* <button className="ql-video"></button>
          <button className="ql-formula"></button> */}
        </span>
        {/* <span className="ql-formats">
          <button className="ql-clean"></button>
        </span> */}
      </ToolbarContainer>
      <Container onClick={handleClickContainer}>
        <ReactQuill
          {...options}
          ref={editorRef}
          defaultValue={initValue}
          onChange={handleChangeEditor}
        />
      </Container>
    </EditorContainer>
  );
};

export default QuillEditor;
