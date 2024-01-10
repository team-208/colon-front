# Boilerplate - NextJS, typescript

## Directory Structure

- app
  - (pages)
  - apis : _**하위 README 필독.**_
    - [domain dir]
      - mutation dir
      - query dir
      - api.ts
      - key.ts
      - type.d.ts
  - components : _**하위 README 필독.**_
    - common
    - [process dir]
      - [inner pages dir]
      - [component].ts
      - constants.ts
      - type.d.ts
  - constants
  - hooks
  - libs
  - recoils
  - styles
  - types
  - utils
  - README.md

## branch 전략 (임시 선정. 논의 후 교체 가능성 있음.)

- main: 상용 branch. _**(프로젝트 초기 상태에선 main에서 바로 작업 할것.)**_
- develop: 상용 배포전 테스트용 branch. 상용 배포시 main으로 merge.
- feature/개발사항: 페이지 또는 기능 개발시 develop branch에서 생성.
- hotfix/개발사항: hotfix 적용 필요시 main에서 생성하고 개발 완료 후, main과 develop 둘 다에 merge.

## commit 규칙 (임시 선정. 논의 후 교체 가능성 있음.)

- [prefix]: 개발사항 개조식으로 작성.
- prefix 종류
  - feat: 개발 사항
  - fix: 버그 수정
- ex. feat: 메인 페이지 퍼블리싱.

## pr 규칙 (임시 선정. 논의 후 교체 가능성 있음.)

- 개발사항
  - 해당 branch에서 작업한 commit list
- 참고사항
  - 질문 / 해당 이슈와 관련하여 숙지되어야 할 사항 기록
- ex.

```
개발사항
- feat: 메인 페이지 퍼블리싱.
- feat: 메인 페이지 api 연동.
- fix: 메인 페이지 favicon 변경.
- fix: pacakage.json script 수정.

참고사항
이것은 참고사항입니다. 자유롭게 기입해 주세요. 무엇이든.
```

## Tech Stack

### CSS - styled-component

- 고려한 lib: emotion / styled component / tailwind
- styled component: css props를 채택한 이유
  - 구성원 모두 경험한적 있는 기술 스택으로 러닝커브를 줄여 비즈니스 로직에 집중하는 것이 목적.
  - 다만 디자인 시스템 도입 확정시, token 별도 정의 후 import 필요.

### Async State - tanstack(구 react-query)

- 고려한 lib: tanstack / swr
- tanstack을 채택한 이유
  - swr에 비해 커스텀 할 수 있는 기능들이 많아 비동기 처리(대표적으로 캐싱 처리)에 대한 사용하면서 이해도를 높일 수 있음.
  - 오랫동안 가장 많이 사용되는 lib이기 때문에 레퍼런스가 많음.

### Global State - recoil

- 고려한 lib: redux & redux toolkit / recoil / zustand
- recoil을 채택한 이유
  - facebook팀에서 지속적인 관리.
  - react hook과 사용법이 유사해 직관적이면 간단. 적은 러닝 커브.
  - redux 대비 보일러 플레이트 코드가 적음.
    - redux toolkit으로 리듀서, 액션타입, 액션 함수 등을 한번에 선언해서 편리성이 증가하였지만, 여전히 recoil 대비 관리 포인트가 많음.
  - jotai, zustand에 비해 레퍼런스가 많음.

### form lib - react hook form (임시 선정. 논의 후 교체 가능성 있음.)

- 고려한 lib: tanstack form vs formik vs react-hook-form
- react hook form을 채택한 이유.
  - npm 다운로드가 react hook form이 압도적.
  - 번들 size: 429 / 13.2kb / 10kb로 가장 작음.
