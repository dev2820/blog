+++
title= "nodejs의 세션"
date= 2021-06-29T00:06:58+09:00
categories= ["study"]
subcategories = ["web"]
tags= ["study","컴퓨터 기술","공부정리","web"]
cover= ""
icon = "study/computer_science_icon.png"
draft= false
+++

세션에 대해 조사한 내용 + 알던 내용 정리 + nodejs,express 예제 글입니다. https://www.npmjs.com/package/express-session 를 위주로 작성하였습니다.

## 세션

세션(session)은 서버에 저장되는 key-value 형식의 데이터입니다.

세션과 쿠키의 차이를 헷갈리시는 분들이 있는데, 간단하게 세션은 서버에 저장되고 쿠키는 브라우저에 저장된다고 생각하면 됩니다.

### Http 세션의 동작
세션은 클라이언트에서 생성할 수 없고 서버에서만 생성할 수 있습니다.
서버 측에서 세션을 생성할 땐, 클라이언트에게 SID(session id)를 발급합니다. 클라이언트를 구분하는 고유번호라 생각하면 되는데, 세션이 발급되면 connect.sid 쿠키가 생성된 것을 확인할 수 있습니다. 앞으로 이 쿠키를 SID 쿠키라고 하겠습니다. 서버 측엔 해당 클라이언트가 사용할 세션을 저장합니다. 클라이언트에 SID 쿠키가 저장되어 있으니, 클라이언트로부터 request가 오면 request의 쿠키로부터 SID를 확인할 수 있음으로 해당 클라이언트의 세션을 매핑해 사용할 수 있습니다.

## 세션의 용도

보통 사용자가 로그인하면 로그인 상태를 저장해 세션이 만료되기 전까지 서비스를 이용할 수 있게 하는 데 사용합니다. 사이트에 로그인해놓고 한참 뒤에 다시 이용하려고 하면 '세션이 만료되었습니다.'라고 뜨면서 다시 로그인 해야 하는 경험이 있으실 겁니다.

## Express에서 session 사용하기

express에서 세션을 사용하는 방법을 알아봅시다.

### 세션 모듈 설치

nodejs,express에선 세션을 내장 모듈로 지원하지 않기 때문에 express-session을 설치해줘야 합니다.

```bash
npm i express-session
```

### 세션 미들웨어 추가

세션을 이용하기 위해 미들웨어를 등록해야 합니다. 뇌피셜이긴 하지만, 세션 미들웨어에서 request의 쿠키를 확인해 SID가 있다면 request에 세션 객체를 추가하는 과정이 일어나지 싶습니다. 모듈을 뜯어보진 않아서 정확하진 않습니다.

```js
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
```
session에 사용할 수 있는 옵션들은 아래에서 정리해 설명하겠습니다.

### 세션 추가하기
```js
req.session.test = "test string";
req.session.save(()=>{
    res.send('세션 생성 완료');
})
```
세션은 req.session으로 접속할 수 있습니다. 단순하게 `req.session['key'] = 'value'` 형식으로 저장하면 됩니다. `req.session.save`를 통해 세션을 명시적으로 저장할 수도 있지만, session data가 변경되면 response가 일어날 때 자동으로 save가 호출되기 때문에 사용하지 않아도 됩니다.

### 세션 가져오기
```js
if(req.session.test){
    console.log(req.session.test);
    res.send('세션 o');
}
```
저장된 세션을 읽어올 때는 단순히 req.session에서 요소를 읽어오면 됩니다.

### 세션 삭제
```js
if(req.session){
    req.session.destroy(()=>{
        res.redirect('/');
    });
}
```
`req.session.destroy` 함수를 통해 세션을 제거합니다. 

### 미들웨어 옵션

미들웨어를 등록할 때 줄 수 있는 옵션은 아래와 같습니다.
- cookie  
SID 쿠키에 대한 설정입니다. cookie 옵션은 객체 형식으로 줄 수 있으며 default는 `{ path: '/', httpOnly: true, secure: false, maxAge: null }`입니다. 쿠키에 설정하는 옵션과 같습니다. 여기서는 default로 설정된 쿠키 옵션만 알아보겠습니다. 

    - `path`: String, 쿠키를 전송할 경로를 지정합니다. 세션의 경우 session을 사용하게 될 path를 정해주는 역할을 합니다. 정해진 path가 아닌 경로에 접근하면 session이 없는 것처럼 작동합니다. 
    - `httpOnly`: Boolean, 클라이언트 측에서 쿠키에 접근하는 것을 막습니다. 즉, document.cookie를 통한 쿠키 접근을 막습니다.
    - `secure`: Boolean, https 통신에서만 쿠키 전송을 허용합니다. express-session 개발자는 `secure: true`를 사용할 것을 권장합니다. 
    - `maxAge`: 쿠키가 유지될 기간입니다. 초 단위로 설정할 수 있습니다. 세션을 통한 로그인 유지를 구현하려면 maxAge를 설정해줘야겠죠. 

