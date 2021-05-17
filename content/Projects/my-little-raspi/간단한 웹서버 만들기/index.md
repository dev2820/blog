+++
title= "간단한 웹앱 만들기"
date= 2021-05-03T14:06:58+09:00
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

이제 데스크탑에서 웹앱을 만들고 파이서버에 탑재시켜봅시다.
## 프로젝트 폴더 & git
먼저 프로젝트용 폴더를 만들고 git repository를 생성합시다.

```
┖ my-little-raspi
    ┝ frontend
    ┖ README.md
```
{{<comment>}}파일 구조{{</comment>}}

프로젝트 폴더는 위와 같이 구성했습니다. frontend 에는 Vue.js로 짠 웹페이지들을 담으려고 합니다. backend 폴더도 있는데 그건 좀 있다 만듧시다.

먼저 위와 같은 폴더를 만들고 Git에 repository를 등록합시다.

{{<a_blank href="https://dev2820.github.io/study/git/git-%EC%A0%95%EB%A6%AC-%EB%A1%9C%EC%BB%AC-%EC%A0%80%EC%9E%A5%EC%86%8C-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0/">}}[Git정리] 로컬 저장소 생성하기{{</a_blank>}}
<- git 사용법 모르시는 분들은 참고해주세요

```
https://github.com/dev2820/my-little-raspi.git
```
repository를 생성하고 first commit을 올렸습니다.

## NVME 스택
이제 작업환경을 만들어줍시다. 웹앱에 사용할 스택은 다음과 같습니다.

- N:Node.js
- V:Vue.js
- M:MariaDB
- E:Express

### node & express 설치
이 중 node와 express를 설치해봅시다.
{{<a_blank href="https://nodejs.org/ko/download/">}}nodejs 다운로드{{</a_blank>}}  
</br>

먼저 nodejs를 받아줍시다. 그리고 npm으로 express-generator를 받아줍시다.(nodejs를 받으면 npm도 자동으로 깔립니다.) 

```bash
npm i express-generator -g
```

nodejs는 javascript 코드 실행기이고 express는 nodejs의 서버 프레임워크입니다. express-generator는 express 웹앱 골격을 만들어줍니다. 골격을 만들어 봅시다.

```bash
express --view=ejs backend
```

```
┖ my-little-raspi
    ┝ backend
        ┝ bin
            ┖ www
        ┝ public
            ┝ images
            ┝ javascripts
            ┖ stylesheets
        ┝ routes
            ┝ index.js
            ┖ users.js
        ┝ views
            ┝ error.ejs
            ┖ index.ejs
        ┝app.js
        ┖package.json
    ┝ frontend
    ┖ README.md
```
{{<comment>}}변경된 파일 구조{{</comment>}}
저는 ejs를 템플릿 엔진으로 사용했습니다. ejs와 pug가 있는데 취향차이이고 차피 ejs 안쓸거라 몰라도 됩니다.

express-generator로 만든 backend 앱은 위와 같은 구조가 됩니다.(bin, public, routes, views, app.js, package.json 생성)

express-generator는 package.json을 자동으로 만들어줍니다. package.json은 node앱에 연관된 모든 모듈들을 관리하는 파일입니다. 앱 이름, 버전, 실행코드, dependencies(사용하는 모듈과 모듈의 버전) 등등이 기록됩니다. 그냥 그정도만 알고 넘어갑시다.

package.json은 자동으로 생성해주지만 package.json에 기록된 모듈들이 자동으로 설치되진 않습니다.

필요한 모듈들을 설치합시다.
```bash
npm install

# npm install = npm i
```
npm install은 package.json을 참고해 필요한 모듈들을 node_modules 폴더에 설치합니다.

### express 실행
이제 앱을 실행해봅시다.
```json
"scripts": {
    "start": "node ./bin/www"
  },
```
{{<comment>}}package.json{{</comment>}}
package.json 파일을 열어보면 "scripts" 부분에 "start"가 뭔지 정의되어 있습니다. `script`에 정의된 명령어들은 쉘에서 `npm run [명령어]`로 실행할 수 있습니다. bash 쉘을 켜고 아래 명령을 수행해봅시다.(bash쉘도 node깔때 같이 깔립니다.)

```bash
# npm run [명령어]
npm run start

# node ./bin/www가 실행된다.

# npm run start는 run을 생략해도 된다.
npm start
```
`node ./bin/www` 가 실행되며 서버가 생성됩니다. 기본 포트는 3000번 이므로 
localhost:3000 에 접속하면 페이지가 하나 보입니다.

> localhost:3000

{{<figure-img src="images/express.png" alt="express">}}
express 실행 후 localhost:3000에 접속
{{</figure-img>}}

흰 화면에 express 글자만 덩그러니 나옵니다.

`node ./bin/www` 명령은 `bin`폴더의 `www`파일을 실행합니다. `www`파일을 켜보면 다음과 같습니다.

```js
var app = require('../app');
var debug = require('debug')('backend:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// ... 이하 생략
```

