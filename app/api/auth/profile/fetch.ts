export const fetchProfileUpload = async (requestBody: FormData) => {
  const res = await fetch('api/auth/profile', {
    method: 'POST',
    body: requestBody,
  });

  const jsonData = await res.json();
  return jsonData;
};
