+++
title= "UFW와 포트포워딩"
date= 2021-05-02T22:27:24+09:00
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

우분투가 올라간 저의 라즈베리파이를 앞으로 **파이서버**라고 부르겠습니다. 

## 공유기에 라즈베리파이 장착
인터넷 선을 꽂을 곳이 마땅치 않아서 일단 공유기에 달아줬습니다. 랜선 하나 다이소에서 싸게 사서 파이서버를 공유기에 연결해줬습니다. (3000원인가 했던 것 같음) 와이파이로 파이서버를 연결할 수도 있지만 집 인터넷이 느려서 조금이라도 속도를 끌어올리려고 유선으로 연결했습니다.

## 내 ip주소 확인하는 방법
연결한 파이서버의 주소를 확인해봅시다. 공유기에 파이서버를 연결했으므로 공유기 관리자 화면에서 파이서버의 주소를 확인할 수 있습니다. 와이파이가 연결된 기기(ex. 핸드폰)에서 192.168.0.1 주소에 접속합니다.(공유기에 따라 관리자 화면 접속 IP가 다를 수 있습니다. 접속이 안되면 그 공유기 모델을 구글링해보세요)

> 공유기 관리자 화면 주소: 192.168.0.1 

{{<figure-img src="images/tp-link_화면.jpg" alt="공유기 관리자 화면">}}
공유기 관리자 화면
{{</figure-img>}}
무슨 공유기를 쓰는가에 따라 다른 화면이 나올텐데 저는 TP-LINK 공유기를 사용해서 TP-LINK 관리자 화면이 나왔습니다. iptime쓰시는 분들은 iptime 관리자 화면이 나올겁니다.

보통 초기 아이디/비밀번호는 admin/admin입니다. 아니라면 공유기 모델을 구글링 해서 초기 아이디/비밀번호를 알아내야합니다. 

{{<figure-img src="images/공유기_관리자_화면의_IP주소.jpg" alt="공유기 관리자 화면 - IP주소">}}
IP 주소 확인
{{</figure-img>}}
공유기 상태화면을 살펴보면 WAN 부분에 MAC주소 IP주소 등등이 나와있습니다. 이 IP 주소가 외부에서 공유기에 접속할 때 필요한 IP 주소입니다. 어디 적어두거나 외웁시다. 

{{<figure-img src="images/DHCP_클라이언트.jpg" alt="공유기 관리자 화면 - DHCP 클라이언트 목록">}}
DHCP 클라이언트
{{</figure-img>}}
DHCP 클라이언트 목록에 들어가게 되면 공유기에 연결된 기기들을 볼 수 있습니다.(유선,무선) 파이서버에 할당된 IP 주소를 확인할 수 있는데 이 주소는 공유기가 설정한 유동IP 입니다. 앞서 확인한 공유기 주소가 실제 IP(공인 IP)이고 공유기는 공유기에 연결된 기기들을 관리하기 위해 가상 IP주소를 만들어 부여합니다. 따라서 외부에서는 가상 IP 주소를 사용할 수 없습니다. 

공유기와 기기의 연결이 끊어졌다 다시 연결되면 가상 IP를 새로 부여합니다. 이 때문에 고정IP설정을 해줘야하는데 이건 아래에서 다룹시다. 
 
## SSH를 이용한 파이서버 접속 & IP 확인
근데 이렇게 안하고 우분투에서 파이서버의 IP를 확인해줄 수 있습니다. 구태여 어려운 길로 가는 것 같지만 앞으로 데스크탑에서 파이서버에 접속해 이런 저런 할 일들이 많으니 미리 SSH 접속을 연습합시다. 

우분투를 깔때 기본적으로 ssh 서버가 설치되도록 설정되어 있는 걸로 아는데 만약 ssh 서버가 설치되어 있지 않다면 ssh 서버를 설치해줘야합니다. 이 경우 모니터를 연결해야 합니다. 

```bash
sudo apt-get update
sudo apt-get install openssh-server

ufw enable # 방화벽 열기(아래에서 다룹니다.)
ufw allow 22 # 22번 포트 open
ufw reload # 새로고침

sudo service ssh start # ssh 서비스 시작

sudo service ssh status # ssh 서비스가 작동하는지 확인
```

이제 데스크탑에 ssh 클라이언트를 설치합시다.

{{<a_blank href="https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html">}}PuTTY 다운로드 페이지{{</a_blank>}}

위 링크 접속하면 PuTTY 다운로드 화면이 나옵니다. 컴퓨터에 맞춰 PuTTY를 설치해줍니다. PuTTY가 아닌 다른 SSH 클라이언트를 쓰실분은 다른거 쓰셔도 됩니다.

{{<figure-img src="images/putty 화면.png" alt="putty 사용법">}}
putty 사용법 1
{{</figure-img>}}

설치된 putty를 키면 위와 같은 화면이 나옵니다. Host Name에 공유기의 IP를 입력해줍니다. (ex. 123.456.1.789) 저는 my-raspi라는 이름으로 Load해놓고 쓰고 있습니다. 

이제 Open하면...? 아직 연결이 되지 않습니다. 공유기에서 22번 포트를 포트포워딩 해줘야 하거든요. 참고로 FTP 연결은 21번, SFTP 연결은 22번을 사용합니다.

