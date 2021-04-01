+++
title= "[Git정리] 버전관리의 시작"
date= 2021-03-28T14:11:53+09:00
categories= ["study"]
subcategories = ["git"]
tags= ["study","컴퓨터 기술","공부정리","Git","버전관리"]
cover= ""
icon = "study/computer_science_icon.png"
draft= false
+++

이번 글에선 생성된 로컬 저장소를 바탕으로 git으로 버전 관리를 하는 방법에 대해 다루겠습니다.

## `status`: 저장소의 상태 파악하기

```bash
git status
```
현재 저장소의 상태를 알려주는 명령어입니다. 변경된 파일, 새로운 파일, staged 상태 등등의 다양한 정보를 사용자에게 알려줍니다.

```bash
$ git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```
아무것도 바꾼 게 없는 상태에선 `status` 명령이 위와 같이 뜹니다.

새로운 파일 `test.txt`를 생성하고 내용을 입력해봅시다.
![new file:test.txt](../images/status-new-file.png)

파일을 생성하고 내용을 입력한 뒤, 저장까지 해주면 `git status` 명령은 다음과 같이 뜹니다.

```bash
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
 (use "git add ..." to include in what will be committed)
 test.txt

nothing added to commit but untracked files present (use "git add" to track)
```

git이 새로 생긴 파일을 감지하고 다음으로 뭘 하면 될지 알려주고 있습니다. 당연한 소리겠지만, 저장하지 않으면 git은 파일이 바뀐 것을 인지하지 못합니다.

## `add`:바뀐 내용 기록 전 준비단계
이제 바뀐 `test.txt` 파일을 기록해 버전 관리를 시작해 봅시다.

git의 버전 관리는 `staging`이라는 준비단계를 거칩니다. 이번 버전에 바뀐 점들을 고르는 단계라고 할 수 있습니다.

예를 들어, 버그 패치가 있다고 합시다. A 버그를 수정하기 위해 `a`, `b` 파일의 내용을 수정했다면, A 버그가 수정된 버전에선 `a` 파일과 `b` 파일이 바뀌었다고 기록하는 겁니다. `add` 명령이 바로 A 버그 수정을 위해 변경된 파일들을 고르는 명령입니다.

```bash
# git add [staging 할 파일 이름]
git add test.txt
```

이제 `git status`를 수행한 결과는 다음과 같이 바뀝니다.
```bash
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
 (use "git restore --staged ..." to unstage)
 new file:   test.txt
```

참고로 staging 된 파일을 또다시 수정하는 경우 해당 파일을 다시 `add` 해줘야 합니다. staging 된 파일엔 `add` 된 순간의 파일 명세를 기록하고 있기 때문입니다. (스냅샷으로 기록한다고 합니다.)

### 한 번에 staging 하기
아래와 같은 명령으로 한 번에 변경된 파일들을 모두 staging 할 수도 있습니다.

```bash
git add .

git add *

git add --all
```

### 일부분만 staging 하기
예를 들어, A라는 버그와 B라는 추가기능이 있다고 합시다. 우리는 A라는 버그를 수정하기 위해 a 파일의 5번 줄을 지웠고, B라는 추가기능을 위해 a 파일에 6, 7번 줄을 추가했습니다. 이제 'A 버그 해결!'이라는 메시지의 commit과 'B 기능 추가!'라는 메시지의 commit 두 개를 만들어야 합니다.

하지만 우리는 한 파일을 통째로 staging 하기 때문에 'A 버그 해결!' commit을 만들고 나면 'B 기능 추가!'를 만들 수 없습니다. 이런 경우를 위한 옵션이 있습니다.

```bash
# git add --patch [파일 이름]
git add --patch test.txt

# 또는 git add -p [파일 이름]
```

위 명령을 실행하면 git이 대화형 모드로 바뀝니다.
```bash
$ git add -p test.txt
diff --git a/test.txt b/test.txt
index 8ecfc97..3440ad3 100644
--- a/test.txt
+++ b/test.txt
@@ -2,4 +2,6 @@



-A버그를 일으키는 코드
\ No newline at end of file
+
+B 기능 추가 코드1
+B 기능 추가 코드2
\ No newline at end of file
```
y,n,q,a,d,e,?중 선택하라고 합니다. 무슨 선택지인지는 ?를 입력하면 알 수 있습니다.

귀찮으면 다 모르고 그냥 `e`를 입력해줍시다. 그러면 우리는 edit모드로 들어갑니다.

```bash
# Manual hunk edit mode -- see bottom for a quick guide.
@@ -2,4 +2,6 @@



-A 버그를 일으키는 코드
\ No newline at end of file
+
+B 기능 추가 코드1
+B 기능 추가 코드2
\ No newline at end of file
# ---
# To remove '-' lines, make them ' ' lines (context).
# To remove '+' lines, delete them.
# Lines starting with # will be removed.
#
# If the patch applies cleanly, the edited hunk will immediately be
# marked for staging.
# If it does not apply cleanly, you will be given an opportunity to
# edit again.  If all lines of the hunk are removed, then the edit is
# aborted and the hunk is left unchanged.
```
vi가 켜졌습니다. 이제 staging 하지 않을 줄은 다음과 같은 작업을 해줘야 합니다.

