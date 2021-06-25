+++
title= "로그인페이지 호스팅하기"
date= 2021-05-24T18:32:01+09:00
categories= ["projects"]
tags= ["프로젝트","게임","똥피하기","로그인폼"]
subcategories = ["holy_shit"]
cover = ""
icon = "projects/project-icon.png"
draft= true
+++

지난 시간에 express-generator를 통해 간단한 웹앱을 구축해봤습니다.

이제 이 웹앱을 살짝 수정해 로그인 화면을 호스팅하고 실제 로그인할 수 있는 기능까지 달아봅시다.

## 로그인 로직 구상
아래 기능들을 구현해봅시다.
- `/` GET 요청을 보낸다.
    - session이 있다면 `/home`으로 redirect
    - session이 없다면 `/login`으로 redirect
- `/login` 페이지에서 로그인 
    - 아이디와 비밀번호를 `/login` POST 요청으로 보낸다.
        - 로그인 성공시 session을 설정하고 `/home`으로 redirect
        - 실패시 아무일도 일어나지 않는다.
- `/logout` GET 요청시 세션을 지우고 `/login`으로 redirect
- `/home` GET 요청시 `home.html` 전송
## session 사용하기
session을 사용해 로그인 되어있는지 여부를 확인합시다.
session을 설정하려면`cookie-parser`와 `express-session` 모듈을 사용합니다.

```bash
npm i cookie-parser
npm i express-session
```

이제 `app.js`에서 session에 대한 설정을 달아줍시다.
```js
// 모듈 import
const cookieParser = require('cookie-parser');
const session = require('express-session')
//...
app.use(express.static(path.join(__dirname, 'public')));
/* 여기에 아래 코드를 추가합니다. */
app.use(cookieParser('1234'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: '1234',
  cookie:{
    httpOnly: true,
    secure: false,
  }
}));
```

`cookie-parser` 모듈은 request에 동봉된 cookie를 추출할때 사용합니다.

`express-session` 모듈은 request에 session을 관리할 때 사용합니다. 

### 쿠키와 세션
쿠키와 세션의 개념을 살짝만 알아봅시다.

**쿠키**는 클라이언트에(즉 브라우저에) 저장하는 작은 key-value 형식의 데이터입니다. 만료 시간(expire time)을 설정해 줄 수 있는데, 만료되면 쿠키는 자동으로 삭제됩니다. 서버측 뿐만 아니라 클라이언트측에서도 쿠키를 열어보고 수정할 수 있습니다.

11번가 등에서 최근에 본 물품들이 페이지등이 쿠키를 사용한 예시입니다. 

**세션**은 서버측에 저장하는 key-value 형식의 데이터입니다. 클라이언트의 정보를 서버에 임시저장할 때 사용합니다. 클라이언트의 구분을 위해 임시쿠키 하나를 클라이언트에 저장합니다. 이 쿠키가 회손되면 서버측에서 세션을 사용할 수 없습니다.

최근에 로그인했던 사이트가 다시 로그인하지 않아도 로그인상태를 유지한다면 세션을 이용했을 가능성이 큽니다.

그럼 다시 코드로 돌아와서 

```js
app.use(cookieParser('1234'));
```
위 코드는 cookieParser 미들웨어를 달아주면서 1234 시크릿코드를 설정하는 명령입니다. 시크릿코드는 위변조된 쿠키를 구별할때 사용하는 암호화키입니다.

```js
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: '1234',
  cookie:{
    httpOnly: true,
    secure: false,
  }
}));
```
위 코드는 웹앱에 session에 관한 설정을 해주는 코드입니다. 위에서 세션이 클라이언트의 구분을 위해 임시쿠키 하나를 클라이언트에 저장한다고 했습니다. 

{{<figure-img src="images/session.png" alt="connect.sid">}}
session설정으로 생긴 쿠키
{{</figure-img>}}

브라우저에서 F12를 눌러 콘솔창을 켠 뒤, Application 메뉴의 Cookies를 보게되면 브라우저에 저장된 쿠키들을 볼 수 있습니다. 위 사진에선 제가 임시로 세션을 하나 생성했기 때문에 `connect.sid`라는 쿠키가 하나 생긴것을 볼 수 있습니다. 이 쿠키를 통해 브라우저를 구분합니다. 이 쿠키는 `session`에서 `secret`옵션으로 준 '1234'를 통해 암호화되며, cookieParser에서 설정한 secret code(위의 '1234')를 통해 복호화&변형 여부를 판단합니다. 만약 connect.sid 쿠키가 변형되었다면 이 쿠키를 읽을 수 없어 세션을 사용할 수 없습니다. 또한 session에서 사용하는 signed cookie의 복호화는 cookieParser에서 담당하기 때문에 cookieParser에 사용한 secret과 session에서 사용한 secret은 일치해야 합니다. 

