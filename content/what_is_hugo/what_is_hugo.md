---
title: "[hugo] 휴고에 대해 알아보자 (1)"
date: 2020-09-23T21:30:23+09:00
categories: ["what_is_hugo"]
tags: ["hugo","info","휴고"]
cover: ""
subcategories: ["hugo"]
draft: false 
---

## 글머리

이 글은 Hugo(이하 휴고) 공식 홈페이지와 공식 홈페이지에서 소개하는 휴고에 대해 다루고 있습니다. 페이지 설명을 번역하며 휴고에 대해서 알아볼 것입니다.

## HUGO 홈페이지

[공식 홈페이지](http://gohugo.io)

홈페이지를 처음 접속하게 되면 보게되는 문구는 다음과 같습니다.  

> The world's fastest framework for building websites
>> Hugo is one of the most popular open-source static site generators. With its amaing speed and flexibility, Hugo makes building websites fun again.

'웹사이트를 만드는데 있어 세계에서 가장 빠른 프레임 워크'  
그만큼 속도면에서 자신이 있다는 말이겠죠?

위의 설명에 따르면 휴고는 '정적 페이지 생성기'이며 놀랍도록 빠르고 유연하다고 합니다. 정적 페이지 생성기라면 가장 쉽게 떠올릴만한 사이트는 블로그가 있겠네요. 네, 휴고는 그래서 개인 블로그를 생성하는데 많이 쓰입니다. 

### HUGO의 특징

1.Blistering Speed  
휴고는 비슷한 종류의 툴 중에선 가장 빠르다고 합니다. 각 페이지를 생성하는데 1ms가 안걸리고 전체 페이지를 생성하는데 평균적으로 1초가 안걸린다고 합니다.

휴고의 베이스가 되는 언어가 Golang 이고 Golang의 속도에 대해선 너무 유명하니 납득이 되긴 합니다.

2.Robust Content Management  
휴고는 무한한 컨텐츠 타입, 분류는 메뉴, 컨텐츠를 다루는 동적 API 등등을 플러그인 없이 제공한다고 하네요.

3.Shortcodes   
휴고의 Shortcode는 markdown 문법만큼 간단한 동시에 markdown 문법보다 유연하다고 합니다. 

4.Built-in Templates  
휴고는 검색엔진최적화(SEO),댓글, 분석 및 기타 기능들을 빠르게 달 수 있는 템플릿을 제공합니다.

5.Multilingual and i18n  
휴고는 단일 언어 사이트에서 휴고 사용자들이 좋아하는 개발 경험과 동일한 직접적인 개발 경험을 가지고 다국어 사이트에 대한 완전한 i18n 지원을 제공한다. 

음... 이 부분은 잘 모르겠지만 어쨌든 i18n을 제공한다는 뜻인 것 같습니다.

6.Custom Outputs  
휴고는 JSON, AMP 그리고 개인적으로 만든 양식을 포함해 다양한 포멧을 통해 컨텐츠를 보여주는 것이 가능합니다. 즉 단순 HTML 이상의 화면을 제공할 수 있다는 뜻입니다.

## What is Hugo

[What is Hugo](https://gohugo.io/about/what-is-hugo)

홈페이지보다 더 자세한 설명이 들어있는 페이지 입니다. 
중복되는 내용과 필요없는 내용은 적당히 빼겠습니다.

휴고는 Go로 만들어진 빠르고 모던한 정적 사이트 생성기입니다. 또한 재미있게 웹사이트를 제작할 수 있도록 디자인 되었습니다.

웹사이트들은 종종 작성된 것보다 많은 것들을 보여줘야하기 때문에 휴고는 웹사이트 최종 사용자에게 최적의 화면 경험(viewing experience)와 웹사이트 제작자에게 이상적인 글쓰기 경험(writing experience)을 제공합니다. 

휴고로 만들어진 웹사이트들은 아주 빠르고 안전합니다. 휴고로 만들어진 사이트는 Netlify,Heroku,GitHub Pages,Firebase,Google Cloud Storage,Amazon S3,Azure 등등을 포함해 어디에서든 호스트될 수 있습니다. CDNs과도 잘 동작합니다. 휴고는 루비나 파이썬,PHP 처럼 긴 지연시간이나 데이터 베이스를 필요로하지 않습니다. (jekyll를 겨냥한걸까요?)

### What Does Hugo Do?

기술적인 용어로, 휴고는 템플릿과 파일들이 담긴 폴더를 가져다 하나의 새로운 웹사이트에 만드는데 사용합니다.

소스파일과 템플릿들이 하나의 완성된 웹사이트로 빌드된다는 말인듯 합니다.

### Who Should Use Hugo?
 
휴고는 텍스트 에디터에서 작성한 글을 브라우저에 올릴 사람들에게 유용합니다.

휴고는 복잡한 지연시간(runtime),의존성 그리고 데이터베이스를 걱정할 필요없이 본인이 만든 웹사이트 코드를 바꾸고(hand) 싶은 사람들에게 유용합니다.

휴고는 블로그,회사 사이트,포트폴리오 사이트, 문서화(위키를 말하는듯함),single landing page(페이스북처럼 스크롤하면 로딩되는 페이지를 말합니다.), 수천개의 페이지를 가진 웹사이트를 만드는 사람들에게 유용합니다.

## Hugo Features

[Hugo Features](https://gohugo.io/about/features)

휴고의 특징에 대해 설명하는 페이지 입니다. 홈페이지에 나온 내용과 중복되므로 적당히 줄여서 설명하겠습니다.

### General

* 몹시 빠릅니다.
* macOs,Linux,Windows 등등에 완전히 호환됩니다.
* LiveReload 기능을 제공합니다.(작성한걸 바로바로 미리볼 수 있는 기능을 말합니다.)
* 강력한 테마기능
* 당신의 사이트를 어디든 올릴 수 있습니다. 

### Orgaization

* 웹사이트 섹션을 포함해 직접적으로 당신의 프로젝트를 구조화합니다.
* URL을 커스텀가능합니다.
* 카테고리와 테그를 포함해 구성가능한 분류기능을 제공합니다.
* 강력한 템플릿 기능들을 통해 원하는대로 컨텐츠를 정렬할 수 있습니다.   
* 자동으로 목차를 만들어줍니다.
* 동적인 메뉴를 만들 수 있습니다.
* URL과 관련된 기능들을 제공합니다.
* Permalink(문서에 고정적으로 부여된 하이퍼링크)패턴을 제공합니다.
* alias를 통한 redirect 기능을 제공합니다.(특정 주소에 접근하면 다른 주소로 이동시키는 기능을 말합니다.)

### Content
* Native Markdown 과 Emacs Org-Mode를 지원합니다.
* TOML, YAML 그리고 JSON 메타데이터를 front matter로 제공할 수 있습니다. 
* 커스텀 가능한 홈페이지
* 다양한 컨텐츠 타입(컨텐츠 별로 다른화면을 제공 가능하단 뜻입니다.)
* 자동으로 또는 사용자정의에 따라 컨텐츠 요약을 만들어 줍니다.
* 마크다운 안의 내용을 더욱 풍부하게 만들어줄 수 있는 Shortcode를 제공합니다.(shortcode는 삽입가능한 짧은 코드를 말합니다.)
* Minutes to Read(읽는데 걸리는 시간을 재줌) 기능을 제공합니다.
* WordCount(단어의 수를 세줌) 기능을 제공합니다.

### Additional Features
* Disqus 댓글기능 지원
* Google Analytics 지원
* 자동으로 RSS 생성
* Go Html templates 지원
* Chroma 를 통해 문법 highlighting 기능 지원

## 그 밖의 페이지들
그 밖의 페이지들은 보안이나 GDPR, 라이센스등에 대한 글들이라 중요도가 낮다고 보여 번역하지 않았습니다. 필요하시면 직접 읽어보시는 것을 추천합니다.

https://gohugo.io/about/

이상으로 휴고 공식홈페이지에서 설명하는 휴고에 대해 알아보았고 다음 글에서는 휴고를 시작하는 방법을 알아보겠습니다.