const getAgify = async (name: string) => {
  const res = await fetch(`https://api.agify.io?name=${name}`, {
    method: 'GET',
  });

  if (!res.ok) {
    // error code 별 분기 작업 필요.
    const message = (await res.json()).error;
    throw new Error(message);
  }

  return await res.json();
};

const postAgify = async (body: Agify.postAgifyRequest) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: 'POST',
    body: JSON.stringify({ ...body }),
  });

  if (!res.ok) {
    // error code 별 분기 작업 필요.
    const message = (await res.json()).error;
    throw new Error(message);
  }

  return await res.json();
};

const AgifyAPI = {
  getAgify,
  postAgify,
} as const;

export default AgifyAPI;
