+++
title= "mariaDB 설치하기"
date= 2021-05-03T14:32:31+09:00
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


유저 정보를 저장할 DB를 깔아봅시다.

## 데이터베이스 기초 지식
크게 DataBase는 두 종류로 나눠집니다.

- SQL DATABASE (관계형 데이터베이스)
- NO-SQL DATABASE (비관계형 데이터베이스)

SQL DATABASE가 흔히 아는 SQL 질의문을 사용한 데이터를 불러오거나 저장하는 데이터베이스, NO-SQL은 그냥 SQL을 안쓰는 모든 데이터베이스를 지칭합니다. 

SQL DATABASE의 대표적인 제품군으론 
SQL DATABASE
- Oracle
- MySQL
- SQLite
- MariaDB
- postgreSQL

등이 있고 각 데이터 베이스마다 조금씩 차이가 있습니다.

NO SQL DATABASE의 대표적인 제품군으론
- MongoDB
- Cassandra
- Redis

등이 있습니다. Key-Value 방식의 데이터 베이스를 쓰는 Redis, json 형식의 데이터 베이스를 쓰는 MongoDB 등 데이터를 저장하고 불러오는 방식이 다양하죠. 

보통은 NO-SQL이 SQL보다 성능면에서 조금 더 앞서는 것으로 알려져 있습니다. 그리고 NO-SQL이 데이터를 분산 저장(수평적 확장)에 더 유리합니다. 따라서 NO-SQL은 대용량 데이터 저장에 적합합니다.(머신러닝 등에 유용하겠죠?)

반면 SQL은 테이블 간의 join (두 테이블을 이용해 필요한 새 테이블을 뽑아냄), 데이터 업데이트에 더 적합합니다. 그리고 SQL의 특징상 중복되는 데이터가 생기지 않습니다. (데이터 무결성 보장)

유저 정보는 무결성이 보장되어야하고, 유저 column이 추가, 삭제되기보단 변경이 더 자주 일어날 것 같으니 Login에 사용할 유저 정보 저장은 SQL이 더 적합할 것 같네요. 차피 이용자가 평균적으로 1명일 것 같기도 하구요.

## mariaDB를 선택한 이유
먼저 mariaDB의 특징을 알아봅시다.

사실 mariaDB는 MySQL과 거의 똑같습니다. MySQL의 오픈소스 버전이라고 생각하면 됩니다. MySQL 만드신 분들이 MySQL을 fork해서 만들었다고 합니다. 그래서 MySQL이랑 거의 똑같습니다. MySQL과 차이점은 더 가볍고 MySQL에서 제공하지 않는 기능들도 추가적으로 제공한다고 합니다.

mariaDB를 선택한 이유는 단순합니다.
- 무료
- MySQL과 문법이 같음
- 날짜,시간을 위한 데이터 형식을 따로 지원함

MySQL(또는 mariaDB)와 SQLite중 뭘 쓸지 고민하는 사람도 많은데, SQLite는 이름처럼 몹시 가벼운 대신 기능을 많이 제공하지 않습니다. 특히 DATE 데이터 형식을 제공하지 않습니다. 그리고 SQLite는 동시 사용자가 한 명인 앱에 더 적합합니다. 물론 동시 사용자는 한명이 될 예정이지만 확장성을 고려해 mariaDB를 씁시다.

## 데스크탑에 mariaDB 설치

그럼 이제 데스크탑에 mariaDB를 깔고 파이서버에도 똑같이 깔아줍시다. 

{{<a_blank href="https://mariadb.org/download/">}}mariaDB 다운로드{{</a_blank>}}
</br>

윈도우는 위 링크에서 설치하면 됩니다.
설치화면을 캡쳐를 안했는데 대충 next 누르다 비밀번호 설정하라고 하면 비밀번호 설정하고 서비스 이름이랑 TCP port 설정하라고 하면 설정하면 됩니다. 보통은 port는 3306 그대로 쓰고 개인적으로 바꾸고 싶으면 바꾸면 됩니다. 

install이 완료되면 MySQL Client와 HeidiSQL이 설치되는데 HeidiSQL은 GUI, MySQL Client는 CLI 입니다. 참고로 HeidiSQL은 다른 SQL도 열어볼 수 있습니다. (SQLite 등)

mariaDB를 깔았는데 MySQL Client가 맞냐구요? 그러게요. 저도 수정해야 한다고 생각합니다.

파이서버에선 CLI로 데이터 베이스를 관리해야하기 때문에 테이블 생성, 변경은 MySQL Client를 통해서 하고 같은 코드를 그대로 파이서버에 사용합시다.

MySQL Client를 켜봅시다.
{{<figure-img src="./images/mariadb-cli.png" alt="mariadb-cli">}}
MySQL Client
{{</figure-img>}}
첫 줄에 패스워드를 물어보는데 아까 설치할때 설정한 root 비밀번호를 입력해줍시다. 그러면 위 그림처럼 MariaDB CLI로 접속하게 됩니다.

