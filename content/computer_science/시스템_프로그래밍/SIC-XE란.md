+++
title= "SIC-XE란"
date= 2021-03-17T23:46:25+09:00
categories= ["computer science"]
tags= ["시스템_프로그래밍","공부"]
subcategories = ["시스템_프로그래밍"]
cover = ""
icon = "computer_science/computer_science_icon.png"
draft= false
+++

## SIC/XE란?
제목을 SIC/XE로 하고 싶었는데 파일명에 `/`를 못 써서 SIC-XE라고 썼습니다... 원래 표기는 SIC/XE가 맞아요.

SIC/XE는 무엇인가? SIC/Extra Equipment, 즉, SIC 머신의 확장판입니다.

## Memory
SIC/XE가 되면서 메모리의 크기가 약 1Mbyte로 증가했습니다. 정확하겐 2^15Byte에서 2^20Byte로 증가한 거죠.(32배 커짐 ㄷㄷ)

따라서 메모리 주소도 0000~7FFF에서 00000~FFFFF로 표기하게 됩니다.

## Registers

4개의 레지스터가 추가되었습니다.

| 레지스터 이름 | 레지스터 번호 | 레지스터 용도 |
|---|:---:|:---:|
| B | 3 | Base, base-register addressing에 사용하는 레지스터 |
| S | 4 | 범용 레지스터 |
| T | 5 | 범용 레지스터 |
| F | 6 | Floating-point accumulator 레지스터, 실수 연산을 지원하기 위해 있는 레지스터로, 다른 레지스터와 다르게 48 bits를 사용합니다 |

네! 그렇습니다. SIC/XE 머신은 float 연산을 지원합니다. 하지만 여기선 float 연산을 지원한다고만 알고 넘어가겠습니다.

## 명령어 구조

SIC에선 주소를 지정하는 target address가 15 bits이고, 메모리 주소도 15 bits로 전부 표현 가능했기 때문에 Direct Addressing(직접 주소지정 방식)과 Indexed Addressing(인덱스 주소지정 방식)으로도 충분했지만, SIC/XE에선 메모리가 커져서 모든 메모리를 표현하기엔 15 bits론 모자랐습니다. 따라서 2가지 선택지가 생겼죠.

- 상대 주소지정 방식을 사용한다.
- target address를 15 bits에서 20 bits로 늘린다.

Relative Addressing(상대 주소지정 방식)은 뒤에서 설명하겠습니다.

메모리가 커졌고, SIC/XE가 되면서 지원하는 명령어도 많아졌습니다. 이 명령어들을 다음 4개 형식으로 구분할 수 있습니다.

![명령어 형태](../images/SIC-XE명령어-4형식-min.jpg)
### 1형식

opcode만 사용하는 명령어입니다. 따라서 1 Byte만 필요합니다.
1형식 예제로 FIX이라는 명령어가 있는데, 이 명령어는 F register(실수가 저장됨)의 값을 정수로 변환해 A register 저장하는 명령어입니다.


### 2형식

opcode와 2개의 레지스터 번호(= 레지스터의 주소)로 구성됩니다.
예를 들어 ADDR T A의 경우 T register의 값과 A register의 값을 더해서 A register에 저장합니다.

### 3형식

opcode와 6개의 flag, disp로 구성됩니다. opcode가 6bits로 줄어든 것을 확인할 수 있는데, 어떻게 이런 일이 가능하냐면, 사실 처음부터 SIC가 안 쓰는 2 bits가 존재했기 때문입니다.

SIC 명령어들은 맨 오른쪽 2bit에 항상 0 값입니다. (즉 쓰이지 않음) 따라서 3형식에서는 이 안 쓰는 2 bits를 n과 i라는 flag를 나타내는 데 사용합니다.

맨 오른쪽 12 bits(disp)는 기준 address로부터 얼마만큼 떨어진 address가 target address인지 알려주는 값입니다.