쿠키 옵션에 대해 더 알고 싶다면 제 블로그의 {{<a_blank href="/study/web/nodejs의-쿠키/">}}쿠키 정리 글{{</a_blank>}}을 보셔도 좋고, {{<a_blank href="https://www.npmjs.com/package/express-session">}}express-session npm 공식 페이지{{</a_blank>}}를 직접 읽어보셔도 좋습니다.

- genid
SID로 사용할 로직을 정의하는 옵션입니다. `genid: function(req){}`형식으로 사용하면 되고, SID로 사용할 String을 return 하면 됩니다. default로 uid-safe 라이브러리를 통한 SID 생성 함수를 사용합니다.

- name
SID 쿠키의 이름을 설정합니다. default는 `connect.sid`입니다.

- proxy
리버스 프록시를 사용하는 경우 설정하는 옵션입니다. `true`로 설정하면 `X-Forwarded-Proto` 헤더가 사용됩니다. default는 `undefined`로, express에 `trust proxy`로 등록된 주소에 대해서만 세션이 동작합니다.

- resave
express-session은 기본적으로 세션에 변경이 있을 때만 세션을 저장합니다. `resave:true`로 설정한다면 변경사항이 없어도 session을 다시 저장합니다. default는 `true`입니다. `false`로 설정하면 불필요한 session 저장을 막아주기 때문에 보통 `false`로 설정합니다.  

- saveUninitialized
세션이 생성되었지만 어떠한 데이터도 추가되거나 변경되지 않은 상태를 **uninitialized** 라고 합니다. `saveUninitialized:true`로 설정한다면 uninitialized session도 저장합니다. `false`로 설정하면 uninitialized session은 저장하지 않으므로 리소스 활용 측면에서 조금 더 유리합니다.

default값은 `true`이지만 개발자가 이후에 default를 바꿀 수도 있다고 합니다.

- rolling
세션이 만료되기 전, 새로 고침 또는 페이지 이동이 일어나면 세션 만료를 갱신하는 옵션입니다. default는 `rolling:false`입니다. 

한 가지 주의할 점은, `saveUninitialized` 옵션이 `false`인 경우 uninitialized 세션에 대해선 rolling이 작동하지 않습니다. 따라서 단순히 로그인 여부 확인을 위해 session을 사용한다면(즉, uninitialized 세션을 사용하는 경우) saveUninitialized 옵션을 `true`로 설정해 줘야합니다. 

- secret
**필수적으로 설정해줘야 하는 옵션**입니다. SID를 생성할 때 사용되는 비밀키로 String 또는 Array를 사용할 수 있습니다. Array를 사용하는 경우, 첫 번째 요소를 비밀키로 사용합니다.

- store
세션을 어디에 저장할지 결정하는 옵션입니다. default는 MemoryStore로 메모리에 저장됩니다. 따라서 프로세스가 종료되면 세션이 없어집니다. 프로세스가 예상치 못하게 종료되어도 세션을 유지하기 위해 세션을 저장하는 방법을 알아야겠죠? express-session은 store 옵션을 통해 session을 저장할 곳을 결정할 수 있습니다.

{{<a_blank href="https://www.npmjs.com/package/express-session#compatible-session-stores">}}compatible-session-stores{{</a_blank>}}

express-session에 연동되어 session을 저장할 수 있는 모듈들은 위 링크를 참고하시길 바랍니다. 

보통은 file, redis, mongoDB 등을 사용하는데, 여기까지 다루면 글이 길어지니 다음에 다뤄보겠습니다.

- unset
삭제된 session을 어떻게 관리할지 결정하는 옵션입니다. `destroy`와 `keep`을 사용할 수 있는데, `destroy`는 response가 끝날 때 store에서 삭제하는 옵션, `keep`은 store에선 삭제하지 않지만 더 이상 변경할 수 없게 하는 옵션입니다. default는 `keep`입니다.

## session 메소드들
session에 내장된 메소드들을 알아봅시다.

### regenerate(callback)
세션을 재생성하는 메소드로, SID가 새로 부과됩니다. callback으로 재생성 후 수행할 함수를 전달해주면 됩니다.
```js
req.session.regenerate(function(err){
    // will have a new session here
})
```

