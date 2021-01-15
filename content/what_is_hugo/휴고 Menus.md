+++
title = "휴고 Menus"
date = 2020-10-01T23:42:40+09:00
categories = ["what_is_hugo"]
tags = ["hugo","휴고","menu"]
banner = ""
subcategories= ["hugo"]
draft = false
+++

휴고엔 강력한 메뉴 시스템이 있습니다.
이 메뉴시스템으론 다음과 같은 일을 할 수 있습니다.
* 메뉴 안에 컨텐츠 배치
* 제한없는 메뉴 depth
* 어떠한 컨텐츠도 필요없는 메뉴 엔트리 만들기
* 엑티브 요소 구별

https://gohugo.io/content-management/menus/

## What is a Menu in Hugo?
**menu**는 `.Site.Menus` 사이트 변수로 사용 가능한 메뉴 엔트리들의 배열입니다. `main`이라는 메뉴가 있으면 `.Site.Menus.main` 으로 접근 가능합니다.

## Add content to menus
휴고에선 front matter를 통해 메뉴에 컨텐츠를 집어넣는 것이 가능합니다.

만약 메뉴에 엔트리만 추가하는 것이 목적이라면 다음과 같이 간단합니다.

**A Single Menu**  
```toml
+++
menu = "main"
+++
```

**Multiple Menus**  
```toml
+++
menu = ["main","footer"]
+++
```

**Advanced**  
```toml
+++
[menu]
    [docs]
        parent = 'extras'
        weight = 20
+++
```

## 컨텐츠 없이 엔트리 메뉴에 추가하기
`config`파일을 이용해 메뉴 엔트리를 구성할 수도 있습니다.

```toml
[menu]

  [[menu.main]]
    identifier = "about"
    name = "about hugo"
    pre = "<i class='fa fa-heart'></i>"
    url = "/about/"
    weight = -110

  [[menu.main]]
    name = "getting started"
    post = "<span class='alert'>New!</span>"
    pre = "<i class='fa fa-road'></i>"
    url = "/getting-started/"
    weight = -100
```

## Nesting
컨텐츠의 모든 중첩은 `parent` 필드를 통해 이루어집니다. 

엔트리의 `parent`는 또다른 엔트리의 식별자입니다.그리고 이 식별자는 유일해야합니다.

식별자로 사용되는 front matter는 다음 순서대로 입니다.
```
.Name > .LinkTitle > .Title
```

## 마치며

메뉴 template이 필요한 분들은 다음 링크를 참조하면 됩니다.

https://gohugo.io/templates/menu-templates/
