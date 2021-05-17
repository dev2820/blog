+++
title= "라즈베리파이4와 우분투 설치"
date= 2021-04-18T17:27:37+09:00
categories= ["projects"]
subcategories = ["my-little-raspi"]
tags= ["라즈베리파이4","웹앱","nodejs","vue.js","mariadb","express"]
cover= "cover"
icon = "projects/project-icon.png"
draft= true

[[resources]]
  name= "cover"
  src= "images/my-little-raspi-banner.png"
+++

## 라즈베리파이?
{{<figure-img src="./images/raspi-logo.png" alt="raspberry-pi icon">}}
라즈베리파이 로고
{{</figure-img>}}

라즈베리파이 재단에서 만든 교육용 초소형 컴퓨터입니다. 핸드폰이 들고다니는 초소형 컴퓨터라면 이해가 빠를 겁니다. 제가 사용할 모델은 라즈베리파이4B 4GB모델입니다.

{{<figure-img src="./images/라즈베리파이4-1.jpg" alt="raspberry-pi icon">}}
라즈베리파이4B (4GB)
{{</figure-img>}}

제가 쓰는 녀석입니다. 휴가때 찍은 사진인데 이제야 쓰는군요. 가까이서 찍어서 티가 안나는데 배경에 보이는 마룻바닥 너비가 10cm입니다.  

### 라즈베리파이4B 4GB 스펙
|장치|스펙|
|:--:|:--:|
|CPU|Broadcom BCM2711, 쿼드 코어 Cortex-A72 (ARM v8) 64bit SoC @ 1.5GHz|
|RAM|4GB LPDDR4|
|ROM|미제공|
|유선네트워크|10/100/1000Mbps 기가비트 이더넷|
|Wi-Fi|802.11b/g/n/ac Dual-Band|
|블루투스|Bluetooth 5.0|
|소비전력|5V 3A|
|포트|2개의 USB 3.0포트, 2개의 USB 2.0포트,1개의 microSD 슬롯, micro HDMI 포트 2개(4K까지 이용 가능하다 하네요),1개의 이더넷 포트| 

{{<comment>}}출처: 나무위키( https://namu.wiki/w/%EB%9D%BC%EC%A6%88%EB%B2%A0%EB%A6%AC%20%ED%8C%8C%EC%9D%B4(%EC%BB%B4%ED%93%A8%ED%84%B0) ){{</comment>}}

ROM이 미제공이기 때문에 사용자가 직접 저장장치를 달아줘야합니다. 보통 운영체제가 올라갈 microSD에 USB 메모리나 HDD를 달아서 사용하더라구요. 물론 정말 하드하게 쓰는 유저는 외장SSD를 다는 경우도 있습니다. 저는 samsung microSD 128gb 하나를 달아줬습니다.

최근에 알았는데 일반 microSD는 OS를 깔기 적합하지 않다네요. A1로고가 붙은 microSD를 사용하면 병목없이 사용한다 합니다. 어쩐지 디스플레이를 연결하면 프리징현상이 있더라구요.

{{<figure-img src="./images/라즈베리파이4-3.jpg" alt="raspberry-pi icon">}}
라즈베리파이 뒷면의 microSD 슬롯
{{</figure-img>}}
그리고 전력을 5V, 3A 먹기 때문에 3A 충전기를 따로 구입해야합니다. (보통 쓰는 충전기가 2A)

CPU 스펙은 왤케 느려 소리 안나올 정도로 쓸만합니다. 전에 벤치마크점수 뒤적이다 봤었는데 갤럭시 s6와 비슷한 성능이었던거 같습니다.(정확하진 않습니다) 

### 발열 이슈
{{<figure-img src="./images/라즈베리파이4-4.jpg" alt="raspberry-pi icon">}}
라즈베리파이 + 쿨러
{{</figure-img>}}
발열이 어쩌구 저쩌구 해서 예쁜 쿨러도 하나 같이 사서 달아줬습니다.

### 못마땅...
다 좋은데 쿨러를 다니까 사용할 수 있는 케이스가 없어서 보드가 훤히 들어나는게 미관을 해칩니다. 언제 한번 3d 프린터도 공부하든지 해야겠어요. ㅡㅡ

## 라즈베리파이용 우분투 설치

{{<a_blank href="https://ubuntu.com/download/raspberry-pi">}}라즈베리파이용 우분투 설치 페이지{{</a_blank>}}

ubuntu-server 20.04 LTS (64bit)를 클릭하면 ubuntu Image 다운이 진행되며 설치방법을 알려줍니다. 라즈베리파이가 ARM 아키텍처이기 때문에 ARM기반 Ubuntu인지 확인해줘야합니다.

우분투 설치가 주내용은 아니니까 설치관련 내용은 패스하겠습니다. 나중에 더 좋은 microSD랑 HDD를 구해서 라즈베리파이를 업그레이드 해준다면 그때 설치에 관한 내용 자세히 다루겠습니다.

잘 구워진 microSD를 sd슬롯에 꽂아주세요.

## 세팅 끝
공유기와 랜선 연결, 3A 충전기 연결, OS가 올라간 microSD 장착, 그리고 micro HDMI로 모니터와 연결하면 준비는 끝입니다. 다음은 Ubuntu 초기 설정만 해주면 됩니다. 이것도 다음에 기회가 되면 자세히 다룰게요.

## 마치며
이제 서버컴이 준비가 됐으니 방화벽을 열고 포트포워딩을 해줘야합니다. 다음 글은 ufw와 포트포워딩에 대한 글이 되겠네요.



