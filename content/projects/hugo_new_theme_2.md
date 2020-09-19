---
title: "Hugo_new_theme"
date: 2020-09-18T16:10:55+09:00
categories: ["projects"]
series: ['휴고 테마 만들기']
tags: ["project","DIY"]
cover: ""
draft: true
---

## 글머리 

앞서 만들어진 구조를 천천히 살펴보며 페이지 제작 구상을 좀 해봅시다.

우선 보여주는 부분을 꾸며야 하니 layouts을 보겠습니다.

layouts 폴더는 _default, partials, 404.html, index.html
로 구성되어 시작됩니다.

## _default
_default 폴더 안에는 baseof.html, list.html, single.html이 주어집니다. 열어보면 list.html, single.html은 비어있고 baseof.html에 가이드 템플릿이 주어진 것을 확인할 수 있습니다.

```html
<!DOCTYPE html>
<html>
    {{- partial "head.html" . -}} --------------(1)
    <body>
        {{- partial "header.html" . -}} --------(2)
        <div id="content">
        {{- block "main" . }}{{- end }} --------(3)
        </div>
        {{- partial "footer.html" . -}}
    </body>
</html>
```

(1)에 들어가는 head.html은 partials 폴더 안에 정의되어있습니다. 물론 비어있지만말입니다. head.html은 말 그대로 html의 head 부분을 정의하는 곳입니다. 

```html
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dev2820 개발 블로그</title>
    ...
    <link>
    ...
    <script></script>
    ...
</head>
```
대충 위와 같이 필요한 link(cdn), script, title 등 head에 들어갈 내용들을 정의해놓으면 필요하면 (1)과 같이 가져다 붙일 수 있습니다.

(2)도 마찬가지로 header를 만들고 필요한 내용을 넣으면 됩니다. 위 코드에서 눈치챌 수 있듯이 partials 폴더의 html 파일들은 
```
{{ partial "[파일이름].html" . }}
```
형식으로 가져올 수 있습니다. 

(3) 은 조금 다른 형식입니다. "main"블록을 가져오라고 되어있는데 이 "main"은 어디에도 정의되어있지 않습니다.

바로 _default 폴더에 들어갈 html 파일들입니다. _default 폴더에 들어간 파일들에 정의된 내용을 바탕으로 해당 파일들의 block을 가져옵니다. 말이 어려우니 직접 보면서 이해하는게 빠를 것 같습니다. 

```html
single.html

{{ define "title" }}
    This is the single
    {{ .Title }} &ndash; {{ .Site.Title }}
{{ end }}
{{ define "main" }}
    <h1>{{ .Title }}</h1>
    {{ .Content }}
{{ end }}
```

위 코드는 _default/single.html을 가볍게 작성한 것입니다. (hugo 공식 홈페이지에 나와있는 예시입니다.) 우리가 작성한 글 중 하나를 보여주게 되면 우리는 baseof.html 기반에 single.html을 md 파일에 맞춰 보여주게 됩니다. 사진을 보여주기 어려운 환경이라 말로 설명하는데 어려워도 양해 부탁드립니다. ㅜ

예를 들어 content/projects/hello_hugo.md 라는 파일이 있다고 합시다. 
우리가 만든 hugo 블로그를 통해 `hello_hugo.md` 파일을 보려면 우리는 `hello_hugo.md`를 `html`로 변환해줘야합니다. 이 때 보여줄 화면의 기본 베이스는 `_default/baseof.html` 파일이 됩니다. 그리고 보여줄 화면이 하나의 md 파일이기 때문에 hugo는 이 페이지를 single페이지라 판단하고 `single.html`을 `baseof.html`위에 가져옵니다. 따라서 `baseof.html`에서 
`{{- block "main" .}}{{- end}}` 코드는 `single.html` 파일에 main 이라고 정의된 (`{{define "main" }} ~ {{ end }}`) 블록을 가져옵니다. 
마찬가지로 baseof.html에 `{{-block "title" . }}{{-end}}`를 삽입한다면 `single.html`의 `{{define "title" }} ~ {{ end }}` 를 가져오겠죠?
그리고 보려는 페이지가 single이 아니라면 다른 html에서 block을 가져올 것입니다. 

설명하고보니 두서가 없는데 나중에 hugo의 block 시스템에 대해 자세히 기술하겠습니다.

### list.html
list.html은 글들의 섹션 리스트와 taxonomy 리스트를 보여줄 때 사용됩니다.

각 콘텐츠 폴더에는 `_index.md` 파일을 정의할 수 있는데 예를 들어 보겠습니다.

```
└ content
    └ projects
        └ _index.md
        └ my_project.md
        └ hugo_project.md
```
hugo content의 폴더 구조가 위와 같다고 하겠습니다. 우리가 블로그에서  projects 글들에 대한 글 리스트를 제공할 때 `_index.md`파일을 추가해주면 list.html에서 이 md파일을 가져와 추가적인 정보를 제공할 수 있습니다.

_index.md 파일 내용
```md
---
title: test
date: 2020-09-19
publishdate: 2020-09-19
---

test 1 2 3
```

`content/projects/_index.md` 파일을 다음과 같이 저장했다고 합시다. 

list.html
```html
{{ define "main" }}
<main>
    <article>
        <header>
            <h1>{{.Title}}</h1>
        </header>
        {{.Content}}
    </article>
    <ul>
    {{ range .Pages }}
        <li>
            <a href="{{.Permalink}}">{{.Date.Format "2006-01-02"}} | {{.Title}}</a>
        </li>
    {{ end }}
    </ul>
</main>
{{ end }}
```
list.html은 gohugo.io 에 나온 예시대로 작성해 봤습니다. 이렇게 되면 '[블로그주소]/projects/' 에 접속하게 되면 `{{.Title}}`은 'test'로, `{{.Content}}`는 'test 1 2 3'으로 대체된 것을 확인할 수 있습니다. 