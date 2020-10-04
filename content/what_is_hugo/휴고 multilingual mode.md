+++
title = "휴고 Multilingual Mode"
date = 2020-10-03T17:46:56+09:00
categories = ["what_is_hugo"]
tags = ["hugo","휴고","multilingual mode","다중언어지원"]
banner = ""
draft = false
+++

이번글은 휴고 사이트의 다중언어지원에 대한 글입니다.

https://gohugo.io/content-management/multilingual/


## Configure Languages
다음 예제는 다중언어지원을 위한 `config` 파일입니다.

```toml
# config.toml

defaultContentLanguage = "en"
copyright = "Everything is mine"

[languages]
  [languages.ar]
    languagedirection = "rtl"
    title = "مدونتي"
    weight = 2
  [languages.en]
    title = "My blog"
    weight = 1
    [languages.en.params]
      linkedin = "https://linkedin.com/whoever"
  [languages.fr]
    title = "Mon blogue"
    weight = 2
    [languages.fr.params]
      linkedin = "https://linkedin.com/fr/whoever"
      [languages.fr.params.navigation]
        help = "Aide"

[params]
  [params.navigation]
    help = "Help"
```

위에 정의되지 않은 `languages` 블록은 글로벌 value로 정의된 값을 따릅니다. (예를 들어 `copyright`는 다른 언어 블록에 정의되어있지 않아 영어로 씌여진 'everything is mine'을 사용합니다.) `languages`블록 뿐만 아니라 그 안의 `params` 블록도 없는 값을 글로벌 value에서 찾아 사용합니다.

`config`에 설정된 설정값에 따라 모든 컨텐츠, 사이트맵, 분류페이지 등등의 페이지들은 설정한 `defaultContentLanguage`값의 언어권에선 `/` 아래 렌더링 되고 프랑스에서는 `/fr`아래 렌더링 됩니다. 

`defaultContentLanguage` 변수는 사이트의 기본 언어를 설정합니다. default 값은 `en`입니다.

만약 default 언어 사이트도 다른언어 사이트처럼 `/en` 아래 렌더링 되게 하려면 `config` 파일에 다음 문구를 추가하십시오

```
defaultContentLanguageInSubdir = true
```

명백히 non-global 한 옵션은 언어별로 덮어씌워질 수 있습니다. `baseURL`, `buildDrafts` 등이 있습니다.

### Disable a Language
사용불가능한 언어를 설정할 수 있습니다.
```
disableLanguages = ["fr", "ja"]
```
하지만 default content language는 사용불가로 설정할 수 없습니다. 

사용불가능한 언어는 빌드할 때 환경변수로 설정해줄 수 있습니다.
```
HUGO_DISABLELANGUAGES="fr ja" hugo
```

개발할 때만 다음과 같이 환경변수 설정을 통해 사용불가능한 언어를 풀어줄 수도 있습니다.

```
HUGO_DISABLELANGUAGES=" " hugo server
```

### Configure Multilingual Multihost

휴고 0.31부터 언어별로 다른 URL을 설정해줄 수 있습니다.

```toml
# config.toml
[languages]
  [languages.en]
    baseURL = "https://example.com"
    languageName = "English"
    title = "In English"
    weight = 2
  [languages.fr]
    baseURL = "https://example.fr"
    languageName = "Français"
    title = "En Français"
    weight = 1
```

이를 위해선 `public`폴더에 다음과 같이 여러 사이트가 생성되어있어야 합니다.
```
public
├── en
└── fr
```

`.Permalink`는 루트 URL을 기반으로 형성됩니다. 위 예시의 경우 영어권에선 `https://example.com/`을 기반으로 permalink가 형성되겠지요

`hugo server`를 실행할 때 여러 언어가 설정되어 있다면 언어별로 여러 http server가 만들어집니다.

```bash
Web Server is available at 127.0.0.1:1313 (bind address 127.0.0.1)
Web Server is available at 127.0.0.1:1314 (bind address 127.0.0.1)
Press Ctrl+C to stop
```

생성된 모든 개발서버에 Live reload와 `--navigateToChanged`도 잘 작동합니다.

### Taxonomies and Blackfriday
Taxonomies 와 Blackfriday(마크다운 렌더링 엔진) 설정도 언어별로 다르게할 수 있습니다.

```toml
#config.toml
[Taxonomies]
  tag = "tags"

[blackfriday]
  angledQuotes = true
  hrefTargetBlank = true

[languages]
  [languages.en]
    title = "English"
    weight = 1
    [languages.en.blackfriday]
      angledQuotes = false
  [languages.fr]
    title = "Français"
    weight = 2
    [languages.fr.Taxonomies]
      plaque = "plaques"
```

## Translate Your Content

여러분의 컨텐츠 번역을 관리하는 두가지 방법이 있습니다.

### Translation by filename

