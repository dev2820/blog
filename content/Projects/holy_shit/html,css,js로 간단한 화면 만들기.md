+++
title= "Html,css,js로 간단한 화면 만들기 1"
date= 2021-04-17T00:53:40+09:00
categories= ["projects"]
tags= ["프로젝트","게임","똥피하기","로그인폼"]
subcategories = ["holy_shit"]
cover = ""
icon = "projects/project-icon.png"
draft= false
+++
## 준비사항
HTML,CSS관련 책을 읽고 (아니면 생활코딩인강이라도 듣고) 아주 간단한 HTML파일, CSS파일을 작성할 수 있는 능력은 갖춰야합니다. (하루면 준비 완료합니다.)

## 학습 목표
HTML,CSS를 공부하고 사용해 간단한 로그인 페이지, 회원가입 페이지를 만들어본다.

## 시작하기
서버를 구축하고 웹을 서비스하기 전, 간단한 로그인 폼과 회원가입 폼을 지닌 HTML,CSS로 구성된 로그인 페이지, 회원가입 페이지를 만들어 보기로 했습니다. react나 vue같은 frame work 없이 순수 html,css로 화면을 구성할 것입니다.

form을 사용하고 http로 login request를 보내기 전, 정말정말 간단하게 화면을 구성하고 정말정말 간단한 CSS를 적용해 보는 것을 목적으로 했습니다. 

{{<figure-img src="../images/로그인화면.png" alt="semantic struct">}}
login page 목업
{{</figure-img>}}
{{<figure-img src="../images/회원가입화면.png" alt="semantic struct">}}
signup page 목업
{{</figure-img>}}

제가 개요때 Figma로 만들었던 로그인화면 목업과 회원가입 화면 목업입니다.

팀원들에게 HTML,CSS 책을 읽고(또는 인강을 듣고) html,css를 만들 준비가 된 상태에서 이 화면을 팀원들에게 각각 html과 css로 구현해 보는 것을 요청했습니다.

{{<figure-img src="../images/html-css-login.png" alt="semantic struct">}}
만들어진 login page 결과물
{{</figure-img>}}

{{<figure-img src="../images/html-css-signup.png" alt="semantic struct">}}
만들어진 signup page 결과물
{{</figure-img>}}

login page는 경로를 잘못설정해서 이미지가 안나오지만 이미지 저작권 문제가 있을 수 있어서 그냥 나뒀습니다. 

초보자스러운 결과가 나왔지만 만족스러웠습니다. 팀원들이 잘 모르는 부분을 구글링해봤고 요구하지 않은 기능들도 추가하기 위해 곳곳에 노력한 흔적이 보였거든요. 

## 어려워 했던 점들, 몰랐던 점들
팀원들이 어려워 했던 점들은 다음과 같습니다.

- 어떤 TAG를 사용해야 하는지 모르겠다.
- 어떤 CSS를 적용해야 하는지 모르겠다.

사실 처음 HTML을 작성하다 보면 tag간 구별이 어렵습니다. `<div>`와 `<span>`의 차이가 뭔지, 또 무슨 태그가 있는지 몰라서 아는 태그에 css만 적용해서 사용하는 문제를 겪게 됩니다. 즉 semantic하게 코드를 짜지 못하죠.

CSS를 하다보면 나는 이런 effect를 적용해보고 싶고 그런 effect가 적용된 웹페이지들을 봤는데 그런 페이지는 어떻게 하면 만들 수 있는지 무슨 property가 있는지 어려웠던 것 같습니다.

'구글링 하면 되지 않아?' 라고 생각해도 keyword를 모르면 어떻게 검색해야하는지도 막막합니다. 알고 검색하는 것과 모르고 검색하는 것에 얻을 수 있는 정보의 질적인 차이가 크게 나죠.

### 어떤 tag를 사용해야 하는가?
회원가입 페이지를 만들어온 팀원이 id, password를 입력할 `<input>` 태그를 세로로 배치할 때 `<table>`을 사용해서 배치를 했습니다. 물론 결과는 그럴싸하게 나왔습니다. 하지만 `<table>`태그는 최고의 선택은 아니었습니다.

html tag는 semantic하게 짜야합니다. semantic하다는 것은 **의미에 맞게 사용한다**라는 뜻이죠. 

우리는 화면에 제목을 작성할 때 `<h1>`태그를 사용하지만 왜 `<h1>`태그를 써야하는지 모릅니다. 그냥 `<span>`,`<div>`로 제목을 작성해도 `<h1>`태그를 사용한 것과 비슷한 결과를 볼 수 있습니다. css를 적용하면 똑같게 만들 수 있습니다.

그럼 왜 코드를 semantic하게 짜야할까요? semantic한 html엔 다음과 같은 이점이 있습니다. 

1. 다른 사람이 내 코드를 볼 때 편해진다.
2. 모바일 환경에서 유리하다.
3. SEO에 더 좋다.

