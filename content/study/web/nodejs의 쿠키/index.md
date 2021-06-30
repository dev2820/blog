+++
title= "nodejs의 쿠키"
date= 2021-05-24T20:52:16+09:00
categories= ["study"]
subcategories = ["web"]
tags= ["study","컴퓨터 기술","공부정리","web","쿠키","cookie","nodejs","express"]
cover= ""
icon = "study/computer_science_icon.png"
draft= false
+++

쿠키에 대해 조사한 내용 + 알던 내용 정리 + nodejs, express 예제 글입니다.

## 쿠키

쿠키는 클라이언트 측(브라우저)에 저장되는 key-value 형식의 데이터파일입니다. 브라우저에서도 쿠키를 볼 수 있습니다.

request, response의 헤더에 Set-Cookie를 설정해 서버와 클라이언트 간에 쿠키를 주고받을 수 있습니다. 서버 측에서 response의 헤더에 Set-Cookie를 통해 새 쿠키를 생성하면 브라우저에 쿠키가 추가되고, 브라우저에서 request가 발생하면 서버 측에서 request의 헤더로부터 그 브라우저의 모든 쿠키를 읽을 수 있습니다.
쿠키엔 key-value 말고도 만료 기간, 도메인, 경로, HttpOnly, Secure 등을 설정할 수 있습니다.
주로 온라인 쇼핑몰에서 최근에 본 상품, 장바구니 등에 사용됩니다.

## nodejs,express에서의 쿠키
nodejs를 통해 간단한 http 서버를 만들어 쿠키를 확인해봅시다.
```js
const http = require('http');
const PORT = 3001;
http.createServer((request, response) =>{
 if(request.headers.cookie){
 console.log(request.headers.cookie);
 }
 response.end('cookie test');
}).listen(PORT,()=>{
 console.log(`server on:${PORT}`);
});
```
3001번 포트를 사용하는 http 서버를 하나 만들었습니다.
{{<figure-img src="images/_ga%20쿠키.png" alt="nodejs cookie">}}
console에 찍힌 쿠키들
{{</figure-img>}}

콘솔 창에 2개의 쿠키가 찍힌 것을 볼 수 있습니다.
브라우저에서 F12->Application->Cookies를 눌러보면 똑같은 쿠키를 확인할 수 있습니다.
{{<figure-img src="images/_ga%20쿠키2.png" alt="nodejs cookie 2">}}
브라우저에 찍힌 쿠키들
{{</figure-img>}}
위와 같이 쿠키는 클라이언트와 서버 양쪽에서 확인할 수 있습니다.
nodejs에선 request 객체를 통해 쿠키를 확인할 수 있습니다.

## _ga로 시작하는 쿠키들
`_ga`로 시작하는 생성 한적 없는 쿠키가 찍히는 것을 확인할 수 있는데, _ga 쿠키는 
구글 애널리틱스에서 고유 사용자 식별에 사용하는 쿠키입니다. 제 경우는 Whale 브라우저라서 저게 뜨는 것 같네요.

더 자세한 내용은 아래 링크들을 참고하세요  
https://analyticsmarketing.co.kr/digital-analytics/google-analytics/1655/  
https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage

### 브라우저에서 쿠키 추가하기
쿠키의 특징 중 하나는 클라이언트에서 쿠키를 추가하거나 삭제, 변경할 수 있다는 점입니다.

{{<figure-img src="images/브라우저에서%20쿠키%20추가.png" alt="브라우저 쿠키 추가">}}
브라우저에 쿠키 추가하기
{{</figure-img>}}
{{<figure-img src="images/브라우저에서%20쿠키%20추가2.png" alt="브라우저 쿠키 추가">}}
브라우저에 쿠키 추가하기2
{{</figure-img>}}
`test-cookie`라는 이름의 쿠키를 하나 추가했습니다.

### 자바스크립트로 쿠키 추가하기
개발자모드 창을 통하지 않고 javascript를 통해 쿠키를 읽고 쓸 수 있습니다.

```js
console.log(document.cookie) // 쿠키 출력
```
{{<figure-img src="images/js로 쿠키추가.png" alt="js로 쿠키 추가">}}
위는 test-cookie 추가 전, 아래는 test-cookie 추가 후
{{</figure-img>}}
클라이언트에서 document 객체의 cookie를 확인해보면 같은 문자열을 확인할 수 있습니다. 위 사진에선 브라우저에 `test-cookie` 쿠키를 추가하기 전 `document.cookie`와 `test-cookie` 쿠키를 추가한 후 `document.cookie`를 출력한 것 입니다; `;`로 구분된 쿠키들을 볼 수 있습니다.

