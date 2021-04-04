+++
title= "HTML 렌더링 과정"
date= 2021-04-03T14:35:24+09:00
categories= ["study"]
subcategories = ["html"]
tags= ["study","컴퓨터 기술","공부정리","HTML","web"]
cover= ""
icon = "study/computer_science_icon.png"
draft= true
+++

팀프로젝트를 진행하던 중 갑자기 html 렌더링 과정이 궁금해졌습니다. 인터넷 뒤적이며 조사한 내용을 바탕으로 작성한 글이니 부정확할 수 있습니다. 오타, 오류 지적 환영입니다.

## 렌더링 엔진
브라우저마다 사용하는 엔진이 다릅니다. 크로미움이 자바스크립트를 실행할 때 V8 엔진을 쓰고 파이어폭스는 SpiderMonkey엔진을 사용하듯, HTML과 CSS를 렌더링할 때도 서로 다른 엔진을 사용합니다. 이 HTML, CSS 렌더링 엔진을 **렌더링 엔진**이라고 합니다. 렌더링 엔진은 HTML, CSS를 통해 DOM tree를 만들고, 브라우저의 JS 엔진에 JS 관련 작업을 요청합니다. 

| 브라우저 | JS 엔진 | 레이아웃 엔진 |
|---|:---:|---:|
| Chrome(chromium) | V8 | Blink,Webkit |
| Opera | V8 | Blink,Webkit |
| Firefox | SpiderMonkey | Gecko(Servo) |
| safari | Webkit | Webkit |
| 웨일 | V8 | Blink,Webkit |
  
{{<comment>}}브라우저들의 JS엔진과 레이아웃 엔진{{</comment>}}

요즘은 웹브라우저들이 거의 크로미움 기반이다 보니 V8, Blink 위주로 쓰이는 것 같고, ios때문에 Webkit을 같이 지원하는 것 같네요. 참고로 Blink도 Webkit 기반으로 만들어진 엔진입니다.

## 렌더링 엔진의 작동방식

{{<a_blank href="https://docs.google.com/document/d/1aitSOucL0VHZa9Z2vbRJSyAIsAz24kX8LFByQ5xQnUg/edit">}}How Blink works{{</a_blank>}}  
{{<comment>}}chromium 프로젝트의 blink 문서{{</comment>}}

엔진마다 조금씩 다르겠지만, Blink 엔진에 기반해서 알아봅시다.

Blink 엔진이 하는 일은 다음과 같습니다.
- 웹 명세에 따라 DOM tree 구현
- V8 엔진을 통한 JavaScript 실행
- 네트워크 스택에 리소스 요청(index.html 등등)
- 스타일과 레이아웃 계산
- 크롬 컴포지터를 통해 그래픽스 그리기(화면 연출)

### DOM tree 구현
음... 딱히 설명은 안 하겠습니다.

### V8 엔진을 통한 JavaScript 실행
DOM을 변형, 추가하는 JavaScript 코드는 V8을 통해 실행합니다.

### 네트워크 스택에 리소스 요청
HTML 안에 사용되는 css,js, img 파일들이 기술되어 있고, 화면을 완전히 구현하려면 이 파일들을 받아와야겠죠? 그 요청을 네트워크 스택의 아랫단(Socket,TCP)으로 전달하는 요청을 말합니다.

### 스타일과 레이아웃 계산
스타일 계산은 CSS 선택자를 참조해 어느 요소에 CSS를 적용할지 계산하는 프로세스를 말합니다. 레이아웃 계산은 요소를 어느 위치에 어떠한 크기로 위치할지 계산하는 프로세스를 말합니다.

### 크롬 컴포지터를 통해 그래픽스 그리기
최종적으로 표출될 화면을 생성합니다. 앞서 생성한 DOM tree, 스타일, 레이아웃 계산을 바탕으로 요소의 배치 순서를 고려해 픽셀 단위로 화면을 배치하는 거죠.

조사하다 보니 이 이상 조사하면 심연에 빠지는 것 같아서 여기서 중단하고 다시 HTML 렌더링에 집중해 봅시다.

정리하면 Chrome의 렌더링 엔진은 Blink이고, 렌더러 프로세스는 각 탭 안에 각각의 웹페이지를 띄우는 프로세스입니다. chrome의 경우 Blink 엔진이 이 프로세스에 사용되는 거죠.

## 렌더링 과정
렌더링 과정은 다음과 같습니다.
1. Parsing: DOM(문서 객체 모델),CSSOM(css 객체 모델)을 생성한다.
2. Rendering: DOM과 CSSOM을 기반으로 Render tree를 생성한다.
3. layout: Render tree를 기반으로 viewport내에 요소들의 배치를 결정한다.
4. painting: 픽셀 단위로 실제 화면을 그린다.

### Parsing
`.html`,`.css`파일을 이용해 DOM tree와 CSSOM tree를 생성합니다. DOM tree는 요소들의 부모-자식 관계를 기반으로 생성되고, CSSOM tree도 CSS 선택자 규칙에 맞춰 tree를 생성합니다.

### Rendering
DOM과 CSSOM을 합성하는 과정입니다. 요소 간의 부모-자식 관계와 각 요소에 어떤 CSS가 적용되는지 묘사된 tree를 생성합니다.

#### visibility: hidden vs display:none
재미있게도, 이 과정에서 `visibility: hidden`과 `display:none`의 차이가 드러납니다. `visibility:hidden` 된 요소는 Render tree에 포함됩니다. 반면 `display:none` 된 요소는 Render tree에서 배제됩니다. 웹페이지의 개발자 모드를 켜보면 `display:none`은 아예 요소가 생성도 안 된 것을 볼 수 있죠. 이 점이 성능 차이를 가져오기도 합니다. 당연히 Render tree의 노드 수가 적을수록 속도가 빨라지겠죠.

### layout
이제 생성된 render tree를 실제 화면에선 어떻게 표출할지 정해줘야 합니다. span이 viewport를 기준으로 위에서 몇 px, 왼쪽에서 몇 px 떨어져 있는지 계산하는 단계입니다. 상대적 위치가 절대적 위치로 변환되는 과정이라고 보면 됩니다.

### painting
'페인팅' 또는 '래스터화' 라고 하는 이 단계는 이전 단계에서 계산한 결과를 바탕으로 뷰포트에 실제 픽셀들을 그리는 단계입니다. 스타일이 단순하면 페인팅 속도는 빠르지만, `transform`, `animation`, `box-shadow`,`gradient` 등등, 복잡하고 계산이 들어가는 스타일이 많이 적용될수록 느려집니다.

## 마치며
음... 원래는 복잡하지 않고 간단하겠지? 싶어서 조사하게 됐는데, 뭔가 보면 안 될 심연을 들여다본 기분이네요. 생각보다 복잡하고 조사할 내용이 많았습니다. 하지만 몰랐던 부분을 많이 알게 되어 기분은 좋네요.

## 참고
https://d2.naver.com/helloworld/5237120
https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/
https://developers.google.com/web/updates/2018/09/inside-browser-part1
https://developer.mozilla.org/ko/docs/Web/Performance/How_browsers_work
https://docs.google.com/document/d/1aitSOucL0VHZa9Z2vbRJSyAIsAz24kX8LFByQ5xQnUg/edit
https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=ko