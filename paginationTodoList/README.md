## To do list 페이지네이션 구현

- json-server를 활용해서 페이지네이션 구현

### 페이지네이션 이론

페이지네이션을 구현하기 위한 설정값

- currentPage: 현재 페이지
- totalCount: 총 데이터의 갯수
- pageCount: 화면에 나타날 페이지 갯수
- limit: 한 페이지 당 나타낼 데이터의 갯수

![](https://user-images.githubusercontent.com/16531837/145595161-ceb09871-bfe2-4a33-9e65-b53b0bd9d89f.png)

- currentPage: 1
- totalCount: 53 (totalCount는 임의 설정)
- pageCount: 5
- limit: 5

### json-server

https://github.com/typicode/json-server

Start JSON Server : `json-server --watch db.json`
