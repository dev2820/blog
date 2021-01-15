+++
title = "휴고 Static Files"
date = 2020-10-02T18:14:55+09:00
categories = ["what_is_hugo"]
tags = ["hugo","휴고","static","static files"]
banner = ""
subcategories= ["hugo"]
draft = false
+++

이 글은 휴고의 static file에 대해 다룹니다. `static/` 디렉토리에 들어가는 모든 파일들은 다 static file이라고 생각하시면 됩니다.

https://gohugo.io/content-management/static-files/

## Static Files

static file이란 사이트 루트에 고정적으로 주어지는 파일들을 말합니다. (로고 이미지,css 등등)

기본적으로 `static/` 디렉토리에 들어가는 모든 파일은 static file입니다.(stylesheets,javascript,images 모두 포함) static file은 사이트의 루트경로에서 접근할 수 있습니다.(예를들어, `static/images.png` 파일이 있다면 이 파일은 `http://{server-url}/image.png`로 접근할 수 있고 마크다운에서 이미지를 불러오는 경우 `![example image](/image.png)` 같은 방식으로 이미지를 불러올 수 있습니다.)

`config`파일의 `staticDir` 변수값을 바꿔서 다른 static 폴더를 사용할 수도 있습니다. 그리고  static 폴더를 여러개 사용할 수도 있습니다. 이 경우 static폴더는 사이트가 build 되면서 하나로 합쳐집니다.

예를들어 두 서로다른 언어권 사이트에 각기 다른 static 폴더를 쓴다면 다음과 같이 설정합니다.
```toml
# config.toml

staticDir = ["static1", "static2"]

[languages]
  [languages.en]
    baseURL = "https://example.com"
    languageName = "English"
    staticDir2 = "static_en"
    title = "In English"
    weight = 2
  [languages.no]
    baseURL = "https://example.no"
    languageName = "Norsk"
    staticDir = ["staticDir_override", "static_no"]
    title = "På norsk"
    weight = 1
```

이 경우 English 사이트는 static1과 static2 그리고 static_en 폴더를 합쳐서 하나의 static 파일로 사용합니다.

Norsk 사이트는 staticDir_override와 static_no를 static 파일로 사용합니다.

### 주의점
`staticDir2`의 2는 0~10 사이의 수를 사용할 수 있습니다. 그리고 이 숫자는 휴고에게 이 static 디렉토리를 추가하라고 알려줍니다. 