## dir 구조.

- components
  - [프로세스별 기준 dir]
    - [component].ts: 해당 프로세스 내에서 공통 components
    - [innerPage dir]: 해당 프로세스 하위 페이지에서만 쓰이는 components
    - constants.ts: 해당 프로세스에서 공유하는 상수값
    - type.d.ts: 해당 프로세스에서 공유하는 interface & field types

## 프로세스별로 dir 기준 할 것.

- 전제사항: url 첫번째 구분자는 프로세스를 기준으로 설정
- ex. ~/sample/innerPage 에서 쓰이는 component는 app/components/sample/innerPage 에 만들것.
