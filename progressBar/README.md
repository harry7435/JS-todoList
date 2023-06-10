## progress bar

- 프로그레스바 구현
- 스크롤을 내리면 상단 바가 스크롤한 길이만큼 늘어남

### 요소 사이즈와 스크롤

https://ko.javascript.info/size-and-scroll

![요소 사이즈와 스크롤](https://media.vlpt.us/images/wiostz98kr/post/dec62e7b-1432-4db2-8154-8539fb0b3689/image.png)

- 자바스크립트로 요소 사이즈나 스크롤 높이 등을 알 수 있음
- 주황색 보더를 기준
  - 보더 바깥쪽: offsetTop, offsetLeft
  - 보더 사이: clientTop, clinetLeft
  - 콘텐츠: clientWidth, clientHeight
  - 보더 포함한 콘텐츠: offsetWidth, offsetHeight
  - 콘텐츠의 전체 길이: scrollHeight
  - 스크롤바의 수직 위치: scrollTop