### destroy(callback)
세션을 명시적으로 삭제하는 메소드입니다.
```js
req.session.destroy(function(err){
    // cannot access session here
})
```
### reload(callback)
store에 저장된 session date를 다시 불러오는 메소드입니다.
```js
req.session.reload(function(err) {
  // session updated
})
```

### save(callback)
세션을 store에 명시적으로 저장하는 메소드입니다. 앞서 언급했듯, response의 마지막에 session을 자동으로 저장하기 때문에 보통은 사용하지 않아도 됩니다.

```js
req.session.save(function(err) {
  // session saved
})
```

### touch()
명시적으로 세션의 maxAge를 갱신합니다. (rolling옵션의 역할과 비슷)
```js
req.session.touch()
```
## session에 포함된 변수들

### session.id, sessionID

sessionID는 말 그대로 SID입니다. 변경 불가능한 값으로 session을 load 하거나 생성할 때 부과되는 값입니다. 세션이 갱신되면 이 값도 변경됩니다. 

req.session.id는 req.sessionID의 별칭(alias)입니다.

### session.cookie
SID 쿠키의 설정값이 들어있습니다. 이 값은 수정할 수 있어서 사용자마다 다르게 쿠키 설정을 해줄 수 있습니다.

## 간단한 세션 예제
간단하게 session을 달아 express를 실행시켜보겠습니다.

```js
const express = require('express');
const session = require('express-session');
const port = 3000;

const app = express();
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))
app.get('/',(req, res) => {
    res.send('hello world');
})
app.get('/makeSession', (req, res) => {
    if(req.session.test){
        res.send('세션이 이미 존재');
    }
    else {  
        req.session.test = "test string";
        res.send('세션 생성');
    }
})

app.get('/confirmSession', (req, res) => {
    if(req.session.test){
        console.log(req.session);
        res.send('세션 o');
    }
    else {
        console.log('no session');
        res.send('세션 x');
    }
})

app.get('/deleteSession', (req, res) => {
    if(req.session){
        req.session.destroy(()=>{
            res.redirect('/');
        });
    }
    else {
        res.send('제거할 세션이 없습니다.');
    }
})

app.listen(port, () => {
    console.log(`session 테스트용 앱 http://localhost:${port}`)
})
```
{{<figure-img src="images/세션예제1.png" alt="nodejs session">}}
예제 앱 실행
{{</figure-img>}}
{{<figure-img src="images/세션예제2.png" alt="nodejs session">}}
`localhost:3000`에 접속한 결과
{{</figure-img>}}
아직 session을 생성하지 않았기 때문에 SID가 발급되지 않은 것을 확인할 수 있습니다.

{{<figure-img src="images/세션예제3.png" alt="nodejs session">}}
`/makeSession`에 접속한 결과
{{</figure-img>}}
`/makeSession`에 접속해 세션을 생성했습니다.

개발자모드를 열어 쿠키를 확인해보면 `connect.sid`라는 쿠키가 생성된 것을 확인할 수 있습니다.

이제 `/confirmSession`에 접속해봅시다.
{{<figure-img src="images/세션예제4.png" alt="nodejs session">}}
`/confirmSession`에 접속한 결과
{{</figure-img>}}
{{<figure-img src="images/세션예제5.png" alt="nodejs session">}}
test가 생성된 것을 확인할 수 있다.
{{</figure-img>}}
이번엔 `/deleteSession`에 접속해 세션을 삭제해 봅시다.
{{<figure-img src="images/세션예제6.png" alt="nodejs session">}}
`/deleteSession`에 접속한 결과
{{</figure-img>}}
세션 삭제시 `/`로 redirect하게 만들었기 때문에 `/`로 돌아온 것을 확인할 수 있습니다. 개발자모드를 열어보면 SID는 삭제되지 않은 것을 확인할 수 있습니다. 세션을 삭제해도 SID 쿠키는 삭제되지 않습니다. 

다시 `/confirmSession`에 접속해봅시다.
{{<figure-img src="images/세션예제7.png" alt="nodejs session">}}
`/confirmSession`에 재접속
{{</figure-img>}}
{{<figure-img src="images/세션예제8.png" alt="nodejs session">}}
no session이 출력된 것을 확인할 수 있다.
{{</figure-img>}} 

## 마치며
세션을 redis나 file형식으로 저장하는 방법은 다음에 호스팅하겠습니다. 언제라고는 장담 못 하겠네요. 🤔

## 참고한 링크
https://www.npmjs.com/package/express-session  