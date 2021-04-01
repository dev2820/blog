+++
title= "[Git정리] 로컬 저장소 생성하기"
date= 2021-03-28T12:37:27+09:00
categories= ["study"]
subcategories = ["git"]
tags= ["study","컴퓨터 기술","공부정리","Git","버전관리"]
cover= ""
icon = "study/computer_science_icon.png"
draft= false
+++

## 시작하기 전에
시작하기 전 아주 간단하게 git을 설명해봅시다.

**git**: 소스 코드 버전 관리 소프트웨어
**github**: 소스 코드 원격저장소, 소스 코드 원격 호스팅 서비스

로컬저장소에서 git으로 소스 코드를 관리하고 github로 업로드 하는 형식으로 이용합니다. 업로드하는 저장소는 github가 아니어도 gitlab 등등 git과 연동되는 소스 코드 원격저장소이면 됩니다.

{{<a_blank href="https://git-scm.com/">}}Git 홈페이지{{</a_blank>}}  
{{<a_blank href="https://github.com/">}}Github 홈페이지{{</a_blank>}}

## 로컬 저장소 생성하기

Git의 새로운 저장소를 생성할 때는 보통 다음 3가지 상태 중 하나로 시작합니다.

1. 원격저장소의 소스 코드 복사본
2. 기록되지 않은 파일을 가진 로컬 폴더
3. 빈 폴더

1번의 경우 forking은 생략하고 cloning만 설명하겠습니다. forking은 나중에 다룰 예정

### `clone`: 원격저장소의 소스 코드를 복사하기

내 원격저장소에 저장된 소스 코드를 로컬 저장소로 복사해오는 경우를 cloning이라 합니다. 내 로컬 저장소(PC)에 클론이 생기는 거죠.

![github cloning](../images/cloning-1.png)
위 그림처럼 기존의 github의 프로젝트엔 clone할 수 있는 url이 있습니다. 복사하고 cloning을 해봅시다.

```bash
# git clone [원격저장소의 프로젝트 url]
git clone https://github.com/dev2820/holy_shit.git
```

위 명령을 수행하면 명령을 수행한 위치에 폴더가 생성되면서 원격저장소에 저장된 프로젝트의 내용물을 복사합니다.

### `init`: 폴더를 git의 감시하에 두기
그럼 기록되지 않은 파일을 가진 로컬 폴더(2번), 또는 아예 프로젝트를 시작하는 경우(3번)엔 로컬 git 저장소는 어떻게 시작하면 될까요.

먼저 프로젝트로 사용할 폴더를 만듭시다.

```bash
mkdir my-project
cd my-project
```

그다음 폴더를 `init` 명령으로 초기화해줍니다.
```bash
git init
```
`init` 명령은 git이 init 된 폴더를 git 저장소로 지정하고 관리하도록 만드는 명령입니다.

앞서 clone 해서 만든 저장소의 경우 자동으로 git 저장소로 지정됩니다. 따라서 프로젝트를 cloning 한 뒤, `init` 해줄 필요는 없습니다.

`init` 명령이 일어나면 git은 `.git`이라는 폴더를 생성합니다. (윈도우는 숨겨진 파일로 생성됩니다) 이 `.git` 폴더가 앞으로의 소스 코드 버전 저장 및 설정을 저장하는 폴더가 됩니다. `.git` 폴더를 지우면 저장소는 일반 폴더로 돌아옵니다.

## 마치며

다음 글에선 add, commit, 그리고 history에 대해 다뤄보겠습니다.