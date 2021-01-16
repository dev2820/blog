+++
title= "휴고 Content Section,content Type 그리고 Archetypes"
date= 2020-09-29T23:48:55+09:00
categories= ["what_is_hugo"]
tags= ["hugo","휴고","content section","content type","archetypes"]
cover= ""
subcategories= ["hugo"]
draft= false
+++

이번 글에서는 section, type 그리고 archetypes에 대해 각각 다뤄보겠습니다.

## Content Sections
https://gohugo.io/content-management/sections/

휴고는 여러분의 컨텐츠와 일치하는 **section tree**를 생성합니다. **Section**은 `content/`디렉토리 아래 분류된 구조에 기반해 얻을 수 있는 페이지들의 집합입니다.

기본적으로 모든 `content/` 아래 있는 모든 **first-level**디렉토리는 섹션입니다(root section이라 합니다.)

### Nested Sections
하위 레벨에 있는 섹션도 필요하면 만들 수 있습니다.

만일 그 하위 레벨에 섹션을 정의할 필요가 있다면 섹션으로 만드려는 디렉토리 안에 `_index.md` 파일을 넣어주면 됩니다.

```
content
└── blog        <-- Section, because first-level dir under content/
    ├── funny-cats
    │   ├── mypost.md
    │   └── kittens         <-- Section, because contains _index.md
    │       └── _index.md
    └── tech                <-- Section, because contains _index.md
        └── _index.md
```

예제: layouts/partials/breadcrumb.html

```html

<ol  class="nav navbar-nav">
  {{ template "breadcrumbnav" (dict "p1" . "p2" .) }}
</ol>
{{ define "breadcrumbnav" }}
{{ if .p1.Parent }}
{{ template "breadcrumbnav" (dict "p1" .p1.Parent "p2" .p2 )  }}
{{ else if not .p1.IsHome }}
{{ template "breadcrumbnav" (dict "p1" .p1.Site.Home "p2" .p2 )  }}
{{ end }}
<li{{ if eq .p1 .p2 }} class="active"{{ end }}>
  <a href="{{ .p1.Permalink }}">{{ .p1.Title }}</a>
</li>
{{ end }}
```

## Section Page Variables and Methods

섹션 페이지에서 사용할 수 있는 변수와 메소드입니다.

**.CurrentSection**  
현재 보고있는 페이지의 섹션페이지입니다. 홈페이지나 섹션페이지도 가능합니다.

**.FirstSection**  
현재 페이지의 first section(content 바로 아래 있는 섹션)입니다. 

**.InSection $anotherPage**  
주어진 페이지가 현재 섹션에 포함되는지 알려줍니다.

**.IsAncestor $anotherPage**  
현재페이지가 주어진 페이지의 조상(상위폴더 소속)인지 알려줍니다.

**.IsDescendant $anotherPage**  
현제 페이지가 주어진 페이지 자손(하위폴더 소속)인지 알려줍니다.

**.Parent**  
현재 페이지의 섹션 또는 현재 섹션의 부모 섹션입니다.

**.Section**  
현재 컨텐츠가 속한 섹션입니다. 주의할 점은 속한 섹션 중 첫 번째 섹션을 반환합니다. 예를 들어 `/blog/funny/mypost/ => blog`

**.Sections**  
이 컨텐츠 하위 섹션들입니다.

### Content Section Lists
휴고는 자동으로 각 섹션의 모든 컨텐츠 리스트를 가지는 루트 섹션들의 페이지를 만듦니다.

### Content Section vs Content Type
휴고는 기본적으로 루트 섹션의 이름을 컨텐츠 타입으로 사용합니다. 예를 들어 `posts/post-1.md`파일이 있다면 휴고는 이 `post-1.md`파일의 `type`은 `posts`라고 여깁니다. 만약 posts 섹션을 위한 archetype가 있다면 휴고는 posts 섹션의 글을 생성할 때 자동으로
`archetypes/posts.md` 를 해당 글의 front matter로 생성합니다.

## Content Types
https://gohugo.io/content-management/types/

`type`은 여러분의 컨텐츠를 조직화하는 하나의 수단입니다. 휴고는 `type`이라는 front matter를 컨텐츠에 제공합니다. 만약 사용자가 정의한 type이 없다면 첫 번째 섹션 이름이 type이 됩니다. 예를 들어 `content/blog/my-first-event.md`파일의 `type`은 'blog'가 됩니다.

이 `type`의 용도는 다음과 같습니다.

* 컨텐츠가 어떻게 렌더링 될지 결정한다.(레이아웃을 지정함)
* 어떤 archetype을 새 컨텐츠에 적용할지 결정한다.

## Archetypes
https://gohugo.io/content-management/archetypes/

`Archetypes`는 미리 정해둔 front matter 값과 정해진 컨텐츠 내용들을 포함하는 템플릿 파일이다. 이 archetypes 템플릿 파일은 `hugo new`로 새로운 컨텐츠를 생성할 때 사용된다. 이 템플릿이 있으면 특정 컨텐츠의 틀을 찍어낼 수 있다.

`hugo new` 명령은 생성할 컨텐츠와 가장 맞는 archetype 템플릿을 찾는다. 만약 맞는 archetype이 없다면 사용하는 테마에 속한 템플릿을 찾아 참조한다.

```
hugo new posts/my-first-post.md
```
위와 같은 명령을 시행하면 적용되는 archetype 파일의 우선순위는 다음과 같다.

1. archetypes/posts.md
2. archetypes/default.md
3. themes/my-theme/archetypes/posts.md
4. themes/my-theme/archetypes/default.md

### Create a New Archetype Template

`newsletter`란 섹션을 만들었고 이 `newsletter`를 위한 archetype file인 `archetypes/newsletter.md`를 만든다고하자

```md
// archetypes/newsletter.md

---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
---

**Insert Lead paragraph here.**

## New Cool Posts

{{ range first 10 ( where .Site.RegularPages "Type" "cool" ) }}
* {{ .Title }}
{{ end }}
```

이제 newsletter 섹션 안에 새 컨텐츠를 만들면 위의 내용이 적용된 새 파일이 만들어진 것을 확인할 수 있다.

```bash
hugo new newsletter/the-latest-col.stuff.md
```

### Directory based archetypes

archetypes 로 폴더도 템플릿화 할 수 있다.
```
archetypes
├── default.md
└── post-bundle
    ├── bio.md
    ├── images
    │   └── featured.jpg
    └── index.md
```

```bash
hugo new --kind post-bundle posts/my-post
```
위 명령은 `post-bundle` 폴더와 같은 내용을 가지는 `/content/posts/my-post` 폴더를 만들 것이다. 
