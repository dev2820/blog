+++
title = "휴고 Comment 추가하기"
date = 2020-10-18T21:17:54+09:00
categories = ["what_is_hugo"]
tags = ["hugo","휴고","disqus","코멘트 추가하기"]
banner = ""
subcategories = ["hugo"]
draft = false
+++

## Comments

휴고는 Disqus 템플릿을 기본적으로 제공합니다. 물론 disqus 말고도 다른 코멘트 시스템을 이용할 수도 있습니다. 
하지만 여기선 Disqus 다는 방법에 대해서만 설명하겠습니다.

https://gohugo.io/content-management/comments/

### Add Disqus

먼저 disqus 계정이 필요하니 아래 링크에서 disqus에 가입합니다.

https://disqus.com/

가입하고 'I want to install Disqus on my site' 를 클릭하면 사이트를 만들 수 있는 창이 뜹니다. 대충 뚜따뚜따 만들고나면 사이트의 admin 페이지에 들어갈 수 있게 되는데, 여기서 settings->general 에 들어가면 Shortname이 무엇인지 알려줍니다. 이를 config 파일 안에 넣어줍니다.

```toml
disqusShortname = "yourdiscussshortname"
```

그리고 comment 창이 나올 (대부분 single.html 아래) 부분에 다음 줄을 추가합니다.

```html
{{ template "_internal/disqus.html" .}}
```

이렇게 하면 Disqus 코멘트창이 뜨게됩니다. 