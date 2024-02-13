declare namespace Agify {
  // [GET]: https://api.agify.io?name=${name} Response
  interface getAgifyResponse {
    count: number;
    name: string;
    age: number;
  }

  // [POST]: https://api.agify.io?name=${name} Request
  interface postAgifyRequest {
    name: string;
  }

  // [POST]: https://api.agify.io?name=${name} Response
  interface postAgifyResult {
    id: number;
  }
}

export as namespace Agify;
