const getAgify = async (name: string) => {
  const res = await fetch(`https://api.agify.io?name=${name}`, {
    method: 'GET',
  });

  return await res.json();
};

const AgifyAPI = {
  getAgify,
} as const;

export default AgifyAPI;