다른 옵션들은 지금은 중요하지 않아 패스합시다.

## `/` 요청에 대한 라우터 설정
routes/index.js를 개조해 사용합시다.
session이 있다면 `/home`으로 redirect, session이 없다면 `/login`으로 redirect 해야합니다. user라는 session이 있는지 판별합시다.

```js
router.route('/').get(function(req, res){
  console.log('no 새숀')
  if(req.session.user) // session이 있다면 home으로
    res.redirect('/home')
  else // session이 없다면 login 경로로
    res.redirect('/login')
})
```
팀원이 짠 `/` 라우터입니다.
위 코드는 아래 코드와 동일합니다.

```js
router.get('/',function(req, res){
  console.log('no 새숀')
  if(req.session.user) // session이 있다면 home으로
    res.redirect('/home')
  else // session이 없다면 login 경로로
    res.redirect('/login')
})
```

res의 redirect메소드를 통해 다른 경로로 redirect 시켜줍니다.

## `/login` 요청에 대한 라우터 설정
`login` GET 요청이 들어온다면 session이 있는지 판단하고 `/home`으로 이동합니다. session이 없다면 로그인 되지 않았으므로 `login.html`을 화면에 띄워줍니다.

```js
router.route('/login').get(function(req,res){
  if(req.session.user)
    res.redirect('/home');
  else{
    res.sendFile(path.join(__dirname,'../public/login','login.html'));
  }
})
```

`login` POST 요청이 들어온다면 post 요청으로 함께 보내진 id와 pw를 확인해 일치하는 아이디가 있는지 판단하고 일치하는 아이디가 있다면 user session을 생성해주고`/home`으로, 없다면 "fail" 메세지를 전송합니다.

POST 요청과 함께 보낸 데이터는 아래 미들웨어를 설정해줘야 req.body를 통해 읽어올 수 있습니다. 
```js
app.use(express.json());
```

`app.js`에 이미 추가되어있는 미들웨어이므로 안심하고 req.body를 통해 데이터를 읽습니다.

참, 유저 정보를 저장해야하므로 data/login.json 파일을 만들어줍시다.
```
┖ myapp
    ┝ bin
        ┖ www
    ┝ data
        ┖ login.json # 추가
    ┝ public
        ┝ home
            ...home에 필요한 css,js,image들 수록 
            ┖index.html
        ┝ login
            ...login에 필요한 css,js,image들 수록 
            ┖index.html
        ┖ signup
            ...signup에 필요한 css,js,image들 수록 
            ┖index.html
    ┝ routes
        ┝ index.js
        ┖ users.js
    ┝ views
        ┝ error.ejs
        ┖ index.ejs
    ┝app.js
    ┖package.json
```

```json
[{"name":"kimhyunho","id":"ho","password":"1234","score":999999999},{"name":"yanggijo","id":"jo","password":"1234","score":12867},{"name":"yoodongwon","id":"won","password":"1234","score":100}]
```
위는 login.json 예시입니다.

```js
router.post('/login',(req, res)=>{
  const id = req.body.id || null;
  const pw = req.body.pw || null;
  fs.readFile(path.join(__dirname,'../data/login.json'), (err, data) =>{
    if(err)
        console.log(err)
    var string = data.toString();
    const person = JSON.parse(string);
    let i, f = true;

    for(i=0; person[i] ; i++)
        if(person[i].id === id && person[i].password === pw){
          req.session.user = {
            name:person[i].name,
            id:id,
            score:person[i].score
            
          }
          f = false;
          break;
        }
    if(f)
        res.send("fail")
    else {
      req.session.save((e)=>{
        res.redirect('/home')
      }) 
    }
  })
})
```
위와 같이 코드를 짰습니다. `login.json` 파일을 읽고 아이디,비밀번호가 일치한다면 해당 유저의 정보를 읽어옵니다.

```js
req.session.user = {
  name:person[i].name,
  id:id,
  score:person[i].score
}
```
user 세션을 생성하는 부분입니다. 위와 같이 req의 session에 user 객체를 추가해줍니다.

```js
req.session.save((e)=>{
  res.redirect('/home')
}) 
```
세션을 저장하고 `/home`으로 redirect하는 코드입니다.

## logout GET 요청 라우터

```js
router.route('/logout').get(function(req,res){
  req.session.destroy(function(){
    req.session;
  })
  res.redirect('/login');
})
```
세션을 삭제하고 login페이지로 돌아갑니다.

## home GET 요청 라우터

```js
router.route('/home').get((req, res) =>{
  res.sendFile(path.join(__dirname,'../public/home','index.html'));
})
```
home/index.html을 전송하는 라우터입니다.

## 마치며

이렇게 똥피하기 게임을 호스팅하기 위한 express 코드는 완성되었습니다. 다음엔 실제 똥피하기 웹게임을 만들어봅시다.