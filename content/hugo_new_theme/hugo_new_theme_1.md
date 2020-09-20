---
title: "Hugo_new_theme_1"
date: 2020-09-18T16:10:55+09:00
categories: ["projects"]
series: ['휴고 테마 만들기']
tags: ["project","DIY"]
cover: ""
draft: true
---

## Hugo에서 새로운 테마 만들기
```bash
hugo new theme [테마이름]
```

위 명령을 입력하면 'themes/테마이름' 에 새로운 폴더가 생깁니다.

```
themes
└ theme_name
    └ archetypes
        └ default.md
    └ layouts
        └ _default
            └ baseof.html
            └ list.html
            └ single.html
        └ partials
            └ footer.html
            └ head.html
            └ header.html
        └ 404.html
        └ index.html
    └ static
        └ css
        └ js
    └ LICENSE
    └ theme.toml
```
생성되는 기본 테마 구조는 위와 같은데 여기서 자유롭게 변형하면 됩니다.

archetypes - 글의 기본 템플릿을 저장하는 폴더입니다. 

layouts - 블로그의 전체적인 view를 구성하는 곳입니다. 

static - 이것 저것 정적인 파일을 저장하는 곳입니다.


## index.html
홈페이지. 블로그를 들어가면 처음 보게될 페이지 입니다.

## 페이지 변수들
페이지의 상태를 알기위한 여러가지 변수를 가져다 쓸 수 있는데 자세한 내용은 hugo 공식 홈페이지에 나와있습니다.

h<ttps://gohugo.io/variables/page/>