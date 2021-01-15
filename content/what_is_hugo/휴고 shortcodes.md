+++
title = "휴고 Shortcodes"
date = 2020-09-30T15:45:34+09:00
categories = ["what_is_hugo"]
tags = ["hugo","휴고","shortcodes"]
cover = ""
subcategories= ["hugo"]
testparam = "Hugo Rocks!"
draft = false
+++

이 글은 간단한 코드를 컨텐츠 안에 집어넣는 Shortcodes 기능을 소개합니다.

참고로 hugo 문법을 md파일에 썼더니 죄다 hugo에서 해석해버려서 `{ {`와 `} }`는 `{{`와 `}}`로 읽으면 되겠습니다.

https://gohugo.io/content-management/shortcodes/

{{< relref "#마치며" >}}
## What a Shortcode is
휴고에는 때때로 마크다운 파일만으로는 구현할 수 없는 페이지들이 있습니다. 컨텐츠를 만드는 사람들은 종종 마크다누 컨텐츠 안에 raw HTML을 넣어야 하는 상황이 옵니다.(예를들어 `<iframe>`을 통해 비디오를 넣는 등) 따라서 휴고는 이러한 마크다운의 단점들을 우회하기위해 **shortcodes** 기능을 제공합니다.

shortcode는 간단한 snippet을 미리 정의된 템플릿을 사용해 컨텐츠 파일에 집어넣는 것을 말합니다. (php에서 가능한 html사이사이에 코드를 집어넣는 기능과 같습니다.)

주의할 점은 shortcode는 템플릿 파일 안에서는 작동하지 않습니다.

## Use Shortcodes

여러분의 컨텐츠 파일에서 shortcode는 다음 형식으로 불러올 수 있습니다.
{{< highlight md>}}
{ {% shortcodename (parameters) %} }
{{< /highlight >}}

shortcode에 파라미터로 넣을 수 있는 공간은 제한이 없고, 내부공간을 가지는 파라미터도 사용할 수 있습니다.

shortcode에 처음오는 단어는 항상 shortcode의 이름입니다. 파라미터는 이름 뒤에 따라옵니다. 파라미터를 전달하는 방법은 두 가지 있습니다. 맞는 위치에 적절히 값을 전달하거나 `name="value"`형식으로 파라미터를 전달할 수 있습니다. 이 두 방식을 혼용할 순 없지만, shortcode가 어떻게 정의되었는지에 따라 파라미터의 이름, 위치 또는 둘 다를 정해줄 수 있습니다.

몇몇 shortcode들은 닫는 shortcode가 필요하거나 사용됩니다. HTML처럼 열고 닫는 shortcode가 매치되어야 합니다.

shortcode의 두가지 예시
```md
{ {% highlight %} } Stuff to  `process` in the *center*.{ {% /highlight %} }
```
```md
{ {< highlight go >} } A bunch of code here { {< /highlight >} }
```

위 예시처럼 두 가지 형니의 shortcode가 사용 가능합니다. (`%`로 시작하고 끝나는지 `<`로 시작하고 `>`로 끝나는지) 

### Shortcodes with raw string parameters

다음과 같이 ` 문자를 통해 여러줄을 파라미터로 전달할 수도 있습니다.

```
{ {< myshortcode `This is some <b>HTML</b>,
and a new line with a "quoted string".` >} }
```

### Shortcodes with Markdown

휴고 버전 `0.55`부터 `%`를 사용한 Shortcode는 내부 내용이 컨텐츠가 렌더링 될 때 같이 markdown 문법에 따라 렌더링 됩니다.

### Shortcodes without Markdown

`<`,`>`를 사용하는 shortcode 내부 코드는 markdown 문법에 따라 렌더링 되지 않습니다.

```
{ { < myshortcode > } }<p>Hello <strong>World!</strong></p>{ { < /myshortcode > } }
```

### Nested Shortcodes

shortcode 안에서 shortcode를 부를 수 있습니다. `.Parent` 값으로 이러한 일이 가능한데 이는 나중에 다루겠습니다. 

## Use Hugo's Built-in Shortcodes

휴고는 몇몇개 미리 만들어진 shortcode를 제공합니다. 

### `figure`
`figure`은 markdown에서 약어를 제공하지 않는 HTML5의 `<figure>`를 를 위해 만들어졌습니다.

`figure` shortcode는 다음과 같은 파라미터를 사용할 수 있습니다.

**src**  
보여줄 이미지의 URL 입니다.

**link**  
이미지에 hyperlink를 거는 경우 link를 입력하면 됩니다.

**target**  
`link` 파라미터가 주어지는 경우 이 링크가 어디로 가게되는지 알려주는 글을 `target`에 추가적으로 전달할 수 있습니다.

**rel**  
`link` 파라미터가 주어진경우 링크를 어떤 방식으로 열지 결정합니다.

**alt**  
이미지를 불러오지 못한 경우 대체문구입니다.

**title**  
이미지 타이틀입니다.

**caption**  
이미지 설명 문구입니다. 이미지 아래 뜹니다.

**class**    
`figure` 태그에 class를 부여합니다.

**height**    
이미지 세로길이

**width**    
이미지 가로길이

**attr**    
이미지 속성 텍스트. `attr`에 주어진 마크다운 값이 렌더링 됩니다.

**attrlink**   
hyperlink에 속성 텍스트가 필요하다면 적습니다.

사용예시:

다음과 같이 `.md` 파일에 값이 입력되면
```md
{ {< figure src="/media/spf13.jpg" title="Steve Francia" >} }
``` 

다음과 같이 렌더링 됩니다.
```html
<figure>
  <img src="/media/spf13.jpg"  />
  <figcaption>
      <h4>Steve Francia</h4>
  </figcaption>
