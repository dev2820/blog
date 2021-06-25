+++
title= "간단한 웹앱구축"
date= 2021-05-16T18:11:24+09:00
categories= ["projects"]
tags= ["프로젝트","게임","똥피하기","로그인폼"]
subcategories = ["holy_shit"]
cover = ""
icon = "projects/project-icon.png"
draft= true
+++

만들어진 html,css,js 파일들을 호스팅할 웹앱을 만들어봅시다.

호스팅 환경은 다음과 같습니다.

## 호스팅 환경

- 라즈베리파이4B 
- ubuntu server 20.04 LTS

## 웹앱 
Nodejs & Express를 사용합니다. nodejs는 js코드 실행기, express는 nodejs 프레임워크입니다. 

```bash
npm i express-generator -g
```
`-g` 옵션으로 express-generator를 설치합니다. 
그리고 express 앱을 만들어 봅시다. express-generator는 express앱 골격을 만들어주는 모듈입니다.

```bash
express --view=ejs myapp
```

express에서 사용할 엔진을 선택합니다. 저는 `ejs`가 취향이라 `ejs`를 선택했지만 `pug`를 사용해도 됩니다. 하지만 ejs파일은 사용하지 않을 예정입니다.

myapp 웹앱이 만들어졌습니다.

```
┖ myapp
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
```

myapp은 위와 같은 구성을 가집니다.

### 폴더 구성을 살펴보기 전에
express-generator가 생성한 폴더 구조를 살펴보기 전에 간단하게 node의 http 서버에 대해 짚고 넘어갑시다.

```js
const http = require('http');

const server = http.createServer((request, response) => {
  // request에 대한 response
});

server.listen(3000);
```
{{<comment>}}node의 서버 생성{{</comment>}}
node.js로 생성하는 http 서버는 대충 이런 모양입니다. `createServer`에 달아준 콜백함수에 request 파라미터로 http 요청(`http:// ~~`)이 들어오고 request 에 대한 응답을 response 객체를 통해 보내는 형식입니다. express는 http.createServer에 파라미터로 전달할 콜백 함수에 해당합니다.

nodejs에 대해 더 알아보고 싶다면 다음 링크를 참고해주세요
{{<a_blank href="https://nodejs.org/ko/docs/guides/anatomy-of-an-http-transaction/">}}
nodejs 공식 홈페이지: HTTP 트렌젝션 해부
{{</a_blank>}}

자 그럼 폴더 구조를 살펴봅시다.

### bin/www
`www` 파일을 보기전에 `package.json` 파일을 열어보면 다음과 같습니다.
```json
{
  "name": "myapp",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"  // *
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "express-session": "^1.17.1",
    "fs": "*",
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1"
  }
}
```
scripts 객체 내부에 start String이 정의되어있는데, `node ./bin/www`라고 되어있습니다. package.json에 이렇게 npm 명령어를 정의해두면 npm 명령을 통해 간편하게 서버를 실행할 수 있습니다.
shell에 `npm start`를 입력하면 이는 `node ./bin/www`를 실행한 것과 같은 효과를 냅니다.

`node ./bin/www` 는 `bin/www` 파일을 node.js로 실행하는 명령입니다. 

```js
//...생략...
var app = require('../app');
var debug = require('debug')('myapp:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000'); //port는 환경변수 PORT, PORT가 없으면 default 3000으로 설정된다.
app.set('port', port); //port 번호 설정

/**
 * Create HTTP server.
 */

var server = http.createServer(app); // 서버 생성. 

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port); // server는 이제 3000번 포트로 오는 http request에 대한 response을 하게 된다.
server.on('error', onError);
server.on('listening', onListening);
//...생략...
```
{{<comment>}}bin/www 파일 내용 일부{{</comment>}}

대충 app.js 모듈을 http로 실행하는 내용이 담겨있습니다. 즉 `node ./bin/www` 명령은 http 서버를 생성하고 http request에 대한 응답을 app.js 모듈에게 맡깁니다.

결국 `npm start` 명령은 서버를 실행시키는 명령입니다. 물론 package.json의 scripts를 수정해 다른 명령으로 서버를 실행시킬 수도 있습니다.

