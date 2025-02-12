+++
title= "Hard Disk Drive 2"
date= 2021-03-16T22:59:00+09:00
categories= ["computer_science"]
tags= ["파일처리","공부"]
subcategories = ["파일처리"]
cover = ""
icon = "computer_science/computer_science_icon.png"
draft= true
+++

## record를 읽는 순서

레코드를 읽는 순서에 따라 HDD의 Read, Write 시간이 달라질 수 있습니다.

다음과 같이 가정해보겠습니다. 

| 스펙 | 값 | 
|---|:---:|
|Average seek time| 8ms | 
|Spindle speed| 10000rpm | 
|Average rotational delay| 3ms | 
|Bytes per sector| 512 |
|Sectors per track|170|

위의 스펙을 가지는 하드디스크가 있고, 이 하드디스크에는 8,704KByte 크기의 파일이 256 Byte 레코드 34,000개에 나누어져 저장되어 있다고 합시다. 그렇다면 이 파일 전체를 읽는 데 걸리는 시간은 얼마나 될까요?
(1 Cluster=8 sectors이며, 하드에 다른 파일은 없다고 가정합니다)


### 순차적으로 레코드를 읽을 때 걸리는 시간
한 Program이 이 파일의 모든 레코드를 순서대로 읽어 들인다고 합시다. 0번 레코드 읽으면 다음은 1번 레코드 읽고 그 다음은 2번 레코드 읽고 ... 이렇게 읽어 들이는 겁니다.

레코드를 순서대로 읽기 때문에 HDD는 한 트랙씩 데이터를 읽어 들이면 됩니다. 

먼저 읽어야 하는 트랙의 수부터 구해봅시다. 256 Bytes 크기의 레코드가 34,000개 있으니 읽어야 하는 Byte 수는 8,704,000개입니다.

> 읽어야 하는 Bytes = (256*34000) Bytes = 8,704,000 Bytes

그럼 트랙당 Byte 수는 총 몇 개일까요?
위의 스펙 표를 참고해보면 한 트랙은 170개의 섹터가 있고, 한 섹터는 512 Bytes를 가지고 있으니 한 트랙의 Byte 수는 87,040개입니다.

> 트랙당 Bytes = (170*512) Bytes = 87,040 Bytes

따라서 읽어야 하는 트랙의 수는 100개가 나옵니다.

> 읽어야 하는 트랙의 수 = 읽어야 하는 Bytes / 트랙 당 Bytes = 8,704,000/87,040 = 100

한 트랙을 읽는 데 걸리는 시간은 Seek Time + Rotational Delay + Transfer Time입니다.
Seek Time과 Rotational Delay는 위 스펙 표에서 나오니 알 수 있습니다. 

한 트랙을 전부 transfer 하는데 걸리는 시간은 rpm의 역수입니다. 
(1분에 10000번 회전하니, 1번 회전하는 데 걸리는 시간은 1/10000분입니다)
> Transfer Time = 1/10,000m = 6ms

따라서

> 한 트랙을 읽는 데 걸리는 시간 = Seek Time + Rotational Delay + Transfer Time = (8 + 3 + 6) ms = 17ms

100트랙을 읽어야 하니 17*100ms = 1.7 seconds, **1.7초**가 걸립니다.

### 비순차적으로 레코드를 읽을 때 걸리는 시간
비순차적으로 레코드를 읽는다는 것은 1번 레코드를 읽고 99번 레코드를 읽고 10500번 레코드를 읽고 ... 이렇게 랜덤한 순서로 레코드를 읽는다는 뜻입니다. 

한 레코드를 읽을 때마다 읽어야 하는 레코드의 위치가 바뀌니, HDD는 트랙 단위로 파일을 읽을 수 없고, 최악의 경우 레코드의 수 만큼 클러스터를 읽어 들여야 합니다. 

한 클러스터를 Transfer 하는 시간은 얼마일까요?

1 클러스터 = 8 섹터라고 했고, 한 트랙은 170 섹터로 이루어진다고 했습니다. 따라서 Transfer Time은 8/170*6ms입니다.

> 1 Cluster Transfer Time = 8/170 * 6ms = 0.28ms

이제 한 레코드를 읽는 데 걸리는 시간은 

> 한 클러스터를 읽는 데 걸리는 시간 = Seek Time + Rotational Delay + Transfer Time = (8 + 3 + 0.28) ms = 11.28ms

최악의 경우 34,000개의 클러스터를 읽게 되므로 모든 파일을 읽는 데 걸리는 시간은 34000*11.28ms = 383.52 seconds, 약 **6분 30초** 가까이 걸립니다.

Program이 레코드를 순서대로 읽는다면 1.7초면 이 파일을 다 읽지만, 순서대로 읽지 않는다면 6분까지도 cost가 발생합니다. 왜 이렇게 큰 차이가 나는 걸까요?

### 왜 두 번째 방법이 느릴까?

![파일을 읽을 때](../images/파일을-읽을-때-min.jpg)

위 그림과 같이 User Program이 반복적으로 read()를 실행한다고 합시다. 처음 User Program은 read()로 0번 레코드를 읽어달라고 OS에게 부탁합니다. OS는 FAT을 참조해 해당 레코드가 있는 클러스터를 HDD에게 읽어달라고 부탁하게 됩니다. 

여기서 알 수 있듯, OS는 클러스터만큼 파일을 읽어 들이기 때문에 0번 레코드만 읽게 되는 것이 아니라 1, 2,... 레코드들도 같이 읽게 됩니다. 위의 문제에선 1 cluster = 8 sectors, 1 sector = 256Byte, 1 record = 256Byte 이기 때문에 OS는 한 번에 0~7번 레코드까지 읽어 들이게 됩니다. 

HDD는 읽은 데이터를 OS에게 넘겨주고 OS는 이 데이터를 Buffer에 저장하게 되는데, OS는 다시 이 버퍼에서 레코드 단위로 읽어 User Program에게 보내주게 됩니다. 실제론 read에서 파라미터로 정해준 주소 값에 값을 복사해서 저장하겠죠? 

다시, User Program이 1번 레코드를 읽어 달라고 OS에 요청하면 OS는 먼저 버퍼에 해당 레코드가 존재하는지 확인합니다. 1번 레코드는 버퍼에 존재하고, OS는 FAT을 참조해 데이터를 읽어달라고 HDD에게 요청하지 않아도 됩니다. 따라서 HDD에 접근하면서 생기는 cost가 발생하지 않게 되죠.

반면 User Program이 비순차적으로 레코드를 요청한다고 가정합시다.
음... 예를 들어 1번 레코드 -> 10번 레코드 -> 200번 레코드 이렇게 요청한다고 하죠. 이 경우 1번 레코드를 읽고 나면 버퍼엔 1, 2,... 8 번 레코드가 존재하게 됩니다. 10번 레코드는 버퍼에 존재하지 않기 때문에 다시 HDD에 요청을 보내게 되고, 또다시 cost가 발생합니다. 최악의 경우 읽어야 하는 레코드의 수 만큼 cost가 발생합니다.

## write 하는 경우 OS의 동작
좀 더 자세한 OS의 동작을 살펴보기 위해 이번엔 User Program이 'p'라는 문자(1Byte)를 TEXT 파일의 마지막 위치에 저장하는 경우를 살펴봅시다.

![파일을 쓸 때](../images/파일을-쓸-때-min.jpg)

이상으로 HDD에 대한 내용은 마칩니다. 다음 글부터는 Flash Memory에 대해 알아보겠습니다.