대충 전체적으로 app.js로 http 서버를 만드는 내용입니다. 그럼 app.js를 봅시다.

```js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

상단에 사용할 모듈들을 정의하고(`require`) 아래에 라우터,미들웨어를 설정(`app.use`)해주고 마지막에 app을 모듈로 exports하는 코드로 구성되어 있습니다.
참고로 require 함수는 필요한 모듈을 import하는 함수입니다. default 경로는 node_modules이고 경로를 지정해주면 해당 경로 js파일의 module.exports를 읽어옵니다. 
```js
var app = express();
```
express를 생성하는 코드입니다. 이제 `app`을 통해 이것 저것 라우터,미들웨어를 달아주면 됩니다. express는 라우터와 미들웨어를 거쳐 순차적으로 실행됩니다.

```js
/* ...생략... */
//미들웨어 모듈 가져오기
var cookieParser = require('cookie-parser');
/* ...생략... */
//미들웨어 등록
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/* ...생략... */
```
위의 코드들은 **미들웨어**로, express에 들어온 요청은 이 미들웨어들을 순차적으로 거치며 진행됩니다.

위의 미들웨어는 각각 요청에 들어온 쿠키를 쉽게 분석해주는 미들웨어와 static 폴더를 public 폴더로 설정하는 미들웨어입니다.

```js
/* ...생략... */
//라우터 모듈 가져오기
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
/* ...생략... */
//라우터 등록
app.use('/', indexRouter);
app.use('/users', usersRouter);
```
위와 같은 코드는 **라우터**입니다. 요청의 분기문이라 생각하면 되는데, 위의 코드는 `/`경로 요청이 들어오면 indexRouter로, `/users`경로 요청이 들어오면 indexRouter는 건너 뛰고 usersRouter로 요청을 보냅니다.

indexRouter를 한번 살펴봅시다.
```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```
`express.Router`로 router 객체를 만들어 exports하는 일련의 과정입니다.

`/`경로로 요청이 들어오면 `indexRouter`로 요청이 들어온다고 했죠? 그 경로를 `indexRouter` 안에서 다시 쪼갭니다.

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET test page. */
router.get('/test', function(req, res, next) {
  res.render('index', { title: 'Test' });
});

module.exports = router;
```
indexRouter를 위와 같이 수정해봅시다. 그리고 서버를 다시 실행하고 `localhost:3000/test`에 접속해봅시다.

```bash
#1. 먼저 Ctrl + c로 실행중인 서버를 종료합니다.
#2. 그 다음 npm start를 실행합시다.
npm start
#3. 서버가 실행되면 localhost:3000/test에 접속합니다.
```
{{<figure-img src="images/express-test.png" alt="express test">}}
express 실행 후 localhost:3000/test에 접속
{{</figure-img>}}
`localhost:3000`에 접속할 때와 다른 화면을 볼 수 있습니다.

### 정리
그럼 `npm start`를 실행하면 어떤 경로로 앱이 실행되는지 정리해봅시다.

1. `npm start` 명령은 `node ./bin/www`를 실행합니다.
2. `node ./bin/www` 명령은 `/bin/www`파일을 node로 실행합니다. `/bin/www`파일엔 `app.js`를 http 서버로 생성하는 코드가 담겨있습니다.
3. `app.js`에는 여러 가지 미들웨어를 등록하고 indexRouter,usersRouter를 등록하는 코드가 들어있습니다. 이제 express 앱으로 들어오는 요청은 등록된 미들웨어들과 라우터를 거쳐 응답합니다.

`npm start`로 서버가 생성되었고 이제 `localhost:3000`에 접속하면 default로 만들어진 화면을 볼 수 있습니다.

1. express 앱은 localhost:3000번으로 들어오는 http 요청을 대기합니다.
2. 유저가 `localhost:3000/test`에 접속합니다.
3. 미들웨어를 거쳐 indexRouter로 요청이 들어옵니다.
4. indexRouter 내에서 `/test`와 요청이 일치하므로 `res.render('index', { title: 'Test'})`가 실행됩니다. 즉 요청에 대한 응답을 보냅니다.
5. views 폴더의 `index.ejs`를 랜더링해서 응답(response)을 보내줍니다.

그럼 express가 돌아가는 구조는 이제 알았습니다. 다음으론 로그인에 사용할 라우터를 만들어줘야 합니다. `routes/users.js`를 개조해서 사용합시다.

```js
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
```

`routes/users.js` 파일 입니다. `/users/`로 시작하는 요청은 이 라우터로 옵니다. 여기에 user에 관련된 요청들(login,signup,modifyuserinfo 등)을 모을겁니다. 하지만 먼저 유저 정보를 저장할 DB를 깔아봅시다. 다음 시간에요.

## 마치며
express-generator가 생성한 express 앱을 살펴봤습니다. 

다음 시간에는 유저정보를 저장할 mariaDB를 깔고 table을 생성해봅시다.