다음 두 파일이 있다고 가정해봅시다.
1. `/content/about.en.md` 
2. `/content/about.fr.md`

첫번째 파일은 영어로 씌여졌고 두번째로 연결됩니다. 두번째 파일은 프랑스어로 씌였고 처음으로 연결됩니다.

파일이름에 추가된 언어별 코드로 어느파일을 불러올지 구분합니다.

같은 경로에 다른 언어코드가 들어간 파일을 둠으로써 번역된 페이지로 같이 연결됩니다.

만약 언어코드가 딱히 없다면 그 파일은 기본언어로 쓰여진 파일로 여겨집니다.

### Translation by cotent directory
두 번째 방법은 언어별로 다른 content 디렉토리를 두는 것입니다. 각 언어 content 디렉토리는 `contentDir` 옵션으로 정해줄 수 있습니다.

```toml
# config.toml
[languages]
  [languages.en]
    contentDir = "content/english"
    languageName = "English"
    weight = 10
  [languages.fr]
    contentDir = "content/french"
    languageName = "Français"
    weight = 20
```

다음 두 파일이 있다고 가정합시다.

1. `/content/english/about.md`
2. `/content/french/about.md`

첫 번째 파일은 영어로 구성됬고 두번째로 연결됩니다. 두 번째 파일은 프랑스어로 구성됬고 처음으로 연결됩니다.

어느 파일을 사용할지는 컨텐츠가 어디에 위치하는가로 구분됩니다. 같은경로에 다른 지역이름으로 어느 파일이 불러올지 결정됩니다.

## Bypassing default linking.

각 페이지가 어느 언어권 페이지로 연결될지 `translationKey` front matter로 정해주면 basename이나 지역에 상관없이 설정한 번역페이지로 이동합니다.

다음 파일들이 있다고 가정합시다.
1. `/content/about-us.en.md`
2. `/content/om.nn.md`
3. `/content/presentation/a-propos.fr.md`

```toml
# 세 파일에 모두 다음 frontmatter를 추가합니다.
translationKey = "about"
```

위 세 페이지에 모두 front matter로 `translationKey`를 `about`으로 설정해줌으로써 `about` 페이지에 접속시 번역된 페이지로 연결될 것입니다.

### Localizing permalinks

경로와 파일이름이 어느 컨텐츠로 이동할지를 결정하기 때문에, 모든 언어별 페이지들은 같은 URL을 공유합니다.

언어별로 다른 URL을 사용하려면 언어별 컨텐츠마다 다른 `slug`나 `url`을 front matter로 설정해줘야 합니다.

예를들어 프랑스어로 번역된 페이지는
(ex. `content/about.fr.md`) slug를 통해 다른 URL이 될 수 있습니다.
```toml
# about.fr.md
Title = "A Propos"
slug = "a-propos"
```

렌더링될 때 휴고는 `/about/` 페이지와 `/fr/a-propos/` 페이지, 두 페이지를 만듭니다.

### Page Bundles
페이지별 리소스는 언어별 파일을 제공하는 것과 같은 논리를 사용합니다.(파일이름별 `image.jpg`,`image.fr.jpg` 그리고 디렉토리별 `english/about/header.jpg`,`french/about/header.jpg`)

1. 있다면 현재 언어 번들에서 파일을 가져다 쓴다.

2. 언어별 `Weight`순으로 다른 언어 번들에서 파일을 가져다 쓴다.

## Reference the Traslated Content
언어별 컨텐츠 링크 리스트를 만들려면 다음과 같이(비슷하게) 만들어야합니다.

```html
<!--layouts/partials/i18nlist.html-->

{{ if .IsTranslated }}
<h4>{{ i18n "translations" }}</h4>
<ul>
    {{ range .Translations }}
    <li>
        <a href="{{ .Permalink }}">{{ .Lang }}: {{ .Title }}{{ if .IsPage }} ({{ i18n "wordCount" . }}){{ end }}</a>
    </li>
    {{ end }}
</ul>
{{ end }}
```

### List All Available Languages
페이지 변수 `.AllTranslations`는 가능한 모든 언어 리스트를 제공합니다. 이는 홈페이지에서 언어 네비게이션으로 사용가능합니다.

```html
<!--layouts/partials/allLanguages.html-->

<ul>
{{ range $.Site.Home.AllTranslations }}
<li><a href="{{ .Permalink }}">{{ .Language.LanguageName }}</a></li>
{{ end }}
</ul>
```

## Translation of Strings
i18n 폴더를 이용해 언어별로 번역된 string을 제공할 수 있습니다.

`themes/<THEME>/i18n/` 폴더에 언어별로 파일을 만드십시오. 파일 이름은 언어별로 지어저야하고 RFC 5646 규정에 따라야합니다. (ex. en-US.toml,fr.toml 등등)