먼저 mylittleraspi 데이터 베이스를 만들어봅시다.
```mysql
/* 데이터 베이스 생성 */
CREATE DATABASE mylittleraspi;

/* 데이터 베이스 조회 */
SHOW DATABASES;

/* 데이터 베이스 삭제 */
DROP DATABASES;
```

데이터 베이스 생성은 `CREATE DATABASE`로 생성합니다.
`SHOW DATABASES` 명령은 모든 데이터 베이스들을 보여주는 명령입니다.
참고로 소문자로 입력해도 작동합니다.

{{<figure-img src="./images/mariadb-show-databases.png" alt="mariadb-show-databases">}}
모든 데이터베이스 보기
{{</figure-img>}}

명령 뒤엔 세미콜론(;)을 붙여줘야하는데 자꾸 깜빡하고 다음줄에서 세미콜론을 붙입니다. 아오

여하튼 mylittleraspi 데이터 베이스가 생성된 것을 볼 수 있습니다.
데이터 베이스에 들어가서 유저 정보 테이블을 생성해봅시다.

```mysql
/* 데이터 베이스 사용 */
USE mylittleraspi;

/* 테이블 생성 */
CREATE TABLE users (
no INT NOT NULL AUTO_INCREMENT,
id VARCHAR(20) NOT NULL,
name VARCHAR(20) NOT NULL,
email VARCHAR(80) NULL,
password VARCHAR(100) NOT NULL,
salt VARCHAR(100) NOT NULL,
created_at DATETIME NOT NULL DEFAULT now(),
PRIMARY KEY(no),
UNIQUE INDEX id_UNIQUE (id ASC)
)
DEFAULT CHARSET=utf8
ENGINE=InnoDB;

/* 테이블 삭제 */
DROP TABLE users;
```
테이블 필드 정의는 다음과 같습니다.

|필드|데이터 타입|설명|NULL 허용|
|:--:|:--:|:--:|:--:|
|no|INT|회원번호, 새 유저가 등록될 때마다 1씩 증가합니다. primary key|no
|id|VARCHAR(20)|유저 아이디, 다른 유저와 중복되는 아이디를 허용하지 않습니다.|no
|name|VARCHAR(20)|유저 이름|no
|email|VARCHAR(80)|유저 이메일|yes
|password|VARCHAR(100)|비밀번호|no
|salt|VARCHAR(100)|salt|no
|created_at|DATETIME|계정 생성 일자, 계정 생성시 자동으로 값이 채워집니다.|no

```mysql
/* 데이터 베이스의 테이블 목록 조회 */
SHOW TABLES;

/* 특정 테이블의 필드 조회 */
DESC users;
```
{{<figure-img src="./images/mariadb-show-tables.png" alt="mariaDB-show-tables">}}
mariaDB 테이블 목록 보기
{{</figure-img>}}
{{<figure-img src="./images/mariadb-desc-users.png" alt="mariaDB-show-field">}}
mariaDB 테이블 필드 보기
{{</figure-img>}}
이제 아무 유저나 채우고 유저 목록을 조회해 봅시다.
```
INSERT users (id,name,email,password,salt) values ('test_id','test_name','test_email','test_password','test_salt');
```

{{<figure-img src="./images/mariadb-insert.png" alt="mariaDB-insert">}}
test_name 유저 생성
{{</figure-img>}}
중간에 에러난 부분은 무시하면 됩니다. 제가 이미 여러 번 유저를 생성했다 지웠다 해서 no가 28로 설정되어있는데 처음 INSERT를 성공했다면 no는 1로 설정 될겁니다.

## 파이서버에 mariaDB 설치

리눅스는 다음 방식으로 설치합니다. putty로 파이서버에 접속한 다음 
```bash
sudo apt update && sudo apt-get upgrade
sudo apt install mariadb-server
```

설치가 완료되면 아래 명령을 입력합니다.
```bash
# mariaDB 실행하는 코드 맞습니다.
mysql -u root -p
```

패스워드를 입력하라고 나올텐데 아직 root 비밀번호가 설정되어 있지 않아 엔터를 입력하면 접속 됩니다.

root 비밀번호를 설정합시다.
```mysql
USE mysql;
SELECT host,user,password FROM user;
UPDATE user SET password=password('비밀번호');

/* 비밀번호가 바뀐 것을 확인할 수 있다.*/
SELECT host,user,password FROM user;
```
mariaDB(=MySQL)은 사용자 정보를 데이터베이스로 만들어 mysql에 저장하고 관리합니다. mysql 데이터베이스의 user 테이블에 root를 비롯한 사용자 정보가 들어있습니다. 사실 root 말고 사용자 계정을 따로 만들어 사용하는게 바람직하긴 한데 귀찮으니까 root로 사용합시다.

root 유저의 비밀번호가 변경되었으니 앞으로는 `mysql -u root -p`를 입력하고 비밀번호 입력해서 mariaDB에 접속하면 됩니다.

```mysql
/* mariaDB 종료 */
exit

```
## 마치며

이상으로 'mariaDB 설치하기' 를 마치겠습니다. DB를 깔았으니 본격적으로 express 앱에 필요한 모듈 설치 & CRUD API를 만들어봅시다.