쿠키가 String으로 출력되는 것에서 알 수 있듯, 쿠키는 String 형태로 request 헤더, response 헤더에 쓰입니다. 뭐... 당연한 얘기입니다.

아쉽게도 쿠키는 원문 String 그대로 저장되기 때문에 클라이언트에서 cookie 모듈을 만들어 사용하는 것이 좋습니다.

```js
export default {
    setCookie(name,value,time) {
        const date = new Date();
        date.setTime(date.getTime() + time);
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path='/'`;
    },
    getCookie(name) {
        const value = document.cookie.match(`(^|;)?${name}=([^;]*)(;|$)`);
        return value? value[2] : null;
    },
    deleteCookie(name) {
        const date = new Date();
        document.cookie = `${name}='';expires=${date.toUTCString()};path=/`;
    }
}
```
제가 사용하는 자작 cookie 모듈입니다. 간단하게 만들어서 간단한 쿠키 생성, 간단한 쿠키 파싱, 쿠키 삭제만 가능합니다. 간단간단간단간단

나중에 좀 더 업그레이드된 cookie 모듈을 만들면 따로 블로그에 올리겠습니다.

### nodejs에서 쿠키 다루기
`request.cookie`를 통해 쿠키를 읽어왔었죠. 마찬가지로 nodejs에서 `request.cookie`를 출력해보면 String이 나옵니다. nodejs에선 cookie 모듈을 npm으로 받아서 사용합시다.

아래 링크의 cookie를 사용합니다.  
https://www.npmjs.com/package/cookie
```bash
npm i cookie
```
```js
const http = require('http');
const cookie = require('cookie'); // cookie 모듈 추가
const PORT = 3001;
http.createServer((request, response) =>{
 if(request.headers.cookie){
 console.log(request.headers.cookie); // request 헤더 출력
 const cookies = cookie.parse(request.headers.cookie);
 console.log(cookies); // cookie 모듈을 통해 헤더를 파싱한 결과 출력
 }
 response.end('cookie test');
}).listen(PORT,()=>{
 console.log(`server on:${PORT}`);
});
```

코드를 위와 같이 수정하고 다시 시작해 봅시다..
{{<figure-img src="images/nodejs와 쿠키.png" alt="nodejs로 쿠키 출력">}}
nodejs로 쿠키 출력
{{</figure-img>}}
String이 깔끔하게 객체화된 것을 볼 수 있습니다.

그럼 서버 측(nodejs)에서 쿠키를 생성해봅시다. 서버에선 response의 헤더를 통해 쿠키를 설정합니다.

```js
const http = require('http');
const cookie = require('cookie'); // cookie 모듈 추가
const PORT = 3001;
http.createServer((request, response) =>{
    if(request.headers.cookie){
        console.log(request.headers.cookie);
        const cookies = cookie.parse(request.headers.cookie);
        console.log(cookies);
    }
    /*nodejs에서 쿠키 추가*/
    response.setHeader('Set-Cookie', cookie.serialize('test-cookie2','5678', {
        httpOnly: false,
        maxAge: 60 * 60 * 24
    }));
    response.end('cookie test');
}).listen(PORT,()=>{
    console.log(`server on:${PORT}`);
});
```

위 예제 코드에선 cookie 모듈을 이용해 `test-cookie2` 쿠키를 만들어줍니다. 옵션은 좀 이따 보고 일단 브라우저에 쿠키가 생성되었는지 확인해봅시다.

{{<figure-img src="images/nodejs와 쿠키2.png" alt="nodejs로 쿠키 출력">}}
nodejs로 생성한 쿠키 확인
{{</figure-img>}}

`test-cookie2`가 생성된 것을 확인할 수 있습니다. 

위의 쿠키 추가 코드는 아래 코드와 동일합니다.
```js
/*cookie모듈 없이 nodejs에서 쿠키 추가*/
response.setHeader('Set-Cookie',`test-cookie2=5678; Max-Age=${60*60*24}`);
```

## 쿠키의 옵션
쿠키엔 key-value 말고도 여러 옵션을 줄 수 있습니다. 
- Expires: 쿠키가 만료되는 날짜
- maxAge: 쿠키가 사라지기까지 남은 기간(초)
- Domain: 쿠키가 사용되는 도메인
- Path: 특정 경로에 접근 시 쿠키 전송
- Secure: https 통신에서만 쿠키 전송
- HttpOnly: 클라이언트 측에서 쿠키 접근 방지

옵션들은 헤더에 `;`로 구분해 추가해주면 됩니다. expires와 maxAge가 충돌하면 maxAge를 더 우선시합니다.

nodejs에서 옵션이 달린 쿠키를 만들어봅시다.

```js
const http = require('http');
const cookie = require('cookie'); // cookie 모듈 추가
const PORT = 3001;
http.createServer((request, response) =>{
    if(request.headers.cookie){
        console.log(request.headers.cookie);
        const cookies = cookie.parse(request.headers.cookie);
        console.log(cookies);
    }
    /*nodejs에서 쿠키 추가*/
    response.setHeader('Set-Cookie', cookie.serialize('test-cookie2','5678', {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path:'/'
    }));
    response.end('cookie test');
}).listen(PORT,()=>{
    console.log(`server on:${PORT}`);
});
```
`test-cookie2`에 `path`,`maxAge`,`httpOnly`옵션을 줬습니다. maxAge 옵션은 `현재시간 + 주어진 시간`을  Expires로 설정합니다. maxAge 초가 지나면 쿠키는 자동으로 삭제됩니다.

{{<figure-img src="images/nodejs와 쿠키3.png" alt="nodejs로 쿠키 출력">}}
옵션이 추가된 쿠키
{{</figure-img>}}

HttpOnly에 체크표시가 생긴 것을 볼 수 있습니다. httpOnly를 true로 설정해줬기 때문인데, 브라우저에서 `document.cookie`를 출력해보겠습니다.

{{<figure-img src="images/nodejs와 쿠키4.png" alt="nodejs로 쿠키 출력">}}
test-cookie2가 출력되지 않는다.
{{</figure-img>}}

이제 document.cookie로 test-cookie2에 접근할 수 없습니다. 

위의 쿠키 옵션 추가 코드는 아래 코드와 동일합니다.
```js
/*cookie모듈 없이 nodejs에서 쿠키 추가*/
response.setHeader('Set-Cookie',`test-cookie2=5678; Max-Age=${60*60*24}; path=/; HttpOnly`);
```
## 쿠키의 보안 문제

쿠키에 httpOnly 옵션이 있는 이유는 자바스크립트를 통해 유저의 cookie정보에 접근할 수 있어서 해커들이 유저의 cookie 정보를 가로채는 상황(하이재킹)이 발생할 수 있기 때문입니다. 따라서 쿠키를 생성할 땐 쿠키에 개인정보가 담기지 않도록 조심해야하며, httpOnly 옵션을 설정해주는 것이 좋습니다.

쿠키엔 Secure 옵션도 존재하는데, 이 옵션은 Https 프로토콜을 사용하는 경우에만 쿠키를 전송하도록 설정하는 옵션입니다. 네트워크 정보를 스니핑하는 등의 네트워크상에서 발생하는 해킹을 막기 위한 옵션입니다. Https에선 쿠키가 암호화되어 전송되기 때문에 http에서 쿠키를 사용하는 것보다 안전합니다. 물론 쿠키에 개인정보나 위험한 정보가 담기는 상황 자체가 바람직하지 않습니다. 

## 쿠키의 종류
- Session Cookie 
- Persistent Cookie
- Secure Cookie
- Third-Party Cookie

### Session Cookie
메모리상으로만 존재하며 브라우저 종료 시 또는 만료 시 사라지는 쿠키입니다. Expires/maxAge 설정을 해주지 않으면 session 쿠키가 됩니다.

### Persistent Cookie
쿠키 파일로 만들어져 저장되어, 브라우저를 종료하더라도 사라지지 않는 쿠키입니다. Expires/maxAge를 설정해주면 persistent 쿠키가 됩니다.

### Secure Cookie
암호화된 쿠키입니다. http 통신에선 이용 불가능하고, Https 통신에서 사용할 수 있습니다. secure옵션이 설정되면 Secure Cookie가 됩니다.

### Third-Party Cookie
내가 접속한 도메인에 생성된 쿠키는 First-party Cookie, 내가 접속하지 않은 도메인에 생기는 쿠키는 Third-Party Cookie입니다. 예를 들어, 옥션에서 신발을 검색한 경우, 다른 사이트에 나오는 광고에서 신발과 관련된 광고가 나오는 것을 본 적 있을 겁니다. 이것은 신발을 검색한 결과 Third-Party Cookie가 생성되고, 다른 도메인에 접속해도 이 쿠키를 바탕으로 사용자를 추적해 광고를 띄우는 것입니다.

물론 프라이버시 침해의 여지가 있습니다. 내가 검색한 내용을 다른 사이트들이 돌려가면서 사용하는 거니까요.

다행히 아래 링크를 보면 앞으로 1년 안에 이 Third-Party Cookie를 차단한다고 하네요.
http://www.openads.co.kr/content/contentDetail?contsId=3791

## Express에서 쿠키 사용하기
express에는 쿠키를 다루기 위한 미들웨어가 존재합니다.
`cookie-parser`가 그것이죠. 

```bash
npm i cookie-parser
```
위 명령으로 cookie-parser를 설치할 수 있고, express-generator로 웹앱을 생성한 경우엔 cookie-parser가 기본적으로 package.json에 포함되어 있습니다.

```js
const cookieParser = require('cookie-parser');
//...
app.use(cookieParser('secret-code'));
```
위와 같은 방식으로 cookie-parser를 달아줄 수 있습니다.
cookie-parser의 파라미터로 string을 넘겨줄 수 있는데(위 예제의 경우 `secret-code`), 이 string은 쿠키의 변형을 감지할 때 사용합니다.

이 미들웨어는 req.cookies에 들어있는 String을 parsing해 객체로 바꿔주고, res에서 cookie 메소드를 통해 쿠키를 생성, 관리해줄 수 있게 해줍니다.

```js
//express 코드임
//쿠키에 접근
console.log(req.cookies);

