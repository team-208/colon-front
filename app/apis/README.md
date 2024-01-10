## apis dir 구조.

- apis
  - [도메인 기준 dir]
    - mutation: 해당 도메인의 mutation hooks
    - query: 해당 도메인의 query & suspense query hooks
    - api.ts: 해당 도메인의 fetch callback
    - key.ts: 해당 도메인 query keys
    - type.d.ts: 해당 도메인 api의 request, response interface & field types
