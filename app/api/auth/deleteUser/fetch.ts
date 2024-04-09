export const fetchDeleteUser = async () => {
  const res = await fetch('/api/auth/deleteUser', { method: 'POST', body: JSON.stringify({}) });

  const jsonData = await res.json();
  return jsonData;
};