```bash
# 서버 실행
npm start
```

### public
보통 호스팅할 파일들을 담는 폴더로 사용합니다. `app.js`를 먼저 살펴봅시다.

```js
//...
var app = express();
//...
app.use(express.static(path.join(__dirname, 'public')));
//...
```

{{<comment>}}app.js{{</comment>}}
코드 중간에 `express.static`을 app에 등록하는 코드가 있습니다. 이렇게 express에서는 express에 **미들웨어**를 등록할 수 있습니다. 미들웨어는 요청 또는 express를 설정/가공하는 중간 단계 입니다.

{{<figure-img src="images/express_middleware.png" alt="express workflow">}}
출처: https://medium.com/@viral_shah/express-middlewares-demystified-f0c2c37ea6a1
{{</figure-img>}}

위 그림에서 처럼 express로 들어온 요청은 미들웨어와 라우터를 거치며 순서대로 실행됩니다. 미들웨어는 요청을 가공하거나 express에 대한 설정을 추가해 다음 미들웨어/라우터로 전달합니다.
라우터는 아래에서 설명하겠습니다.

미들웨어 2개만 살펴봅시다.
```js
//...
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//...
```
app.js를 보면 위와 같은 코드가 있는데 각각 다음과 같습니다.
```js
app.use(express.json()); // json 형식의 request body를 읽을 수 있도록 설정하는 미들웨어
```
```js
app.use(express.urlencoded({ extended: false })); // url의 쿼리문 parsing에 queryString 모듈을 사용하도록 설정하는 미들웨어
```
대충 request를 변형하거나 express에 뭔가 설정해주는 내용입니다.
그럼 아래 미들웨어 무슨 기능을 할까요.
```js
app.use(express.static(path.join(__dirname, 'public')));
```
바로 `public`폴더를 **정적 파일이 담긴 폴더**로 설정해줍니다.

`index.html`에 `images/welcome.png`,`style.css`,`models.js`가 사용된다고 합시다. `npm start`로 서버를 생성했겠죠. 그리고 서버는  `localhost:3000/` 요청을 받으면 `index.html`파일을 호스팅한다고 합시다.

서버를 실행하고 `http://localhost:3000/` 주소에 접속하게되면 브라우저는 `localhost:3000/` http 요청을 서버로 보냅니다. 서버는 `index.html` 파일 내용을 브라우저로 전송하고
브라우저는 받은 `index.html`을 화면에 렌더링합니다. 렌더링된 `index.html`은 `images/welcome.png`,`style.css`,`models.js` 파일이 필요하므로 서버에 다시 이 파일들을 전송해 달라고 요청합니다.

- localhost:3000/images/welcome.png
- localhost:3000/style.css
- localhost:3000/models.js

위의 요청이 다시 발생하게 되죠.

만약 서버에 저 요청들에 대한 응답을 모두 달아놨다면 문제가 없겠지만, 우리는 저 요청들에 하나하나 응답을 달 수 없습니다. index.html이 바뀌면 또 서버를 대거 수정해야 하니까요. 
너무나 비효율적인 방법입니다.

그래서 우리는 서버에 정적 폴더를 선언하고 필요한 정적 파일들을 이 폴더에서 꺼내가도록 설정합니다. 위의 express.static 미들웨어가 그런 역할을 합니다. public으로부터 정적 파일들을 꺼내가라고 
설정해주는거죠. 이제 `localhost:3000/images/welcome.png`, `localhost:3000/style.css` 같은 정적 파일을 요청하게 되면 `public/images/welcome.png`, `public/style.css` 파일로 응답하게 됩니다. 

### routes
`routes`폴더는 라우터가 담기는 폴더입니다. 라우터는 요청의 분기문의 역할을 한다고 생각하면 됩니다. 예를 들어 요청이 `/users`로 시작하면 특정 소스를 실행하고 `/index`로 시작하면 다른 소스를 시행하는 식으로 말입니다.