## 포트포워딩
포트포워딩은 쉽게 말하면 공유기로 들어온 Request를 어떤 기기에게 넘겨줄지 경로를 설정하는 과정입니다. 데스크탑에서 파이서버에 SFTP연결하기 위해선 공유기를 거쳐야 하기 때문에 공유기에 "22번 포트로 오는 Request는 파이서버로 전달해" 라는 설정을 해줘야합니다.

{{<figure-img src="images/포트포워딩1.jpg" alt="포트포워딩">}}
포트포워딩
{{</figure-img>}}

공유기 관리자 화면에서 NAT설정 -> 포트포워딩으로 들어가면 포트포워딩을 설정할 수 있는 화면이 나옵니다. 21,22번 포트를 192.168.0.102에 연결합니다. 

파이서버의 가상IP가 192.168.0.107이 아니라 192.168.0.102인 이유는 고정 IP를 설정해줘서 그렇습니다. 글 마지막 쯤에 고정 IP에 대해 다루겠습니다.

{{<figure-img src="images/putty 화면.png" alt="putty 사용법">}}
putty 사용법 1
{{</figure-img>}}

자 다시 putty로 돌아와서 ip를 입력하고 open을 누르면 다음과 같은 화면이 뜹니다.

{{<figure-img src="images/putty 화면2.png" alt="putty 사용법2">}}
putty 사용법 2
{{</figure-img>}}

로그인할 계정과 비밀번호를 물어보는데 입력하면 파이서버에 접속되며 쉘이 뜹니다. 이제 쉘 명령을 입력해 공유기의 주소를 알아냅시다.

먼저 curl이 없다면 curl을 깔아줍시다.
```bash
# 설치
sudo apt-get update & sudo apt-get install curl 

# 버전확인
curl -V
```

```bash
curl ifconfig.me
```
위 명령을 쉘에 입력하면 나오는 주소가 공유기의 주소입니다.

```bash
ifconfig
```
{{<figure-img src="images/putty 화면3.png" alt="putty 사용법3">}}
putty 사용법 3
{{</figure-img>}}
위 명령을 입력하면 파이서버의 가상 IP를 확인할 수 있습니다.(eth0 의 inet이 가상 IP 입니다.)

## UFW 설정
이제 방화벽을 열어봅시다. 방화벽을 열어야 외부에서 접속이 가능해집니다. SSH 연결을 해줬다면 putty로, 아니면 파이서버에 모니터 연결해서 쉘 키시면 됩니다.

우분투의 기본 방화벽은 UFW입니다. 이 UFW에 웹서버로 사용할 80번 포트(http)를 열어봅시다.

```bash
sudo ufw enable # UFW를 키는 명령

sudo ufw status verbose # UFW 상태 확인

sudo ufw allow 80 # UFW 80번 포트 열기

sudo ufw deny 80 # UFW 80번 포트 닫기
```

## 80번 포트 포트포워딩
이제 공유기 IP로 접속했을 때 192.168.0.102:80로 접속되도록 포트포워딩을 합시다.

{{<figure-img src="images/포트포워딩2.jpg" alt="포트포워딩2">}}
80번 포트 포트포워딩
{{</figure-img>}}

공유기 IP에 http 접속 시 192.168.0.102:80(파이서버 80번 포트)로 연결되도록 하면 좋겠지만, 공유기 IP의 80번 포트는 공유기 관리자 페이지가 이미 사용하고 있으므로 다른 포트를 사용해야 합니다. 저는 11111번 포트를 192.168.0.102:80에 연결해줬습니다.

이제 공유기 IP(공인 IP)가 123.456.1.789라고 한다면 123.456.1.789:11111에 접속하면 192.168.0.102:80에 접속하는 것처럼 됩니다. 물론 아직은 웹앱을 만들지 않았기 때문에 아무것도 안나오지만요.

## 고정 IP 설정
제가 군대에 있을 때 파이서버를 설치하고 후회했던게 고정 IP를 설정 안했다는 것입니다. 파이서버가 꺼지거나 공유기가 꺼지지 않는 한 부여된 가상 IP는 변하지 않기 때문에 귀찮아서 고정 IP를 설정 안해줬습니다. (이게 뭐가 귀찮다고...) 군에 복귀하고 한달 뒤에 집에 정전이나더군요 허허

무튼 정전등의 이유로 파이서버가 꺼지는 것에 대비해 항상 같은 가상 IP를 부여하도록 고정 IP 설정을 해줍시다.

준비물은 MAC 주소입니다. MAC 주소를 알아냅시다.
```bash
ifconfig
```
{{<figure-img src="images/ifconfig.png" alt="ifconfig">}}
ifconfig - MAC 주소 알아내기
{{</figure-img>}}
wlan0의 ether에 써진 `dc:~~:~~:~~:~~:~~` 형식의 문자열이 MAC 주소입니다.

{{<figure-img src="images/고정IP.jpg" alt="고정 IP 설정">}}
고정 IP 설정
{{</figure-img>}}
공유기 관리자 페이지에서 고정IP 설정화면에 MAC 주소와 사용할 고정 IP 주소를 입력하면 됩니다. 참 쉽죠?

## 마치며
포트포워딩도 하고, 방화벽도 열었으니 이제 nodejs와 express로 사용할 웹앱을 만들어봅시다.