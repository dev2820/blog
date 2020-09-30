---
title: "휴고 Front Matter"
date: 2020-09-29T21:54:15+09:00
categories: ["what_is_hugo"]
tags: ["hugo","휴고","front matter"]
cover: ""
draft: false
---

이번 글은 휴고 컨텐츠의 'front matter' 에 대해 설명하는 글입니다. front matter는 말하자면 컨텐츠의 메타데이터, 컨텐츠의 설정값입니다. 컨텐츠의 타이틀, 생성날짜, 만기일 등등을 정해주고 심지어는 어떤 화면으로 컨텐츠를 표출시킬지 레이아웃을 정해주거나 컨텐츠로가는 주소를 바꿔주는등 여러가지를 할 수 있습니다.  

## Front Matter Formats

https://gohugo.io/content-management/front-matter/

휴고에서 사용 가능한 front matter 형식은 총 4가지 있습니다.

1. TOML
 - toml은 `+++`로 시작하고 끝나는 부분까지를 toml로 인식합니다.

2. YAML
 - `---`로 시작하고 끝나는 부분까지를 yaml로 인식합니다.

3. JSON
 - `{` 과 `}` 사이를 json으로 인식합니다.

4. ORG
 - 얘는 사용방법이 조금 독특하고 마이너해서 딱히 기술하진 않겠습니다.

**Example**
toml 예시만 보여드리겠습니다.   
```toml
+++
categories = ["Development", "VIM"]
date = "2012-04-06"
description = "spf13-vim is a cross platform distribution of vim plugins and resources for Vim."
slug = "spf13-vim-3-0-release-and-new-website"
tags = [".vimrc", "plugins", "spf13-vim", "vim"]
title = "spf13-vim 3.0 release and new website"
+++

...
```
## Front Matter Variables
front matter로 사용 가능한 변수는 다음과 같습니다.

여기에 나오는 변수들은 휴고에서 페이지 변수로 불러와 사용할 수 있습니다. 이는 template에서 page variable을 설명할 때 자세히 사용법을 적겠습니다.

**aliases**  
하나 또는 하나이상의 컨텐츠로의 진입 경로를 기술하는 배열입니다. 이 변수는 사이트를 build할 때 적힌 aliases에 맞는 디렉토리를 생성합니다. 

사용법
```toml
+++
aliases = [
    "/posts/my-original-url/",
    "/2010/01/01/even-earlier-url.html"
]
+++
```

**audio**  
페이지와 관련있는 오디오 파일들의 경로를 담는 배열입니다. `opengraph`에 사용됩니다.

**cascade**    
하위 컨텐츠로 계속 전달할 front matter 키들의 맵입니다. 
더 하위의 컨텐츠 front matter가 덮어씌우지 않는 한 계속 전달됩니다. 


```toml
# content/blog/_index.md  
title = "Blog"

[cascade]
  banner = "images/typewriter.jpg"
```
만약 blog폴더의 `_index.md`파일에 cascade 값으로 `banner` 가 설정되어있다면, `content/blog/introduce.md`에 `banner`가 없더라도 `banner`를 가져다 쓸 수 있습니다.

**date**  
해당 컨텐츠를 만든 날짜정보 string입니다. 

**description**  
해당 컨텐츠에 대한 설명입니다.

**draft**  
만일 `true`라면 사이트를 build할 시 `--buildDrafts` 옵션을 주지 않는다면 해당 컨텐츠를 포함하지 않습니다.

**expiryDate**  
이 변수로 설정한 날짜가 지나면 휴고는 `--buildExpired` 옵션을 주지 않는 이상 이 컨텐츠를 출판하지 않습니다. 

**headless**  
만약 `true`라면 해당 컨텐츠를 `headless`상태로 만듦니다.
`headless` 상태가 된 컨텐츠는 접근 가능한 경로가 없어집니다.

`.Site.GetPage` 메소드를 통해 해당 컨텐츠를 불러올 수 있습니다. 

```html 
{{ $headless := .Site.GetPage "/some-headless-bundle" }}
{{ $reusablePages := $headless.Resources.Match "author*" }}
<h2>Authors</h2>
{{ range $reusablePages }}
    <h3>{{ .Title }}</h3>
    {{ .Content }}
{{ end }}
```
따라서 `headless`는 컨텐츠의 재활용성이 높은 경우 컨텐츠를 복붙하는 경우 사용합니다.

**images**  
페이지와 관련있는 이미지들의 경로가 들어간 배열입니다.

**isCJKLanguage**  
한자,일본어,한국어가 들어간 경우 `true`로 해줘야 `.Summary`와 `.WordCount`가 제대로 작동합니다.

**keywords**  
컨텐츠의 키워드들 저장합니다.

**layout**  
해당 컨텐츠에 어떤 레이아웃을 사용할지 직접 정해줍니다. 만약 이 컨텐츠가 어떤 `type`인지 정해져있지 않다면 휴고는 레이아웃 디렉토리에서 컨텐츠의 섹션과 같은 이름을 가지는 레이아웃을 찾습니다.

