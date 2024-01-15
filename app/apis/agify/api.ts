const getAgify = async (name: string) => {
  const res = await fetch(`https://api.agify.io?name=${name}`, {
    method: 'GET',
  });

  return await res.json();
};

const postAgify = async (body: Agify.postAgifyRequest) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: 'POST',
    body: JSON.stringify({ ...body }),
  });

  return await res.json();
};

const AgifyAPI = {
  getAgify,
  postAgify,
} as const;

export default AgifyAPI;
