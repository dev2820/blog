+++
title = "휴고 Table of Content"
date = 2020-10-02T20:00:12+09:00
categories = ["what_is_hugo"]
tags = ["hugo","휴고","Table of Contents","문서에 목차 달기","목차"]
banner = ""
draft = false
+++

이번글은 문서의 목차를 만드는 방법에 대해 다루겠습니다. 휴고는 markdown 문서를 분석해 자동으로 목차를 만들어줍니다.

https://gohugo.io/content-management/toc/

## Usage

일반적으로 마크다운으로 문서를 만들면 우리는 문서에 헤드를 답니다.
```md
<!-- Your front matter up here -->

## Introduction

One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.

## My Heading

He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.

### My Subheading

A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops
```

휴고는 위 예제에서 `## Introduction`,`## My Heading`,` ### My Subheading` 을 가져와 page 변수 `.TableOfContents`에 저장합니다.

사이트를 빌드하게 되면 `.TableOfContents` 변수는 `<ul>`,헤딩HTML 요소를 지닌 `<li>`여럿 그리고 이 요소를 감싸는 `<nav id="TableOfContents">` element로 바뀝니다.

다음과 같은 세팅으로 이 `tableOfContents`가 어느 레벨부터 어느 레벨까지를 목차로 만들지 정해줄 수 있습니다.

```toml
# config.toml
[markup]
  [markup.tableOfContents]
    endLevel = 3
    ordered = false
    startLevel = 2
```
startLevel 은 1로 설정될 시 `h1`부터 목차로 만든다는 뜻이고 endLevel은 3으로 설정될 시 `h3`까지를 목차로 만든다는 뜻이 됩니다. 

## Template Example: Basic TOC
싱글페이지 예시입니다. 목차를 맨 아래 넣는 경우입니다.

```html
<!--layout/_default/single.html-->
{{ define "main" }}
<main>
    <article>
    <header>
        <h1>{{ .Title }}</h1>
    </header>
        {{ .Content }}
    </article>
    <aside>
        {{ .TableOfContents }}
    </aside>
</main>
{{ end }}
```

## Template Example: TOC Partial
