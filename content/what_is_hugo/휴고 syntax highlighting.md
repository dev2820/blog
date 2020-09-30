---
title: "휴고 Syntax Highlighting"
date: 2020-09-27T15:09:40+09:00
categories: ["what_is_hugo"]
tags: ["hugo","휴고","highlight","code fence"]
cover: ""
draft: false
---

이번글엔 컨텐츠에 들어가는 code fences에 테마 및 highlight 적용하는 방법이 들어갑니다. hightlight를 적용하는 방법은 여러가지가 있지만, 그 중에서도 딱 한가지 code fence에서 highlighting 적용하는 방법만 다루겠습니다. 

## Syntax Highlighting

https://gohugo.io/content-management/syntax-highlighting/

code fence가 뭔지 모르실 분들을 위해 설명하자면 이겁니다.

<code>
```js
console.log('hello javascript');
```
</code>
이런식으로 markdown 파일에 넣으면 html로 렌더링될때 <pre><code>로 변환되는 얘들이 code fence입니다.

그런데 이 code fence의 테마나 css를 적용해주지 않으면 여러분이 다른 블로그에서 보시던 멋진 highlight가 적용되지 않은체 컨텐츠가 생성됩니다.

휴고에서는 go로 만들어진 **chroma** 라는 code highlighter를 제공합니다. 

사용법은 다음과 같습니다.
`config` 파일에 다음 세 줄을 추가합니다.

```toml
pygmentsCodefences = true
pygmentsStyle = "dracula"
pygmentsOptions = "linenos=table"
```
맨 위 `pygmentsCodefences = true`는 코드 하이라이팅을 쓴다는 뜻입니다. 꼭 넣어주세요

두 번째 `pygmentsStyle`은 사용할 테마입니다. 테마 없으면 밋밋하잖아요. 넣어주면 됩니다. 다른 테마를 쓰시는 분은 아래 링크를 참조해서 하나 넣어주시면 됩니다.

https://xyproto.github.io/splash/docs/all.html

세 번째 `pygmentsOptions`는 말그대로 옵션입니다. 사용 가능한 옵션은 다음과 같습니다.

* linenos: 줄번호를 넣어줄지 결정하는 옵션입니다. false를 넣어주면 줄번호가 안나오고 table을 넣어주면 줄번호가 나옵니다.
* hl_lines: 배열인데 특정 줄을 강조할때 사용하는 옵션입니다. 8번줄과 15~17줄을 강조한다면 hl_lines=[8,"15-17"] 이렇게 넣어주면 됩니다.
* linenostart: 줄번호를 몇번부터 시작할지 정해주는 옵션입니다. `linenostart=1` 이런식으로 쓰면 됩니다.

옵션이 두개 더있는데 필요하면 맨 위 링크에서 찾아보시길 권합니다. 

### Highlighting in Code Fences
이번엔 옵션을 마크다운파일 안의 code fence에 직접 적용하는 방법을 알려드리겠습니다.

<pre>
<code>
```go {linenos=table,hl_lines=[8,"15-17"],linenostart=199}
//code
```
</code>
</pre>
이렇게하면 됩니다. 참 쉽죠?

### chorma가 어떤 언어에 highlight를 지원하는지?

https://gohugo.io/content-management/syntax-highlighting/#list-of-chroma-highlighting-languages

위 링크에 나와있는데, 대충 다있다고 보면 됩니다. 필요한 분들만 찾아보세요.

## 마무리
이상으로 code fence에 syntax highlight 적용하는 방법을 알아봤고 다음글에서는 연관성 있는 컨텐츠 검색에 대하여 알아보겠습니다.