+++
title = "휴고에서 컨텐츠 지정하고 글 생성해보기"
date = 2020-08-08T15:25:11+09:00
categories = ["일상"]
tags = ["longtesttagtest","hugo","blog","test","휴고","블로그"]
cover = "/images/ocean.jpg"

draft = false
+++

## hugo로 build 하는 법
hugo의 최상위 폴더로 가서 `hugo` 만 입력하면 됩니다.

내가 지금 hugo를 blog 폴더 안에 만들어 놨으니 대충 'blog/hugo' 여기 서 빌드하면 됩니다. hugo의 하위 폴더에서는 hugo 명령어가 먹지 않으니 주의
```bash
cd ~/blog/hugo
hugo
```
## hugo 사용할 테마 정하는 방법
테마를 받아서 (github에서 clone) themes폴더에 저장하고 
hugo 명령을 사용할 때 `-t` 옵션과 사용할 테마명을 입력해주면 됩니다.
```bash
hugo -t [테마명]
```
## hugo로 글 쓰는법
`hugo new [archetypes에 만들어 놓은 양식 이름]/[글 제목].md`
혹은
`hugo new [글 제목].md`
입니다.

### archetypes
hugo 최상위 폴더에는 **archetypes** 폴더가 있는데 이 폴더 안에 보면 `default.md` 파일이 있습니다. 이 default.md 파일이 글을 쓸 때 기본 템플릿이 됩니다. 
```bash
archetypes/default.md 파일
---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
categories: []
tags: []
cover: ""
draft: true
---

```

```
hugo new [아무이름].md
```
위와 같은 명령을 하면 `hugo/content` 위치에 `[아무이름].md` 의 파일이 생깁니다. 바로 이 파일이 블로그에 올라갈 글 하나하나가 됩니다.

default.md 의 내용을 바꿔 기본 카테고리와 글의 커버 이미지 등을 바꿀 수 있습니다. 

default라는 이름에서 알 수 있듯 만약 post.md 라는 템플릿 파일을 만든다면 포스트 타입의 글을 빠르게 작성할 수 있게됩니다. 
```bash
archetypes/post.md 파일
---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
categories: ['post']
tags: []
cover: ""
draft: true
---
```

```bash
hugo new post/first_post.md
```

이렇게 되면 `content/post/first_post.md`파일이 생성됩니다. 그리고 first_post.md 파일은 post.md 파일의 형식에 맞게 생성 됩니다.

## 작성한 글 미리보기
```bash
hugo server -D
```

위 명령을 입력하면 localhost:1313 위치에 임시 서버가 오픈되어 작성할 글을 테마를 적용하여 미리볼 수 있습니다. 이 임시서버에 보여주는 컨텐츠는 `draft`가 `true`로 되어있어도 글이 보여 글을 업로드 하기전에 볼 수 있습니다.

어떤 테마로 블로그를 만들어 보여줄지는 최상위 폴더의 config.toml에 theme 값을 뭘로 해주느냐에 따라 결정됩니다.