```js
//...
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//...
app.use('/', indexRouter);
app.use('/users', usersRouter);
//...
```
app.js에 포함된 라우터 코드입니다. 모듈을 가져와 라우터로 등록하고 있습니다. 요청이 `/`로 시작하면 `indexRouter`가, `/users`로 시작하면 `usersRouter`가 실행되는 방식입니다.
`./routes/index.js`를 한번 봅시다. 

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```
{{<comment>}}routes/index.js{{</comment>}}

`express.Router()`로 라우터 객체를 생성하고, 요청에 대한 응답을 달아주고 있습니다. 위 코드는 `/`경로의 GET 요청에 대한 응답을 달아주고 있습니다. `localhost:3000/`에 접속하면 위의 `router.get ~` 부분이 실행되는 겁니다. 콜백함수의 파라미터는 req,res,next가 있는데, req엔 request 정보가 담겨있고, res는 response 객체입니다. res를 통해 요청에 대한 응답을 보내줄 수 있습니다. next까지 설명하면 설명할게 너무 많아지므로 패스하겠습니다. 일단은 미들웨어가 다음 미들웨어/라우터로 요청을 넘겨줄 때 사용하는 메소드라고 생각하면 됩니다.

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* 새로 추가한 코드 */
router.get('/users', function(req, res, next) {
  res.render('index', { title: 'Users' });
});

module.exports = router;
```

만약 위와 같이 `./routes/index.js`를 수정한다고 합시다. 그리고 `localhost:3000/users` 요청을 보냈다고 합시다. indexRouter를 usersRouter보다 먼저 달아놨고 `/users`요청은 `/`로 시작하는 요청에 부합하기 때문에 요청은 indexRouter로 들어옵니다. 그리고 새로 추가한 코드가 실행되겠죠. `res.render('index, { title: 'Users'});` 가 실행됩니다. 이 코드는 response를 보내는 명령 중 하나입니다.그럼 usersRouter는 어떻게 될까요. 실행되지 않습니다. 이미 요청에 대한 응답이 끝났기 때문에 그 다음 라우터/미들웨어는 실행되지 않습니다.

### views
`./routes/index.js`를 보면 `res.render` 코드가 보일겁니다. 이 render 메소드는 템플릿파일을 렌더링해 응답하는 메소드입니다.

```js
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```
app.js를 보면 위와 같은 코드가 있습니다. views 폴더를 템플릿파일이 담긴 폴더로 지정하고 템플릿 엔진을 ejs로 설정하는 부분입니다. 초반에 express-generator를 실행할 때 `--view=ejs`로 템플릿 언어를 ejs로 설정했기 때문에 생긴 코드입니다.
```bash
express --view=ejs myapp
```
{{<comment>}}스크롤해서 올려보지 말고 이거 보라구{{</comment>}}

템플릿 언어는 마크업언어에 특정 언어를 덧붙여 프로그래밍이 가능하도록 만든 언어입니다. 마크업기능과 프로그래밍기능을 모두 가지게되죠. 대표적으로 JSP가 있습니다.(Html + Java)
ejs는 Html + JavaScript 입니다. views/index.html 파일을 살펴봅시다.
```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
    <form action="/signup" method="post"></form>
    <p>
      id : <input type="text" placeholder="Please input your ID." name="ID">
    </p>
    <p>
      password : <input type="password" placeholder="Please input your password." name="password">
    </p>
    <p>

      <input type="submit" id="submit_button"></input>
    </p>
  </body>
</html>
```
위의 `<%=>` 같은 부분이 자바스크립트가 사용되는 코드입니다. res.render 메소드가 이 파일에 js를 적용해 완성된 html을 만들고 응답한다고 생각하면 됩니다.
근데 템플릿 파일은 이번에 사용하지 않을거라서 여기까지만 알고 넘어갑시다.

## 마치며 

원래는 로그인 페이지를 호스팅하는 코드까지 작성해보는게 목표이었는데 글이 길어져서 한번 끊고 가야겠네요.  
다음 글은 login.html과 signup.html을 호스팅하도록 코드를 수정하고 로그인기능을 넣어보는 내용이 될 것 같습니다.