### Query basic translation
여러분의 템플릿에 i18n 함수를 통해 번역된 언어를 불러올 수 있습니다. 다음처럼요

```
{{ i18n "home" }}
```
이 함수는 이제 `i18n/en-US.toml` 파일에서 "home" 을 찾습니다.

```toml
# i18n/en-US.toml
[home]
other = "Home"
```

결과적으로 위 함수는 다음을 반환합니다.
```
Home
```

### Query a flexible traslation with variables

우리는 종종 번역된 페이지 변수를 사용하고 싶어합니다. 이를 위해선 `i18n` 함수에 `.`을 넘겨야 합니다.
```
{{ i18n "wordCount" . }}
```

이제 i18n은 `.`을 `i18n/en-US.toml`의 "wordCount" 에게 넘깁니다.

```toml
[wordCount]
other = "This is article has {{ .WordCount }} words."
```

현재 페이지에 사용된 단어가 101개라고 한다면 `.WordCount`는 101을 반환할것이고 결과적으로 다음과 같이 됩니다.

```
This article has 101 words.
```

### Query a singular/plural translation

이번엔 읽는데 걸리는 시간을 언어별로 보여주는 예시입니다.

페이지의 `.ReadingTime` 변수의 `.Count` 를 사용하기 위해 i18n 함수의 파라미터로 `.ReadingTime`을 넘겨줍니다.
```
{{ i18n "readingTime" .ReadingTime }}
```

```toml
# i18n/en-US.toml
[readingTime]
one = "One minute to read"
other = "{{.Count}} minutes to read"
```

이제 i18n 함수는 "readingTime" 을 찾고 readingTime은 `.ReadingTime.Count`가 단수(one)인지 복수인지를 판단해 둘 중 하나를 반환합니다.

`.ReadingTime.Count`가 525600이라고합시다. 그렇게되면 반환되는 결과는 다음과 같습니다.

```
525600 minutes to read
```

만약 `.ReadingTime.Count`가 1 이라면 결과는 다음과 같습니다.
```
One minutes to read
```

다음과 같이 커스텀된 데이터를 전달할 수도 있습니다.
```
{{ i18n "readingTime" (dict "Count" 25 "FirstArgument" true "SecondArgument" false "Etc" "so on, so far") }}
```

## Customize Dates
이 글을 쓸 무렵 Go는 아직 모든 지역별 날짜를 제공하지 않지만 사용자가 이를 만들어줄 수는 있습니다.

예를들어, 만약 당신이 프랑스식 달 이름을 사용하길 원한다면 여러분은 다음파일을 추가해 사용할 수 있습니다.

```yaml
# data/mois.yaml
1: "janvier"
2: "février"
3: "mars"
4: "avril"
5: "mai"
6: "juin"
7: "juillet"
8: "août"
9: "septembre"
10: "octobre"
11: "novembre"
12: "décembre"
```

이는 다음과 같은 형식으로 가져다 쓸 수 있습니다.
```html
<time class="post-date" datetime="{{ .Date.Format '2006-01-02T15:04:05Z07:00' | safeHTML }}">
  Article publié le {{ .Date.Day }} {{ index $.Site.Data.mois (printf "%d" .Date.Month) }} {{ .Date.Year }} (dernière modification le {{ .Lastmod.Day }} {{ index $.Site.Data.mois (printf "%d" .Lastmod.Month) }} {{ .Lastmod.Year }})
</time>
```

## Menus

언어별 메뉴를 정의할 수도 있습니다.
```toml
# config.toml

defaultContentLanguage = "en"

[languages.en]
weight = 0
languageName = "English"

[[languages.en.menu.main]]
url    = "/"
name   = "Home"
weight = 0


[languages.de]
weight = 10
languageName = "Deutsch"

[[languages.de.menu.main]]
url    = "/"
name   = "Startseite"
weight = 0
```

`.Site.Menus`는 언어별로 다른 메뉴를 불러올것입니다. `absLangURL` 필터는 지역에 맞는 링크로 URL을 바꿔줄 것입니다. 이 필터 없이는 영어버전의 링크를 가져옵니다.

```html
<ul>
    {{- $currentPage := . -}}
    {{ range .Site.Menus.main -}}
    <li class="{{ if $currentPage.IsMenuCurrent "main" . }}active{{ end }}">
        <a href="{{ .URL | absLangURL }}">{{ .Name }}</a>
    </li>
    {{- end }}
</ul>
```

## Missing Translations
설정이 되어있지 않은 언어는 default language를 사용합니다. default value가 없다면 빈 string이 보일겁니다.

`config`파일에서 `enableMissingTranslationPlaceholders`를 `true`로 설정하면 찾을 수 없는 언어 번역은`[i18n] identifier`에서 string placeholder를 찾아 사용합니다. `identifier`는 찾을 수 없는 언어 id 입니다.