</figure>
```

### `gist`
블로거는 종종 GitHub gists를 post에 포함하고 싶을 때가 있습니다. 우리는 `gist` shortcode로 GitHub gist를 지원해줍니다.

```url
https://gist.github.com/spf13/7896402
```
우리는 여기서 id 값만 파라미터로 전달합니다.

```md
{ {< gist spf13 7896402>} }
```

실제 사용 예시
{{< gist spf13 7896402>}}

만약 gist에다른 몇몇 파일들이 포함되어 있으면 `""`를 사용해 파일 이름을 3번째 인자로 제공하면 됩니다.

```md
{ {< gist spf134 7896402 "img.html">} }
```

결과는 다음과 같이 렌더링됩니다.

```html
<script type="application/javascript" src="https://gist.github.com/spf13/7896402.js"></script>
```

### `highlight`

이전에 아래 같은 코드를 syntax highlighting 하는 방법을 다루었습니다. 
<pre><code>
```go
 ~ 
```
 </code></pre>

같은 highlighting을 `highlight` shorcode로 사용 가능합니다.  어떤 언어인지 첫번째 파라미터로 전달하면 됩니다.

```md

{ {< highlight html >} }
<section id="main">
  <div>
   <h1 id="title">{{ .Title }}</h1>
    {{ range .Pages }}
        {{ .Render "summary"}}
    {{ end }}
  </div>
</section>
{ {< /highlight >} }
```

결과는 다음과 같이 렌더링 됩니다.
```html
<span style="color: #f92672">&lt;section</span> <span style="color: #a6e22e">id=</span><span style="color: #e6db74">&quot;main&quot;</span><span style="color: #f92672">&gt;</span>
  <span style="color: #f92672">&lt;div&gt;</span>
   <span style="color: #f92672">&lt;h1</span> <span style="color: #a6e22e">id=</span><span style="color: #e6db74">&quot;title&quot;</span><span style="color: #f92672">&gt;</span>{{ .Title }}<span style="color: #f92672">&lt;/h1&gt;</span>
    {{ range .Pages }}
        {{ .Render &quot;summary&quot;}}
    {{ end }}
  <span style="color: #f92672">&lt;/div&gt;</span>
<span style="color: #f92672">&lt;/section&gt;</span>
```

더 자세한 사용법은 아래 링크를 참조하십시오  
https://gohugo.io/content-management/syntax-highlighting/


### `instagram`

현재 instagram api 버그가 있어서 인스타그램이 나오지 않아 블록처리했습니다.
### param

현재 페이지에 정의된 front matter로부터 값을 가져오는 `param` shortcode를 사용할 수도 있습니다.

파라미터로 주어진 키값이 없다면 에러가 남습니다.
```md
"{ {< param testparam >} }"
```

만약 testparam이라는 front matter가 'Hugo Rocks!'라는 값을 가지고 있다고 한다면 다음과 같이 print 될 것입니다.

{{< param testparam >}}

`.`을 이용해 객체 내부부 값을 가져올 수도 있습니다.

{{< highlight md >}}
{ {< param "my.nested.param" >} }
{{< /highlight >}}

### `rel` and `relref`
이 shortcode들은 페이지들의 상대주소(ex.`blog/post.md`)나 논리적 이름(ex. `post.md`)를 보고 permalink(`ref`)나 relative permalink(`relref`)를 반환합니다.

`ref` 과 `relref`은 첫번째 파라미터만 존재하며 해당 주소를 넣어주면됩니다.

사용예시:
```md
[Neat]({ { < ref "blog/neat.md" >} })
[Who]({ { < relref "about.md#who" >} })
```

결과:
```html
<a href="/blog/neat">Neat</a>
<a href="/about/#who:c28654c202e73453784cfd2c5ab356c0">Who</a>
```

### tweet
트윗을 블로그에 추가하는 경우 `tweet` shortcode를 사용합니다.

특정 트윗의 주소가 다음같다고 합시다.
```
https://twitter.com/spf13/status/877500564405444608
```

사용 예시:
```md
{ {< tweet 877500564405444608>} }
```

결과:
{{< tweet 877500564405444608>}}

### youtube
유튜브 영상을 집어넣을 수 있는 `youtube` shortcode도 있습니다.

다음 유튜브 영상이 있을 때
```
https://www.youtube.com/watch?v=w7Ft2ymGmfc
```

사용 예시:
```md
{ {< youtube w7Ft2ymGmfc >} }
```
자동 재생은 다음과 같이 합니다.
```md

{ {< youtube id="w7Ft2ymGmfc" autoplay="true" >} }
```

결과:
다음과 같은 코드가 생성됩니다.
```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe src="https://www.youtube.com/embed/w7Ft2ymGmfc?autoplay=1" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen title="YouTube Video"></iframe>
</div>

```
{{< youtube w7Ft2ymGmfc >}}

## 마치며
custom shortcode를 생성하는 방법도 있습니다. 다만 여기서 안다루고  template을 다루면서 얘기하겠습니다.


