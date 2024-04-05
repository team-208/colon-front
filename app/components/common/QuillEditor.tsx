'use client';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';
// import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const options = {
  placeholder:
    '질문에 대한 구체적인 설명을 해주세요.\n 상황을 설명해주시면 더욱 좋은 답변을 받으실 수 있어요!',
  theme: 'bubble', // or snow
};

const QuillEditor = () => {
  return <ReactQuill {...options} />;
};

export default QuillEditor;