**lastmod**  
컨텐츠가 마지막으로 변경된 날짜입니다.

**linkTitle**    
해당 컨텐츠로 가는 링크를 만들 때 사용합니다. 만약 설정되면 `title` front matter보다 `linkTitle`을 먼저 사용합니다. string 입니다.

**outputs**  
컨텐츠의 출력형식을 정해줄 수 있습니다.
https://gohugo.io/templates/output-formats/

**publishDate**  
출판일 날짜(string)입니다. 아직 해당날짜가 되지 않은 컨텐츠는 `--buildFuture` 옵션을 주지 않으면 빌드할 때 포함되지 않습니다.

**resources**  
페이지 리소스를 구성하는데 사용됩니다.
대충 이런식으로 씁니다.

```toml
date = "2018-01-25"
title = "Application"

[[resources]]
  name = "header"
  src = "images/sunset.jpg"

[[resources]]
  src = "documents/photo_specs.pdf"
  title = "Photo Specifications"
  [resources.params]
    icon = "photo"

[[resources]]
  src = "documents/guide.pdf"
  title = "Instruction Guide"

[[resources]]
  src = "documents/checklist.pdf"
  title = "Document Checklist"

[[resources]]
  src = "documents/payment.docx"
  title = "Proof of Payment"

[[resources]]
  name = "pdf-file-:counter"
  src = "**.pdf"
  [resources.params]
    icon = "pdf"

[[resources]]
  src = "**.docx"
  [resources.params]
    icon = "word"
```

**series**  
이 페이지가 속한 시리즈들을 적는 배열입니다. `series` 분류에 사용됩니다. `opengraph`에 사용됩니다.

**slug**  
접근 경로중 `slug`값을 정해주는 변수입니다. 파일이름으로 되어있는 기본 slug를 다른 string으로 덮어쓸 수 있습니다.

**summary**
이 컨텐츠의 요약입니다. 기본적으로 컨텐츠의 앞부분부터 잘라 자동으로 summary를 생성하지만 이렇게 front matter로 사용할 텍스트를 정해줄 수 있습니다.

**title**  
글의 제목string 입니다.

**type**  
컨텐츠의 `type`은 폴더에 따라 자동으로 생성되지만 front matter로 직접 정해줄 수도 있습니다.

**url**  
컨텐츠로 접근하는 root로 부터의 full path 입니다.

**videos**
페이지와 관련된 비디오 경로의 배열입니다. `opengraph`에 사용됩니다.

**weight**
해당 컨텐츠를 컨텐츠 리스트에서 얼마나 상위에 둘지 결정하는 변수입니다. 낮은 값을 줄 수록 우선순위가 올라갑니다. 0은 될 수 없고 0값이 주어지면 리스트에서 제외됩니다.

**tags,categories**  
`tags` 와 `categories` 변수는 이름대로 각각 태그와 카테고리를 담는 배열입니다. 태그별, 카테고리별 분류할 때 사용합니다.

**사용자정의**  
위에 언급되지 않은 변수도 사용자가 직접 만들 수 있습니다. `.Params` 변수는 이렇게 사용자정의된 front matter 값을 불러오는데 사용합니다.

```toml
include_toc = true
show_comments = false
```

`.Params.include_toc`, `.Params.show_comments` 같은 형식으로 페이지에서 불러올 수 있습니다.

## Build Options
https://gohugo.io/content-management/build-options/

이 옵션은 front matter object로 주어지며, 휴고가해당 컨텐츠를 build 할 때 어떻게 빌드할지 정해주는 옵션입니다.

```toml
[_build]
    render = true
    list = always
    publishResources = true
```

다음과 같은 값을 줄 수 있습니다.

**render**  
`true`라면 이 페이지는 출판된 페이지로 여겨집니다. 

**list**  
다음 값들이 가능합니다.
never: 이 페이지는 어느 페이지 콜렉션에도 포함되지 않습니다.

always: 디폴트값입니다. 이 페이지는 모든 페이지 콜렉션에 포함됩니다. (ex. site.RegularPages,$page.Pages)

local: 이 페이지는 로컬 페이지 컬렉션에 포함됩니다. (ex.$page.RegularPages, $page.Pages)

**publishResources**  
`true`로 설정되면 번들 리소스를 출판합니다. `false`가 되면 `.Permalink`, `RelPermalink`같이 직접 가져다 쓰는 것은 가능하지만 나머지는 사용이 불가능해집니다.

### 사용 예시
사람들은 종종 홈페이지에 사용될 'who we are' 컨텐츠 파일이 필요하지만 이런 컨텐츠는 딱히 어디에도 두기 애매합니다.

```toml
# content/who-we-are.md
title = 'who we are'
[_build]
    list = false
    render = false
```

```html
{{/* layouts/index.html */}}
<section id="who-we-are">
{{ with site.GetPage "who-we-are" }}
  {{ .Content }}
{{ end }}
</section>
```

## 마치며
다음글에서는 content sections, content types, archetypes에 대해 알아보겠습니다.