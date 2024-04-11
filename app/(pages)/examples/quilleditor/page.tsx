import dynamic from 'next/dynamic';

const QuillEditor = dynamic(() => import('@/app/components/common/QuillEditor'), { ssr: false });

export default function QuilleditorPage() {
  return <QuillEditor />;
}