//쿠키 생성 & 변경
res.cookie('test-cookie','1234');

// 쿠키 생성 + 옵션
res.cookie('test-cookie','1234',{
    maxAge: 60*60*24,
    httpOnly: true,
    secure: true
});

//쿠키 삭제
res.clearCookie(('test-cookie');
```

### signed cookie
cookie-parser는 쿠키가 변형이 일어났는지 판단할 수 있도록 `signed`라는 옵션을 제공합니다. (변형되지 않은 쿠키를 signed cookie라고 합니다.) 
```js
app.use(cookieParser('secret-code'));
```
앞서 cookie-parser를 생성할 때 파라미터로 넘겨준 'secret-code'를 비밀키로 사용해 쿠키의 value에 변형이 있었는지 판단합니다.

```js
//signed cookie 생성
response.cookie('test-cookie','1234',{
    signed: true
});

//변형되지 않은 cookie 확인
console.log(req.signedCookies);
```
쿠키를 생성할 때 `signed` 옵션을 주게 되면 이 쿠키의 value는 암호화되어 클라이언트에 전달됩니다.

다시 이 쿠키가 request로 express에 전달될 때, req.signedCookies엔 signed 옵션이 사용되었고, 변형되지 않은 쿠키만 포함됩니다. (req.cookies엔 변형된 쿠키를 포함해 모든 쿠키가 들어있습니다)

cookie-parser 자체에도 signed 여부를 판단하기 위한 메소드를 제공합니다.
```js
cookieParser.signedCookie(str,secret);
```
암호화된 쿠키와 비밀키('secret-code')를 집어넣었을 때, signed 쿠키이며, 알맞은 비밀키를 사용했다면, decode 된 결과를 얻을 수 있습니다. 그렇지 않다면 false를 반환합니다.

자세한 사용법은 아래 링크를 참고해 주세요.  
https://www.npmjs.com/package/cookie-parser

## 마치며
원래 쿠키와 세션을 묶어서 쓰려고 했는데 쿠키만으로도 이미 글이 너무 방대해서 세션은 다음 글에서 다루려고 합니다. 

## 참고한 링크
https://analyticsmarketing.co.kr/digital-analytics/google-analytics/1655/  
https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage  
https://www.npmjs.com/package/cookie  
https://nesoy.github.io/articles/2017-03/Session-Cookie  
https://nsinc.tistory.com/121  
https://xlos.tistory.com/1776  
http://www.openads.co.kr/content/contentDetail?contsId=3791  
https://www.npmjs.com/package/cookie-parser  