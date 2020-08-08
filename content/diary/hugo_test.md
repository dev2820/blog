---
draft: false

title: "휴고에서 컨텐츠 지정하고 글 생성해보기"
date: 2020-08-08T15:25:11+09:00
categories: ["일상"]
tags: ["hugo","blog","test","휴고","블로그"]
cover: ""
---

## 글머리
지금 20만원짜리 똥 레노버 태블릿으로 원격연결해서 글을 써보고 있는데 답답해 미칠 것 같아서 지금 해놓은거 안까먹으려고 쓰는 글이다.

연결이 일단 느리고 한글을 입력하고 스페이스바를 치면 스페이스바가 먼저 나오고 글이 입력된다. 미치고 환장할 노릇

느린건 레노버 태블릿 램이 부족한건지 서버 돌리고 있는 노트북이 멀어서 그런건지 원래 원격ssh가 느린건지 알 수 없는데 제발 태블릿 문제였으면 좋겠다.
태블릿 바꿔도 이모냥이면 노트북 대신 태블릿을 들고다니려는 내 계획이 무산된다. 제발

## hugo로 build 하는 법
hugo의 최상위 폴더로 가서 `hugo` 만 입력하면 된다.

내가 지금 hugo를 blog 폴더 안에 만들어 놨으니 대충 'blog/hugo' 여기 서 빌드하면 된다. hugo의 하위 폴더에서는 hugo 명령어가 먹지 않으니 주의
```bash
cd ~/blog/hugo
hugo
```

## hugo로 글 싸는법
`hugo new [archetypes에 만들어 놓은 양식 이름]/[글 제목].md`
혹은
`hugo new [글 제목].md`
이다.

### archetypes
hugo 최상위 폴더에는 **archetypes** 폴더가 있는데 이 폴더 안에 보면 `default.md` 파일이 있다. 뭐냐면

```
hugo new [아무이름].md
```
이런 명령을 하면 `hugo/content` 위치에 `[아무이름].md` 의 파일이 생긴다. 바로 이 파일이 블로그에 올라갈 글 하나하나가 된다. default.md는 이 생성될 글의 default값을 저장할 파일이다.

내용을 보여주고 싶지만 위에서 언급했듯 글쓰는 환경이 최악이라 생략하겠다.

default.md 의 내용을 바꿔 기본 카테고리와 글의 커버 이지미 등을 바꿀 수 있다. 

 default라는 이름에서 알 수 있듯 만약 post.md 라는 파일을 만든다면 포스트 타입의 글을 빠르게 작성할 수 있게된다. 
 ```bash
 hugo new post/first_post.md
 ```

 이렇게 되면 `hugo/content/post/first_post.md`파일이 생성된다. 그리고 first_post.md 파일은 post.md 파일의 형식에 맞게 생성 된다.


