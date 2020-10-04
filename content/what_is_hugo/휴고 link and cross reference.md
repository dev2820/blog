+++
title = "휴고 Link and Cross Reference"
date = 2020-10-01T21:25:59+09:00
categories = ["what_is_hugo"]
tags = ["hugo","휴고","ref and relref"]
banner = ""
draft = false
+++

이번엔 휴고의 Reference에 대한 글입니다. 특정 문서로 가는 링크를 만드는 `rel`,`relref` shortcode에 대해 다룹니다. 이 두 shortcode는 각각 한 문서로 가는 절대 경로와 상대 경로를 보여줍니다.

https://gohugo.io/content-management/cross-references/

## Use `ref` and `relref`

```md
{ {< ref "document" >} }
{ {< ref "document#anchor" >} }
{ {< ref "document.md" >} }
{ {< ref "document.md#anchor" >} }
{ {< ref "#anchor" >} }
{ {< ref "/blog/my-post" >} }
{ {< ref "/blog/my-post.md" >} }
{ {< relref "document" >} }
{ {< relref "document.md" >} }
{ {< relref "#anchor" >} }
{ {< relref "/blog/my-post.md" >} }
```
특정 주소로 가는 하이퍼링크를 마크다운 안에서 생성하려면 다음과 같이 입력합니다.

```md
[About]({ {< ref "/about" >} }) "About me")
```

[About]({{< ref "/about" >}}) "About me")

`rel`과 `relref` shortcode는 하나의 파라미터만이 필요한데, 바로 특정 컨텐츠로 가는 주소입니다. 파일 확장자나 anchor를 포함해도 좋습니다.

주소의 시작을 `/` 로 주지 않는다면 현재 주소를 기준으로 링크를 생성합니다.

### Link to another language version

다른 언어 버전의 문서로 가는 링크를 만들려면 다음과 같은 문법을 쓰면 됩니다.

```md
{ {< relref path="document.md" lang="ja" >} }
```

### Get another Output Format

다른 포멧의 문서로 가는 링크를 만들땐 다음과 같이 합니다. 

```md
{ {< relref path="document.md" outputFormat="rss" >} }

### Heading IDs

마크다운 문서를 컨텐츠로 렌더링 할때 휴고는 페이지의 모든 head 태그에 아이디를 붙입니다. 다음과 같은 방식으로요.

```md
## Reference
```
렌더링된 결과:
```html
<h2 id="reference">Reference</h2>
```

이 ID는 문서의 특정부분으로 가는 permalink를 만드는데 쓰입니다.

```md
{ {< ref "document.md#reference>} }
{ {< relref "document.md#reference>} }
```

다음과 같은 방식으로 원하는 ID를 달아줄 수도 있습니다.

```md
## Reference A {#foo}
## Reference B {id="bar"}
```
렌더링된 결과:
```html
<h2 id="foo">Reference A</h2>
<h2 id="bar">Reference B</h2>
```

만일 같은 아이디가 여러개 오는 경우가 생기면 다음과 같이 아이디가 붙습니다.

```md
## Reference
## Reference
## Reference
```
렌더링된 결과:
```html
<h2 id="reference">Reference</h2>
<h2 id="reference-1">Reference</h2>
<h2 id="reference-2">Reference</h2>
```

## Ref and RelRef Configuration
`config` 파일에 설정해 줄 수 있는 `ref`와 `relref` 과 관련된 설정입니다. 괄호 안은 default 값입니다.

**refLinksErrorLevel("ERROR")**  
`ref`과 `relref`로 연결되는 페이지 링크가 사용되고, 그 링크가 없는 페이지로 이동하게 된다면(즉 실패한다면) "ERROR" 나 "WARNING" 값을 로그에 남깁니다. "ERROR"가 나는 경우는 에초에 build 단계에서 실패합니다.

**refLinksNotFoundURL**  
없는 링크로 연결될 경우 제공할 NotFound 페이지 URL을 입력합니다.

## 마치며
다음글은 '휴고 URL mangement' 입니다.