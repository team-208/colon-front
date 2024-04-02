export const fetchProfileUpload = async (profile: File) => {
  const body = new FormData();
  body.append('profile', profile);

  console.log(body);
  const res = await fetch('/api/auth/profile', {
    method: 'POST',
    body: body,
  });

  const jsonData = await res.json();
  return jsonData;
};
