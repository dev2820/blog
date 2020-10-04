+++
title = "휴고 Comment"
date = 2020-10-02T20:01:13+09:00
categories = ["what_is_hugo"]
tags = ["hugo","휴고","comment","댓글창 만들기"]
banner = ""
draft = false
+++

이번글은 휴고에서 지원하는 댓글창 시스템과 기본적으로 내장된 Disqus template에 대해 다루겠습니다.

https://gohugo.io/content-management/comments/

Disqus는 서드파티 서비스로 코멘트와 커뮤니티를 자바스크립트를 통해 웹사이트에 제공합니다.

그 다음 `config` 파일에 다음을 추가합니다.

```toml
disqusShortname = "yourdiscussshortname"
```

글마다 front matter를 추가해줄 수 도 있습니다.

* disqus_identifier
* disqus_title
* disqus_url

## Render Hugo's Built-in Disqus Partial Template

필요한 layout에 다음을 추가합니다.

```
{{ template "_internal/disqus.html" . }}
```

## Comments Alternatives

대체 가능한 코멘트 서비스는 다음을 참고하십시오

https://gohugo.io/content-management/comments/#comments-alternatives
