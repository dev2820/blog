+++
title = "휴고 URL Management"
date = 2020-10-01T21:56:57+09:00
categories = ["what_is_hugo"]
tags = ["hugo","휴고","URL"]
banner = ""
subcategories= ["hugo"]
draft = false
+++

이번글은 휴고가 지원하는 permalinks, aliases, link canonicalization 그리고 절대경로와 상대경로를 다루는 옵션들에 대해 다룹니다.

https://gohugo.io/content-management/urls/

## Permalinks

휴고가 여러분의 사이트를 build 하게 되면 생성되는 웹사이트는 `public/` 디렉토리에 생성됩니다. 그러나 어느 디렉토리에 웹사이트를 build 할지는 `config`파일의 `publishDir` 변수값을 바꿔 다른 디렉토리에서 사이트가 build 되도록 설정해 줄 수 있습니다.

마찬가지로 `content` 디렉토리도 `contentDir` 값을 바꿔서 다른 컨텐츠 디렉토리를 바꿔줄 수도 있습니다.

`config`파일의 `permalinks` 옵션은
특정 문서로의 경로를 수정합니다. 

자세한건 다음 링크를 참조하십시오.

https://gohugo.io/getting-started/configuration/#all-configuration-settings

### Permalinks Configuration Example

예를 들어 특정 문서로의 경로를 년,월,컨텐츠 타이틀로 정하려 한다고 합시다.

```toml
# config.toml
[permalinks]
    posts = "/:year/:month/:title
```

위와 같이 설정하면 `posts/` 경로 아래의 컨텐츠는 다른 URL 구조를 가지게 됩니다. 예를 들어 `content/posts/sample-entry.md` 파일의 front matter에 `date = "2017-02-27T19:20:00-05:00"` 가 저장되어 있으면 이 페이지는 build될 때 `public/2017/02/sample-entry/index.html` 로 빌드되고 `https://example.com/2017/02/sample-entry/` URL 경로를 가지게 됩니다.

`posts` 말고 루트 경로부터 위 URL 구조를 적용하려면 다음과 같이 입력합니다.

```toml
# config.toml
[permalinks]
    "/" = "/:year/:month/:filename/"
```

날짜 형식이 마음에 들지 않는다면 다음과 같은 방식으로도 URL 구조를 바꿀 수 있습니다.

```toml
# config.toml
[permalinks]
    posts = "/:06/:1/:2/:title/"
```

위의 예시는 'YY/M/D/title' 형식의 URL 구조를 형성합니다.

taxonomy의 permalink 또한 같은 형식으로 바꿔줄 수 있습니다. 하지만
`:slug` 나 `:title`만 사용할 수 있습니다.

### Permalink Configuration Values

permalinks 옵션에 사용 가능한 변수들은 다음과 같습니다.

**`:year`**  
4자리 년도

**`:month`**  
2자리 월

**`:monthname`**
달의 이름

**`:day`**
2자리 일  

**`:weekday`**  
1자리 요일(일요일이 0)

**`:weekdayname`**  
요일 이름

**`:yearday`**  
1~3자리의 일(1~365)

**`:sections`**
컨텐츠 섹션 계층 구조 

**`:title`**  
컨텐츠의 타이틀

**`:slug`**  
컨텐츠의 슬러그

**`:filename`**  
컨텐츠의 파일 이름(확장자 없이)

이 외 `:06` 처럼 Go의 시간 포멧을 사용가능 합니다.

## Aliases
aliase는 특정 경로로 redirect하도록 만드는 기능입니다.

aliase는 두가지의 형태로 사용 됩니다.

1. `/`로 시작하는 주소는 `BaseURL`을 현재 주소로 사용한다는 뜻입니다. 예를 들어 `/posts/my-blogpost/` 는 `BaseURL/posts/my-blogpost/` 같이 말이죠.

2. 현재 페이지를 기반으로 상대 주소가 사용됩니다. `my-blogpost`나 `../blog/my-blogpost`처럼 말이죠.

### Aliases 예시
여러분이 새 컨텐츠 `content/posts/my-awesome-blog-post.md`를 만든다고 합시다. 이 컨텐츠는 `content/posts/my-original-url.md` 파일의 새 버전입니다. 여러분은 `aliases` 필드를 front matter로 생성해서 `my-original-url.md` 로 가는 경로로 접속하면 `my-awesome-blog-post.md`로 redirect 되도록 할 수 있습니다.

```toml
# content/posts/my-awesome-post.md
+++
aliases = [
    "/posts/my-original-url"
    "/2010/01/01/even-earlier-url.html"
]
+++
```

이제 `example.com/posts/my-original-url/`을 방문한 사람들은 즉시 `example.com/posts/my-awesome-post/` 경로로 redirect 됩니다.

### 다중언어 사이트의 aliases 예시

언어별 사이트를 제공하는 경우, 특정 포스트에 대해 모든 언어권에서 한 언어권 포스트만 보도록 고정하려면 다음과 같이 합니다.

