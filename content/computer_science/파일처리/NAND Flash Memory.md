+++
title= "NAND Flash Memory"
date= 2021-03-17T01:24:12+09:00
categories= ["computer_science"]
tags= ["파일처리","공부"]
subcategories = ["파일처리"]
cover = ""
icon = "computer_science/computer_science_icon.png"
draft= true
+++

## Flash Memory의 등장

2000년대 초반 디지털 카메라의 열풍이 불던 시기, Flash Memory가 등장하게 됩니다. 플레쉬 메모리는 비휘발성 반도체 저장장치로, 하드디스크가 자기적 특성을 이용해 데이터를 저장한 것과 다르게 전기적 특성을 이용해 값을 저장합니다.

## 사용
흔히 알고있는 SSD, USB 메모리가 바로 플레쉬 메모리이고, 핸드폰에 들어가는 저장공간도 SSD입니다. 

## 장단점

* 빠른 접근 속도
* 작은 전력 소비량
* 내구성
* 작은 크기
* 작은 무게
* 소리가 안 남

HDD에 비해 장점은 압도적으로 많습니다. HDD와 달리 모터를 돌릴 필요가 없기 때문에 전력 소비량도 줄어들고 소음도 나지 않게 되었습니다. 또한 HDD에서 head를 움직이면서 들어가던 cost들이 전혀 들어가지 않게 되면서 비순차적으로 레코드를 읽더라도 I/O cost가 거의 동일해 졌습니다. 그리고 크기도 작고 가벼워졌죠. 여기까지만 보면 Flash Memory를 쓰지 않을 이유가 없습니다.

단점은 비싸다. 단 하나입니다. HDD 1TB 가격이 ssd 250GB와 맞먹습니다. 

## NAND Flash Memory 구조
NAND Flash Memory는 여러 page 들로 구성된 Block들로 이루어집니다.
또한 한 Page는 실제 데이터가 저장되는 Main Area와 meta데이터가 저장되는 Spare Area로 나뉩니다.

![NAND 플레쉬 구조](../images/nand-flash-구조-min.jpg)

## HDD와 다른점

- 탐색시간 감소

Head가 사라지면서 Seek Time, Rotational Delay가 없어집니다. 덕분에 레코드에 비순차접근 하더라도 걸리는 시간은 거의 동일해집니다.

- 쓰기 속도와 읽기 속도가 다르다

HDD는 읽기 속도와 쓰기 속도가 거의 동일합니다. 하지만 SSD는 write에 들어가는 시간이 read에 들어가는 시간보다 10배 많이 들어갑니다.

- in-place update 불가능

데이터를 덮어 씌우는 것이 불가능하고 한 번 데이터를 비워주고 다시써야합니다. 또한 이 데이터를 비워주는 작업이 write의 10배 cost가 들어갑니다. (아주아주 느림)