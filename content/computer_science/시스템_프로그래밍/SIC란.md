+++
title = "SIC란"
date = 2021-03-17T14:05:19+09:00
categories= ["computer science"]
tags= ["시스템_프로그래밍","공부"]
subcategories = ["시스템_프로그래밍"]
cover = ""
icon = "computer_science/computer_science_icon.png"
draft= true
+++

## SIC 머신이란
SIC 머신이란 Simplified Instructional Computer 즉, 간략화된 교육용 컴퓨터입니다. 간략화되어서 메모리도 작고 1Word도 3Bytes 밖에 안되며 정수만 지원하는 등 기능이 제한되어 있습니다.

### Memory
컴퓨터에서 연산이 일어나는 기본 단위를 **Word**라고 합니다. 컴퓨터에서 수행하는 명령이 1Word로 구성되고, 연산도 1word단위로 일어납니다. 32bit 컴퓨터의 경우 한 명령이 32bits로 이루어 지게 됩니다. 

**SIC 머신은 1word = 3bytes(24bits)를 사용합니다.**

총 메모리량은 32,768(2^15) bytes 이며, momery 주소는 Byte 단위로 주소가 붙습니다.

즉 SIC 머신의 메모리 주소는 0x0000 ~ 0x7FFF 까지 존재하는 거죠.

1Word가 3Bytes 이기 때문에 `ADD 0500` 같은 명령이 일어나면 메모리에서 0500 ~ 0502까지의 값을 읽고 사용하게 됩니다.

### Registers

SIC 머신은 각기 다른 용도의 레지스터 5개로 이루어집니다.
한 레지스터의 크기는 1Word 입니다.

| 레지스터 이름 | 레지스터 번호 | 레지스터 용도 |
|---|:---:|:---:|
| A | 0 | Accumulator, 계산 결과를 임시저장하는 레지스터 |
| X | 1 | indeX register, loop를 지원하기 위해 존재하는 레지스터 |
| L | 2 | Linkage register, return을 지원하기 위해 존재하는 레지스터 |
| PC | 8 | Program Counter, 수행할 명령어를 가리키기 위해 존재하는 레지스터 |
| SW | 9 | Status Word, 다양한 상태 Flag들을 저장하는 레지스터 CC레지스터를 포함합니다 |

SW는 나중에 설명하겠지만, 각 비트가 의미하는 정보가 다르게 구성되어 분기,루프 등등의 기능에 사용되는 레지스터입니다. ex) zero flag -> 연산결과가 0 이면 1, 아니면 0이 된다.

### 데이터 구조

SIC 머신은 실수를 지원하지 않으며, 24bit로 이루어진 정수만 지원합니다. 따라서 쓸 수 있는 정수는 -2^23 ~ 2^23-1 까지입니다. 음수는 2의 보수를 이용해 표현합니다. 

character는 8bit을 사용하며 ASCII code 규칙을 따릅니다. 8bit을 사용하지만 -2^7 ~ 2^7-1의 수를 사용하는 것은 아니고 0 ~ 2^7-1(=127)까지의 수만 사용하고 1bit는 정보 전달 과정에 생기는 오류를 검출하는데 사용합니다. 자세한건    [parity bit](https://ko.wikipedia.org/wiki/%ED%8C%A8%EB%A6%AC%ED%8B%B0_%EB%B9%84%ED%8A%B8)을 참조하세요.

{{< a_blank href="https://ko.wikipedia.org/wiki/%ED%8C%A8%EB%A6%AC%ED%8B%B0_%EB%B9%84%ED%8A%B8" >}}parity bit{{< /a_blank >}}