- 삭제된 줄( '-'가 붙은 줄 )은 '-'를 ' ' (공백)으로 바꿔줍니다.
- 추가된 줄( '+'가 붙은 줄 )은 줄 자체를 삭제해버립니다.

저는 B 기능 추가 코드만 남겨 'B 기능 추가!' commit을 먼저 만들어보겠습니다.

```bash
# Manual hunk edit mode -- see bottom for a quick guide.
@@ -2,4 +2,6 @@



 A 버그를 일으키는 코드
\ No newline at end of file
+
+B 기능 추가 코드1
+B 기능 추가 코드2
\ No newline at end of file
# ---
# To remove '-' lines, make them ' ' lines (context).
# To remove '+' lines, delete them.
# Lines starting with # will be removed.
#
# If the patch applies cleanly, the edited hunk will immediately be
# marked for staging.
# If it does not apply cleanly, you will be given an opportunity to
# edit again.  If all lines of the hunk are removed, then the edit is
# aborted and the hunk is left unchanged.
```

이제 vi를 저장하고 종료하면 파일의 일부분만 staging 됩니다. `git status` 명령을 입력해보면 test.txt 파일이 staging도 되어있고 staging 되지 않았다고도 뜹니다.

### staging 취소하기
vscode를 쓰는 분들은 아주 쉽게 취소할 수 있지만, CLI에서는 staging을 취소하는 방법을 알아야 합니다.

```bash
# git reset HEAD [파일 이름]
git reset HEAD test.txt
```

reset에 관해서는 나중에 더 자세히 다루겠습니다.

## `commit`: 바뀐 내용을 기록하라
이제 staging 된 파일들을 하나의 버전으로 기록합시다. git에서 한 버전을 **commit**이라고 합니다. staging들을 묶어서 하나의 commit으로 만들게 됩니다.

```bash
git commit
```

```bash
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Your branch is up to date with 'origin/main'.
#
# Changes to be committed:
#       new file:   test.txt
#
```
갑자기 터미널에 Vi에디터가 켜집니다. 친절하게 주석으로 설명해줘서 알겠지만, 해당 버전에서 바뀐 내용에 대한 설명을 달기 위한 Vi에디터입니다. 여기에 바뀐 파일들이 무엇 때문에 바뀌었는지, 어떻게 바꿨는지 등등을 기록해주면 됩니다.

양껏 내용을 작성한 뒤, 저장하고 Vi에디터를 빠져나오면 commit이 기록됩니다. 저는 'create test.txt for study!'라는 문구를 작성하고 vi에디터를 나왔습니다.
```bash
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Your branch is up to date with 'origin/main'.
#
# Changes to be committed:
#       new file:   test.txt
#
create test.txt for study!
```

주석은 다 제거되고, 첫 번째 줄은 해당 커밋을 요약해 보여줄 때 사용됩니다.

```bash
$ git commit
[main b68df9f] we create test.txt for study!
                                             1 file changed, 1 insertion(+)
                                                                            create mode 100644 test.txt
```

위와 같은 문구가 뜨면 성공적으로 commit이 생성된 것입니다. 앞서 vi창에서 작성한 내용을 commit message라고 합니다. 팀 프로젝트를 한다면 이 메시지 내용을 어떻게 쓸지 정해놓는 게 앞으로의 버전 관리를 위해 좋습니다.

짧은 설명으로도 충분하다면 다음과 같은 방법으로 커밋 메시지를 달 수도 있습니다.

```bash
git commit -m "create test.txt for study!"
```

## `log`: 히스토리 보기
한 프로젝트의 생성된 commit들을 생성 순서대로 나열한 것을 **history**라고 합니다. 순서대로 기록되어 있어야 나중에 버전을 되돌리거나 할 때 충돌이 없겠죠?

최초의 commit이 생성됨에 따라 history가 생성됩니다. 이제 history를 조회할 수 있습니다.

`log` 명령은 history를 보여줍니다.

```bash
$ git log
commit b68df9f747c84c75ac8d38f909bc85653cfed009 (HEAD -> main)
Author: [유저 정보]
Date:   Sun Mar 28 14:30:06 2021 +0900

    we create test.txt for study!
```

history를 보면 알겠지만, commit들은 해쉬화 되어 저장됩니다. 위의 해쉬값을 통해 특정 commit을 조회하거나 버전을 되돌리는 등의 작업을 할 수 있습니다.

### `--oneline`옵션
```bash
git log --oneline
```
위 명령으로 간략화된 history를 볼 수 있습니다.

## 마치며

다음 글에선 git의 핵심 기능이라 할 수 있는 branch에 대해 알아보겠습니다.