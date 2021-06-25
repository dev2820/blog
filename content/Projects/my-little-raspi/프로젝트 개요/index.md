+++
title= "프로젝트 개요"
date= 2021-04-18T16:56:09+09:00
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

나의 작은 라즈베리파이 프로젝트입니다. 뭐 라즈베리파이로 말을 만든다던가 그런건 아니고 라즈베리파이에 우분투를 탑재시켜 웹앱을 서비스하는 것 까지가 목표입니다. 

라즈베리파이4를 제가 군대에 있을 때 샀는데요. 그때까지만 해도 원격으로 코딩을 하는 환경을 구축해보겠다는 포부가 있어서(군대에서 핸드폰으로 코딩...) 휴가때 라즈베리파이를 공유기에 연결하고 code-server를 까는 등 뻘짓이란 뻘짓은 다 했는데... 코로나로 휴가가 막혔죠 ㅎㅎ... 결국 미완 프로젝트로 남았습니다.

## 프로젝트 개요

전역한 지금, 구석에서 전기만 먹고있는 라즈베리파이를 다시 한번 서버로 부활시켜야겠다 마음 먹었습니다. 그래도 개발자에게 24시간 돌아가는 개인 서버가 하나 있는게 생각보다 괜찮거든요. 어차피 서버관련 공부도 할 겸, 이 라즈베리파이를 다용도 웹서버로 만들어보자는 생각이 들었습니다.  

이번 프로젝트는 로그인 폼이 들어간 간단한 웹앱을 만들어 호스팅 하는 것 까지가 목표입니다. 나중에 version 2로 nginx도 달고 docker도 사용해 본격적인 웹서버로 발전시킬까 합니다.

## 프로젝트 목표
1. 라즈베리파이에 Ubuntu 20.04 LTS 설치
2. 포트포워딩 & 방화벽 열기 작업
3. Nodejs & Express를 이용한 간단한 애플리케이션 서버 생성
4. MariaDB 연동 및 users 테이블 생성
5. express에 crud api 및 로그인 api 구현
6. Vue.js를 통한 로그인 화면 구현
    - index 페이지 구현
    - login 페이지 구현
    - signup 페이지 구현
    - modify 페이지 구현

## 기술 스텍
frontend: Vue.js  
backend: nodejs, express  
database: mariaDB(mysql)

## 동작 모델
귀찮아서 나중에 작성할게요

## 화면구성 및 인터페이스
아 귀찮아

## 마치며
아

라즈베리파이에 Ubuntu 설치하는 글로 시작합시다.