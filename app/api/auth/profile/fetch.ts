export const fetchProfileUpload = async (profile: File) => {
  const body = new FormData();
  body.append('profile', profile);

  const res = await fetch('/api/auth/profile', {
    method: 'POST',
    body: body,
  });

  const jsonData = await res.json();
  return jsonData;
};
