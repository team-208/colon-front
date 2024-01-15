declare namespace Agify {
  // [GET]: https://api.agify.io?name=${name} Response
  interface getAgifyResponse {
    count: number;
    name: string;
    age: number;
  }
}

export as namespace Agify;
