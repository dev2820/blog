+++
title = "휴고 Taxonomies"
date = 2020-09-30T19:06:31+09:00
categories = ["what_is_hugo"]
tags = ["hugo","휴고","taxonomy",]
banner = ""
draft = false
+++

taxonomy, 즉 분류입니다. 컨텐츠를 어떻게 분류하고 그룹화하는지에 대해 다룹니다.

https://gohugo.io/content-management/taxonomies/

## What is a Taxonomy?
휴고는 컨텐츠를 그룹화하는 taxonomies 라는 도우미를 포함하고 있습니다. taxonomies는 컨텐츠를 컨텐츠간의 논리관계에 따라 분류합니다.

### Definitions

**Taxonomy**  
컨텐츠를 클래스화하는데 사용되는 분류 입니다.

**Term**  
분류에 사용하는 키입니다.

**Value**  
term에 할당된 일부 컨텐츠들의 묶음입니다.

### Example Taxonomy: Movie Website

영화와 관련된 웹사이트를 만든다고 가정해 봅시다. 당신은 아마 다음과 같은 taxonomy를 포함할 겁니다.

* Actors
* Directors
* Studios
* Genre
* Year
* Awards

Actor 에 대한 분류는 다음과 같은 형식으로 이루어질겁니다.
```
Actor                    <- Taxonomy
    Bruce Willis         <- Term
        The Sixth Sense  <- Value
        Unbreakable      <- Value
        Moonrise Kingdom <- Value
    Samuel L. Jackson    <- Term
        Unbreakable      <- Value
        The Avengers     <- Value
        xXx              <- Value
```
영화제목을 중점으로 보면 컨텐츠의 정보와 라벨은 그대로여도 컨텐츠간의 관계는 다르게 나타납니다.  

```
Unbreakable                 <- Value
    Actors                  <- Taxonomy
        Bruce Willis        <- Term
        Samuel L. Jackson   <- Term
    Director                <- Taxonomy
        M. Night Shyamalan  <- Term
    ...
Moonrise Kingdom            <- Value
    Actors                  <- Taxonomy
        Bruce Willis        <- Term
        Bill Murray         <- Term
    Director                <- Taxonomy
        Wes Anderson        <- Term
    ...
```

## Hugo Taxonomy Defaults
휴고는 자동으로 `tags`와 `categories`에 대한 taxonomy를 만듦니다.

```toml
# config.toml의 default 설정값
[taxonomies]
    category = "categories"
    tag = "tags"
```

다음과 같은 방식으로 taxonomy를 추가할 수 있습니다.
```toml
# config.toml
# series라는 새 taxonomy를 만들 때
[taxonomies]
    category = "categories"
    series = "series"
    tag = "tags"
```

다음과 같은 방식으로 default taxonomy를 제거할 수도 있습니다.

```toml
# config.toml
# category taxonomy를 제거할 때
[taxonomies]
    tag = "tags"
```

만일 여러분의 사이트에서 taxonomy를 사용하길 원치 않는다면 다음과 같은 값을 설정에 추가해줍니다.
```toml
# config.toml
disableKinds = ["taxonomy","term"]
```

### Default Destinations

휴고는 여러분의 Taxonomy들을 가지고 컨텐츠를 분류하는 화면을 기본적으로 제공합니다. 예를 들어, `categories`라는 taxonomy가 설정파일에 있고 여러분의 컨텐츠 파일 front matter가 `categories`를 가지고 있다면 
* `example.com/categories/` 페이지가 생성됩니다. 이 페이지는 모든 `term`를 포함하는 페이지 입니다.

* 각 term에 해당하는 페이지 리스트를 포함하는 페이지가 생성됩니다.(ex. `example.com/categories/development/`) 해당 term을 front matter에 가진 컨텐츠는 이 페이지 리스트에 포함됩니다.

### Add Taxonomies to Content

컨텐츠가 어느 taxonomy 속할지 정하는 방법입니다.

간단히 front matter에 taxonomy를 추가하면 됩니다.

```toml {{ hl_lines=[1,3,5]}}
categories = ["Development"]
project_url = "https://github.com/gohugoio/hugo"
series = ["Go Web Dev"]
slug = "hugo"
tags = ["Development", "Go", "fast", "Blogging"]
title = "Hugo: A fast and flexible static site generator"
```