```toml
# /posts/my-new-post.es.md
+++
aliases = [
    "/es/posts/my-original-post/
]
+++
```

휴고 0.55부터는 `/es/posts/my-original-post`를 간단하게 `my-original-post/`로 써도 됩니다.

### How Hugo Aliases Work
휴고에서 aliases를 동작시키는 방식은 입력된 aliases 주소마다 원본 페이지로 가는 리다이렉트 페이지를 만드는 것입니다.

예를 들어 `posts/my-intended-url.md` 컨텐츠 파일이 다음과 같은 front matter를 가지고 있다고 해봅시다.

```toml
+++
title = "My New post"
aliases = ["/posts/my-old-url"]
+++
```

`baseURL`이 `example.com`이라고 할 때 `https://example.com/posts/my-old-url/index.html`는 다음과 같은 내용을 포함합니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>https://example.com/posts/my-intended-url</title>
    <link rel="canonical" href="https://example.com/posts/my-intended-url"/>
    <meta name="robots" content="noindex">
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <meta http-equiv="refresh" content="0; url=https://example.com/posts/my-intended-url"/>
  </head>
</html>
```

`http-equiv="refresh"`는 리다이렉트가 일어나도록 만듦니다. 추가적으로 `<meta name="robots" content="noindex">` 는 검색 엔진 봇이 이 페이지가 alias 페이지임을 알게해줍니다.

### customize
여러분은 `layouts/alias.html` 파일을 만들어 alias 페이지를 커스텀할 수 있습니다. 이 경우이 페이지에 전달되는 데이터는 
**Permalink**(aliase가 연결하는 페이지 링크), **Page**(이동할 페이지 정보)

두가지 뿐입니다.

### aliases를 사용할 때 주의점
1. aliases는 여러분의 UglyURLs 세팅에 영향받지 않습니다. 여러분은 반드시 루트에 기반한 절대 주소를 제공해야하고 filename이나 directory도 완벽하게 써야 합니다.

2. aliase는 컨텐츠보다 빨리 렌더링 되어 같은 주소에 위치한 다른 컨텐츠를 덮어씌웁니다.

## Pretty URLs
휴고는 기본적으로 여러분의 컨텐츠를 "pretty" URLs로 렌더링 합니다. 
```
content/posts/_index.md
=> example.com/posts/index.html
content/posts/post-1.md
=> example.com/posts/post-1/
```

## Ugly URLs
만약 ugly url을 사용하길 원한다면 
`config` 파일에 `uglyurls` 변수를 `true`로 설정하면 됩니다. 또는 `hugo`나 `hugo server`를 실행할 때에 환경 변수로 `HUGO_UGLYURLS`를 `true`로 세팅하면 됩니다.

pretty urls 일때
```
.
└── content
    └── about
    |   └── _index.md  // <- https://example.com/about/
    ├── posts
    |   ├── firstpost.md   // <- https://example.com/posts/firstpost/
    |   ├── happy
    |   |   └── ness.md  // <- https://example.com/posts/happy/ness/
    |   └── secondpost.md  // <- https://example.com/posts/secondpost/
    └── quote
        ├── first.md       // <- https://example.com/quote/first/
        └── second.md      // <- https://example.com/quote/second/
```

`hugo --uglyURLs`로 사이트를 빌드했을 때
```
.
└── content
    └── about
    |   └── _index.md  // <- https://example.com/about.html
    ├── posts
    |   ├── firstpost.md   // <- https://example.com/posts/firstpost.html
    |   ├── happy
    |   |   └── ness.md    // <- https://example.com/posts/happy/ness.html
    |   └── secondpost.md  // <- https://example.com/posts/secondpost.html
    └── quote
        ├── first.md       // <- https://example.com/quote/first.html
        └── second.md      // <- https://example.com/quote/second.html
```

## Canonicalization
기본적으로 페이지에 사용되는 파일의 상대 경로는 모두 변경 불가능 합니다.
예를 들어 `/css/foo.css`같은 파일은 `/css/foo.css`로 사용해야 합니다.

`config` 파일의 `canonifyURLs`를 `true`로 설정하면 사용되는 파일의 모든 상대 경로가 `baseURL`에 기반해 절대경로로 바뀝니다. 예를 들어 `/css/foo.css`는 `https://example.com/css/foo.css`로 바뀝니다.

기본적으로는 `false`로 설정되어있습니다.

## Set URL in Front matter
추가적으로 다른 섹션 경로를 주고싶은 파일들에 대해 `url`이나 `slug`를 front matter 에서 재설정 해줄 수 있습니다.

자세한것은 아래 링크를 참조하면 됩니다.

{{< relref "휴고 front matter.md" >}}

## Relative URLs
기본적으로 휴고의 모든 상대 URL은 바뀌지 않습니다. 만약 `config` 파일의 `relativeURLs` 변수를 `true`로 설정하면 여러분의 사이트는 상대 주소를 현재주소에 기반에 바꿔줄 겁니다.

예를 들어 `/posts/first/` 페이지에 포함된 `/about/` 링크는 `../../about`으로 변경됩니다.