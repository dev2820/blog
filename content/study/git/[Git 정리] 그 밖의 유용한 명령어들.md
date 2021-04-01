+++
title= "[Git 정리] 그 밖의 유용한 명령어들"
date= 2021-03-31T21:20:15+09:00
categories= ["study"]
subcategories = ["git"]
tags= ["study","컴퓨터 기술","공부정리","Git","버전관리"]
cover= ""
icon = "study/computer_science_icon.png"
draft= true
+++

## `.gitignore`: 무시할 파일
.DS_Store, .swp 등등 로컬 저장소에는 있지만 관리도 하고싶지 않고, 원격저장소에 업로드하고 싶지도 않은 파일들이 있습니다. 이런 파일들을 git이 무시하도록 하는 방법이 있습니다.

`.gitignore`는 명령은 아니고 파일입니다. 이 파일을 만들고 안에 무시하고자 하는 파일들을 입력한 뒤,commit을 만들어 원격저장소에 `push` 해주면 이제 이 파일들은 암만 바꾸어도 git이 감지하지 않습니다.

```bash
vi .gitignore
# 무시할 파일들 이름 입력
test.txt
*.swp
```

## `stash`: 변경사항 임시저장하기
**아주** 유용한 명령어입니다. 현재 변경사항들을 임시저장합니다.
```bash
git stash
```
주의할 점은, git은 새로 만든 파일은 stash로 저장하지 않습니다. 새로 만든 파일을 임시저장하려면 `--include-untracked`옵션을 추가해야합니다.

```bash
git stash --include-untracked
```

stash 이름에서 눈치챌 수 있듯, stash는 stack자료구조 방식으로 동작합니다. 처음 저장한 stash가 마지막에 나옵니다. 

현재까지 생성한 stash 목록을 보려면 다음 명령을 사용합니다.
```bash
git stash list
```

저장한 변경사항을 자세히 보려면 아래 명령을 씁니다.
```bash
# git stash@{[stash 번호]}
git stash@{0}
```
stash 번호는 0부터 1씩 증가하며 쌓입니다. stack이니까 3개의 stash를 저장하면 2번 stash가 top에 있겠죠?

```bash
# git stash drop stash@{[삭제할 stash 번호]}
git stash drop stash@{1}
```
stash를 삭제할 수도 있습니다.

```bash
# git stash apply stash@{[적용할 stash 번호]}
git stash apply stash@{0}
```
중간에 있는 stash를 적용할 수도 있는데, 이 경우 stack에 stash가 남아있기 때문에 drop을 해줘야합니다.

```bash
# top stash를 꺼내는 명령
git stash pop

# 중간에 있는 stash를 꺼낼 때
# git stash pop stash@{[꺼낼 stash 번호]}
git stash apply stash@{0}
```
pop은 apply+drop을 합친 명령입니다.

저는 stash를 주로 현재 작업중인 내용을 commit으로 만들지 않고 다른 브랜치를 이동할 때 사용합니다. 

## `bisect`: 에러를 찾아 commit을 되돌아보기
**아주** 유용한 명령어 2 입니다. 우리는 흔히 코드를 작성하고 병합하다 어느 순간 원인 모를 에러가 뜨는 경우를 자주 경험합니다. 그럴 때 어느 commit에서 부터 에러가 생기는지 확인해 볼 수 있는 명령어입니다. 

```bash
# git bisect start
# git bisect good [에러가 안나는 commit]
# git bisect bad [에러가 나는 commit]
git bisect start
git bisect good 4e985c8
git bisect bad 2539351
```
에러가 안나는 commit과 에러가 나는 commit 사이에 끼어있는 악성 commit을 찾는 여정이 시작됩니다.

이분 탐색 방식으로 commit을 돌아다니며 유저에게 에러가 나는지 안나는지 물어봅니다.
```bash
git bisect bad
git bisect good
git bisect bad
.
.
.
```
유저는 git이 집어준 commit을 살펴보고 에러가 나면 `git bisect bad` 에러가 일어나지 않으면 `git bisect good`을 입력해줍니다. 이분 탐색이니 logN 이면 문제를 일으키는 악성commit을 찾을 수 있겠죠.

```bash
# bisect 종료
git bisect reset
```
bisect 상태에서 commit을 수정하진 못합니다. 문제의 commit을 발견하면 `git bisect reset`으로 bisect을 종료하고 commit을 처리할 방안을 마련해야합니다.

## 그 외의 개념, 명령어

### show
```bash
# git show [특정 commit]
git show d717e6
```
한 커밋의 자세한 정보를 볼 수 있는 명령입니다.

### diff
```bash
# git diff
git diff

# git diff [브랜치]
git diff good-idea

# git diff [브랜치] [브랜치2]
``` 
`git diff`는 HEAD와 다른 수정사항들을 보여줍니다.  
`git diff [브랜치]`는 HEAD가 아닌 가리키는 브랜치와 비교합니다.  
`git diff [브랜치] [브랜치2]`는 두 브랜치를 비교해 다른점을 알려줍니다.

### clone vs fork
fork는 다른 사람의 repository를 복사해 나의 repository를 만드는 행위입니다.

clone은 원격저장소의 소스코드들을 내 로컬저장소(PC)로 받아오는 행위이구요.

## 마치며

이상으로 Git 정리를 마무리짓겠습니다. 오타, 오류 지적 환영입니다. 감사합니다.