| mode | indication | target address calculation |
|---|:---:|:---:|
| Base relative mode | b=1, p=0 | TA = B register + disp(0 <= disp <= 4095) |
| PC relative mode | b=0, p=1 | TA = PC register + disp(-2048 <= disp <= 2047) |
| Direct mode | b=0, p=0 | TA = disp |


b=1, p=0으로 설정되면, Target Address는 **Base-Register Addressing(베이스 레지스터 주소지정 방식)**을 사용합니다. target address는 B register의 값에 disp를 더한 값으로 설정되는데, 이때 disp는 양수만 사용합니다. 따라서 0~2^12-1(=4095)의 값을 disp로 설정할 수 있습니다.

b=0, p=1로 설정되면, Target Address는 **Relative Addressing(상대 주소지정 방식)**을 사용합니다. target address는 PC register의 값에 disp를 더한 값으로 설정되는데, 이 disp는 양수, 음수 모두 사용합니다. 따라서 disp는 (-2^11~2^11-1)의 값을 사용할 수 있습니다.

b=0, p=0으로 설정되면 Target Address는 dips 값 그 자체가 됩니다.

### 4형식
target address를 20 bits로 늘려 사용하는 명령어들입니다.

e=1이 되면 target address가 4형식을 따른다는 뜻입니다. 3형식에선 e는 무조건 0으로 설정되겠죠? 또한 4형식이면 b, p는 모두 사용되지 않음으로 0으로 설정됩니다.

또한, 여기서 n과 i가 어떻게 설정되느냐에 따라 사용하는 주소지정 방식이 달라집니다.

n=0, i=1로 설정되면, **Immediate Addressing(즉치 주소지정 방식)**입니다. 즉치 주소지정 방식은 target address가 주소값을 저장하는 게 아니라 실제 연사에 사용되는 값을 저장합니다. 따라서 메모리 접근이 일어나지 않습니다. (아주 빠름)

n=1, i=0으로 설정되면, **Indirect addressing(간접 주소지정 방식)**입니다. target address가 저장되는 것이 아니라 target address가 저장된 메모리의 주소를 저장합니다. 따라서 2번의 메모리 접근이 일어납니다. (느림)

참고로 즉치 주소지정 방식과 간접 주소지정 방식은 loop을 지원하지 않습니다.

## Flag들 정리
| mode | indication |
|---|:---:|
| n | 1이면 간접주소지정방식 |
| i | 1이면즉치주소지정방식 |
| x | loop 지원을 위한 flag |
| b | 1이면 베이스레지스터 주소지정방식  |
| p | 1이면 상대주소지정방식 |
| e | 1이면 직접주소지정방식 |

b=0, p=0, e=0 -> 직접주소지정방식(12 bits)
b=1, p=0, e=0 -> 베이스레지스터 주소지정방식
b=0, p=1, e=0 -> 상대주소지정방식

b=0, p=0, e=1 -> 직접주소지정방식(20bits)
----    n=0, i=1 -> 즉치주소지정방식(메모리 접근 x)
----    n=1, i=0 -> 간접주소지정방식(메모리 접근 2번)
----    n=0, i=0 -> SIC 명령어 방식, 절대 주소 방식(메모리 접근 1번)
----    n=1, i=1 -> SIC/XE에서 호환되는 SIC 명령어들

## 명령어들

**Load&Store**
레지스터가 추가됨에 따라 Load, Store 명령어들이 추가됐습니다.
LDB, STB 등등

**Floating Point Arithmetic**
float 연산이 가능해지면서 float의 사칙연산 명령어가 추가됐습니다.
ADDF,SUBF, MULF,DIVF

**Register instruction**
범용 레지스터가 생기면서 레지스터 간의 연산이 가능해졌습니다.
RMO, ADDR, SUBR, MULR, DIVR

**I/O**
SIC/XE가 되면서 I/O Device에서 값을 입력받거나 입력하면서 동시에 연산도 진행하는 기술이 추가되었습니다. 따라서 SIO, TIO, HIO의 명령어가 생겼습니다.


여기선 그냥 그런 기능과 그런 명령어가 추가됐다고만 알고 넘어가겠습니다.
