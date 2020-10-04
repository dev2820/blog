+++
title = "휴고 Summary"
date = 2020-09-30T20:07:32+09:00
categories = ["what_is_hugo"]
tags = ["hugo","휴고"]
banner = ""
draft = false
+++

휴고는 page 변수로 `.Summary`를 제공합니다. 이 summary는 페이지에 대한 요약이며 자동으로 휴고가 생성해줍니다만 사용자 정의 요약을 사용할 수도 있습니다.

https://gohugo.io/content-management/summaries/
<!--more-->
## Summary Splitting Options
흔히 우리는 컨텐츠들을 요약하여 보여주고 'read more...' 버튼을 제공하는 글의 'summary'들을 볼 수 있습니다. (블로그 같은데 보면 보이는 것들)

휴고는 자동으로 이 Summary에 들어갈 내용을 content에서 잘라서 만들어 주지만 사용자에 따라 수동으로 만들어줄 수도 있습니다.

### 자동 요약 생성
휴고는 자동으로 여러분의 컨텐츠의 앞에 70 글자를 잘라서 summary로 만들고 이를 `.Summary` 페이지 변수에 저장합니다. 몇 글자를 자르게 할지는 `config` 파일에서 `summaryLength` 변수에 값을 줘서 바꿔줄 수 있습니다.

### 수동 요약 생성
`<!--more-->`을 컨텐츠 중간에 집어넣어 컨텐츠의 어디부터 summary를 생성할지 정해줄 수 있습니다.

### front matter 요약
`.Summary`에 들어갈 내용을 `summary` front matter로 직접 입력할 수도 있습니다.

## Summary Selection Order
그럼 여러 summary를 생성하는 방법 중 어느 summary의 우선순위가 더 높을까요?
우선순위는 다음과 같습니다.

1. `<!--more-->`을 사용해 주어진 summary
2. front matter로 주어진 summary
3. 자동 생성된 summary

## Example: First 10 Articles with Summaries

다음은 최근 10개 기사의 summary를 만드는 페이지 예시입니다.

```html
{{ range first 10 .Pages }}
    <article>
      <!-- this <div> includes the title summary -->
      <div>
        <h2><a href="{{ .RelPermalink }}">{{ .Title }}</a></h2>
        {{ .Summary }}
      </div>
      {{ if .Truncated }}
      <!-- This <div> includes a read more link, but only if the summary is truncated... -->
      <div>
        <a href="{{ .RelPermalink }}">Read More…</a>
      </div>
      {{ end }}
    </article>
{{ end }}
```

`.Truncated` 변수는 `.Summary`의 길이가 본문 전체 길이보다 짧을 때 true 입니다.