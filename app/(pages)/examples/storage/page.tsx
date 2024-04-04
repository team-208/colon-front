'use client';

import { useState } from 'react';
import styled from 'styled-components';
import useProfileMutation from '../../../api/auth/profile/mutations';

const ContainerMain = styled.main`
  margin-top: 50px;
  padding: 0 200px;
`;

export default function StoragePage() {
  // states
  const [files, setFiles] = useState<File>();

  // hooks
  const { mutateAsync } = useProfileMutation();

  // events
  const handleFilesChange = (e: any) => {
    setFiles(e.target.files[0]);
  };

  const uploadFiles = async (e: any) => {
    if (!files) {
      return;
    }
    const res = await mutateAsync(files);

    if (!res.success) {
      console.error('upload fail!');
    }
  };

  return (
    <ContainerMain>
      <p>로그인 후 업로드</p>
      <div>
        <input type="file" accept="image/png, image/jpeg" onChange={handleFilesChange} />
        <button onClick={uploadFiles}>upload</button>
      </div>
    </ContainerMain>
  );
}
