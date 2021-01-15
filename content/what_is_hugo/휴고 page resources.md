+++
title = "휴고 Page Resources"
date = 2020-10-03T17:47:18+09:00
categories = ["what_is_hugo"]
tags = ["hugo","휴고","Page Resources"]
banner = ""
subcategories= ["hugo"]
draft = false
+++

이미지, 다른 페이지, 문서 등등 모든 페이지 리소스는 relative URL과 메타데이터를 가집니다. 페이지 리소스는 페이지 리소스가 포함된 페이지 번들에서만 사용가능합니다. 예를 들어

https://gohugo.io/content-management/page-resources/


## Properties

**ResourceType**  
리소스의 메인 타입입니다. 예를들어 MIME type 이 `image/jpeg`인 파일의 ResourceType은 `image`입니다.

**Name**  
기본적으론 파일이름이 Name이 됩니다. front matter를 통해 Name을 바꿔줄 수 있습니다.

**Title**  
default값은 `.Name`과 같습니다. 마찬가지로 front matter에서 바꿔줄 수 있습니다.

**Permalink**  
리소스로 가는 절대경로입니다. `page` 타입의 리소스는 이 값을 가지지 않습니다.

**RelPermalink**  
리소스로 가는 상대경로입니다. 마찬가지로 `page` 타입의 리소스는 이 값을 가지지 않습니다.

**Content**  
리소스의 content 입니다. 대부분의 리소스는 `.Content`가 파일의 contents를 string으로 반환합니다. 이는 inline 코드에 사용될 수 있습니다.
예를들어 `<script>{{ (.Resources.GetMatch "myscript.js").Content | safeJS }}</script>`나`<img src="{{ (.Resources.GetMatch "mylogo.png").Content | base64Encode }}">` 처럼요.

**MediaType**  
리소스의 MIME type입니다. (예를들면 `image/jpeg`)

**MediaType.MainType**  
리소스의 MIME type중 메인 type입니다.예를들어 `application/pdf`가 MIME type이면 `application`이 해당됩니다.

**MediaType.SubType**  
리소스의 MIME type중 서브 type입니다.예를들어 `application/pdf`가 MIME type이면 `pdf`이 해당됩니다. 주의할점은 이 값이 파일확장자를 의미하는것은 아니라는 점입니다. 파워포인트같은 경우는 subtype이 `vnd.mspowerpoint`가 됩니다. 

**MediaType.Suffixes**  
리소스의 MIME type중 가능한 접미사 조각입니다.

## Methods

**ByType**  
페이지 리소스의 타입을 반환합니다.
```
{{ .Resources.ByType "image" }}
```

**Match**  
이름이 매치되는 모든 페이지 리소스를 반환합니다.
```
{{ .Resources.Match "images/*" }}
```

**GetMatch**  
`Match`와 같지만 일치하는 첫 번째 값만 반환합니다.

### 매칭 예시

```
// Using Match/GetMatch to find this images/sunset.jpg ?
.Resources.Match "images/sun*" ✅
.Resources.Match "**/sunset.jpg" ✅
.Resources.Match "images/*.jpg" ✅
.Resources.Match "**.jpg" ✅
.Resources.Match "*" 🚫
.Resources.Match "sunset.jpg" 🚫
.Resources.Match "*sunset.jpg" 🚫
```

## Page Resources Metadata
페이지 리소스의 메타데이터는 페이지의 front matter에 `resources` 배열이나 테이블로 관리됩니다. 여러분은 여기에 와일드카드를 사용할 수 있습니다.

**name**  
리소스의 `Name`을 정합니다.
`Match`나 `GetMatch` 메소드는 이 이름을 사용해 매치되는지 찾습니다. 

**title**  
`Title`이 반환할 값을 정해줍니다.

**params**  
커스텀 key/value 맵입니다.

### 예제
```toml
# 특정 페이지의 front matter
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

### The `:counter` placeholder in `name` and `title`

`:counter`는 특별한 placeholder 입니다. 이 placeholder는 `resources`파라미터의 `name`과 `title` 에만 사용할 수 있습니다.

예를 들어, 현재 번들이 `photo_specs.pdf`,`other_specs.pdf`,`guide.pdf` 그리고 `checklist.pdf`라는 리소스를 가지고 있다고 합시다. 그리고 페이지에 다음과같은 front matter가 정의되어있다 합시다.

```toml
[[resources]]
    src = `"pdf-file-1.pdf"`"*specs.pdf"
    title = "Specification #:counter"

[[resources]]
    name = "pdf-file-:counter"
    src = "**.pdf"

```

이제 리소스의 `Name`과 `Title`은 다음과 같이 매치됩니다.

| Resource file | `Name` | `Title` |
|---|:---:|---:|
| checklist.pdf | `"pdf-file-1.pdf"` | `"checklist.pdf"` |
| guide.pdf | `"pdf-file-2.pdf"` | `"guide.pdf"` |
| other_specs.pdf | `"pdf-file-3.pdf"` | `"Specification#1"` |
| photo_specs.pdf | `"pdf-file-4.pdf"` | `"Specification#2"` |