SEO가 뭔지, 모바일 환경에선 어떻게 달라지는지 몰라도 됩니다. 1번 이유 만으로도 semantic하게 짜야할 이유는 충분합니다. semantic html 페이지의 코드는 협업하는 사람들에게 더 직관적으로 배치를 보여줍니다. 다른 사람이 보지 않더라도 내가 짠 코드를 3년 뒤에 다시 보면 코드가 직관적으로 다가오지 않을 수 있습니다.

semantic한 코드는 이런 점을 방지해 줍니다. 누가봐도 `<article>`태그엔 핵심 컨텐츠가 들어있고, `<h1>`태그에 제목이 들어있습니다. 

semantic한 코드를 짜는게 초보자에겐 부담일수도 있습니다. 일단 무슨 tag가 있는지 모르고 그 태그의 의미와 css차이를 외우고 있을 순 없습니다.(배울게 산더미인데 tag에 붙잡혀 있을 순 없죠.) 다만, semantic하게 html을 짜야한다는 것을 기억하고 semantic이라는 keyword를 기억했다 구글링할때 `semantic html tags` 정도 검색할 수 있으면 됩니다.

저는 적당한 tag가 떠오르지 않으면 아래 사이트들을 참고합니다.

https://developer.mozilla.org/ko/docs/Web/HTML  
https://www.w3schools.com/tags/default.asp

mdn,w3schools의 다른 컨텐츠들도 너무 좋으니 초보라면 읽어보는 것도 좋습니다.

### 어떤 CSS를 사용해야 하는가?
팀원들이 구현하고 싶어 했지만 못한 점들이 있습니다.

- 버튼에 커서가 올라가면 클릭모양 커서로 바뀌게 하고 싶다.
- input을 클릭하면 밖에 검은 태두리가 생기는데 없애고 싶다.

좀 개인적인 견해입니다만, CSS 실력은 얼마나 많은 css keyword를 기억하는지가 결정하는 것 같습니다. 너무나 많은 css 속성들이 있고, 속성값이 있습니다. 다들 유용하고 잘 사용하면 JavaScript를 사용하지 않아도 될 정도로 강력한 기능들도 있습니다. 근데 너무 많아요. 외울 수 없습니다. 따라서 우리는 css keyword들을 잘 기억해야합니다. 

예를 들면 특정 요소 위에서 커서 모양은 `cursor`속성이 결정합니다.
input을 클릭하면 생기는 검은 태두리는 `:focus` 의사 클래스가 작동한 결과입니다. 이런 `cursor`, `:focus`같은 keyword를 기억해야합니다. 많이 써보고 익숙해져야 하는 부분입니다. 저는 두꺼운 순수 CSS책 한권을 읽어서 공부했습니다. (책 이름이 기억 안나는데 매우 두꺼웠습니다.) 다 이해할 필요 없고 1회독으로도 충분합니다. 다 읽고 나면 적어도 '아 이런 효과를 내는 css가 있었는데?'라는 생각 정도는 할 수 있거든요. 다들 웹공부 시작을 어떻게 하는지는 모르겠지만, 보통 html,css,javascript가 묶여있는 라이트한 책으로 시작한다면, css나 js만 다루는 책을 한 권 읽어보는 것을 추천드립니다. js는 특히 더더더욱요.

적용하고 싶은 effect, css가 있는데 뭘 써야하는지 모르겠다면, 남들이 잘 만들어놓은 코드를 참고하면 됩니다. 대충 **만들어 보고싶은 effect or element + css**로 검색하면 다른 사람들이 만들어놓은 코드들을 볼 수 있습니다. 예를 들어 구글에 `searchbar css`,`button hover effect css`를 검색해보면 사람들이 만들어 놓은 예쁘고 훌륭한 결과물들이 많습니다. codepen으로 만드는 법을 같이 올려놓는 경우도 많은데 이런 코드를 긁어다 쓰지 말고 css를 조금씩 변경해보며 어떻게 해서 이런 effect가 만들어졌는지 연구해보세요. css실력이 빠르게 늘겁니다. 남들이 짜놓은 코드에서 알게되는 속성들도 많구요.

## 의미론적 html, css 선택자
읽어보면 좋을 내용을 정리해서 올려놨습니다. 한번 읽어보세요.
{{<a_blank href="https://dev2820.github.io/study/html-css-browser/%EC%9D%98%EB%AF%B8%EB%A1%A0%EC%A0%81-html/">}}의미론적 html{{</a_blank>}}

{{<a_blank href="https://dev2820.github.io/study/html-css-browser/css-%EC%84%A0%ED%83%9D%EC%9E%90/">}}css 선택자{{</a_blank>}}

## 마치며
이제 간단한 웹페이지(front)를 만들어봤으니 페이지를 서비스할 서버를 만들어봐야겠죠. 다음 글은 node.js에 대한 글이 될 것 같습니다.