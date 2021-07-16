+++
title= "console창에 문구 띄우기"
date= 2021-06-02T20:55:44+09:00
categories= ["study"]
subcategories = ["web"]
tags= ["study","컴퓨터 기술","공부정리","web","콘솔창에 로고","크롬 콘솔창"]
cover= ""
icon = "study/computer_science_icon.png"
draft= false
+++

다른 사람들이 작성한 코드를 참고하려 티스토리 블로그를 돌아다니다 보면 가끔 그런 블로그를 볼 때가 있습니다. 예시 코드가 가운데 정렬(`text-align:center`)되어 나오는 블로그들이요. 보는데 크게 불편한 건 아니지만 뭔가 속으로 불ㅡ편 해서 구태여 콘솔 창을 키고 css를 직접 수정해서 코드를 읽곤 합니다.

그때도 별 생각 없이 콘솔 창을 켰는데...

{{<figure-img src="images/티스토리 콘솔창 문구.png" alt="티스토리 콘솔창">}}
어느날 발견한 티스토리 콘솔창
{{</figure-img>}}

아니, 콘솔 창에 저런 문구가 있는 겁니다. 처음엔 이미지를 콘솔 창에 띄우는 방법이 있나? 라고 생각했는데, 다시 보니 Text를 출력한 거였습니다. Text여도 이쁘게 색을 입혀서 출력된 문구가 너무 탐스러웠습니다. 알아보니 상당히 생소한 방법으로 문구를 넣더라고요.

## 문구 넣는 방법
`<head></head>`사이에 script를 집어넣어서 만듭니다.

[참고한 블로그](https://webmini.tistory.com/m/996)

위 블로그에 올라온 소스 코드를 참고해서 방법을 알아보겠습니다.

```js
<head>
    <script>
        var cssRule= "font-size:2em;"
        var cssLogo1 ="color:#da6c37;" +"font-size: 60px;" +"font-weight: bold;" +"letter-space:-1px;" +"font-family:Tahoma,Arial,sans-serif";
        if(window.console!=undefined){
            setTimeout(console.log.bind(console,"%cTISTORY", cssLogo1),0);
            setTimeout(console.log.bind(console,"%c 나를 표현하는 블로그",cssRule),0);
        }
    </script>
</head>
```
위와 같이 head에 script를 집어넣습니다. 하나하나 뜯어봅시다.

### console.log.bind

console.log는 뭔지 다 아실 겁니다. 콘솔 창에 로그를 출력하는 console객체의 메소드이죠.

`bind` 함수는 ES6부터 추가된 함수로, 특정 this를 가지는 함수를 반환하는 함수입니다.

```js
    window.a = 'a in window';
    const obj1 = {
        a:'a in obj1',
        func: function(arg1) {
            console.log('arg:'+arg1);
            console.log(this.a);
        }
    }
    const obj2 = {
        a:'a in obj2',
    }
    const func1 = obj1.func.bind(this,1);
    const func2 = obj1.func.bind(obj2,2);
    func1();
    func2();
```

{{<figure-img src="images/bind 예제코드.png" alt="bind 예제코드">}}
예제 코드 실행 결과
{{</figure-img>}}

위 예제에서 `func1`은 obj1의 메소드임에도 `this.a`를 출력했을 때 window.a를 출력하는 것을 볼 수 있습니다. func1을 만들 때 window를 this로 사용하도록 했기 때문입니다.

bind의 첫 번째 파라미터는 this가 될 객체, 두 번째 파라미터부터는 함수의 파라미터입니다. 

### console.log 서식문자
console.log는 파라미터를 2가지 방식으로 줄 수 있습니다.

```js
console.log(obj1 [,obj2, ..., objN]);
console.log(msg [,subst1, ..., substN]);
```

첫 번째 방식은 출력할 변수를 나열하는 방식입니다. 
```js
console.log("I","am","a","boy");
```
{{<figure-img src="images/console.log 예제1.png" alt="console.log 예제코드">}}
console.log 예제 1
{{</figure-img>}}
나열한 문자열을 순서대로 출력합니다.

두 번째 방식은 서식문자가 들어가는 경우입니다. C언어의 printf와 같은 방식이라고 생각하면 됩니다.
```js
console.log("%s. I am %d years old.","I am a boy",24);
```
{{<figure-img src="images/console.log 예제2.png" alt="console.log 예제코드2">}}
console.log 예제 2
{{</figure-img>}}

서식문자의 의미는 다음과 같습니다.
- `%s`: 문자열
- `%d`: 숫자
- `%o`: 객체

이 외에도 `%c` 서식문자를 사용할 수 있습니다. `%c`는 출력할 문구의 style을 지정해줄 수 있습니다. 

```js
console.log("%cA %cB %cC","color:red;font-size:1rem","color:blue;font-size:1.5rem","color:green;font-size:2rem");
```
{{<figure-img src="images/console.log 예제3.png" alt="console.log 예제코드3">}}
console.log 예제 3

{{</figure-img>}}

### setTimeout(~,0)
`setTimeout(~,0)`. 이렇게 setTimeout에 0ms를 설정해주는 것은 처음보는 사람은 이게 무슨 의미가 있는 코드야? 라고 생각하겠지만, 의외로 유용하고 유명한 **편법**입니다. 

웹의 동작과정을 자세히 살펴보는 시간은 아니니 간단하게만 설명하겠습니다.(실제 작동은 훨씬 복잡합니다.)

자바스크립트 엔진은 한번에 하나의 작업만 실행합니다. 자바스크립트 엔진을 사용하는 환경(브라우저 또는 node.js)에선 **이벤트 루프**라는 이름의 while문을 돌면서 태스크가 발생하는 것을 감시합니다. 태스크가 발생하면 **task queue**라는 큐에 태스크가 쌓이는데, 이벤트루프는 task queue에 태스크가 쌓이는 것을 감지하고 task queue에서 태스크를 꺼내 **call stack**(호출 스택)이라는 스택에 집어넣습니다. 자바스크립트 엔진은 이 call stack에서 태스크를 하나씩 꺼내 처리합니다.

그럼 setTimeout이 일어나면 어떻게 될까요? 다음 코드를 Task1이라 합시다.
```js
setTimeout(()=>{
    console.log('A');
},0);
console.log('B');
```
setTimeout은 2개의 파라미터를 가집니다. 

1) 콜백함수  
2) 딜레이   

딜레이 만큼의 시간이 지나면 콜백함수가 태스크로 발생합니다. `console.log('A')`가 task queue에 들어가겠죠. 이 태스크는 Task2라고 합시다. 이벤트루프가 Task2를 감지하고 call stack에 집어 넣겠죠. 근데 Task1이 아직 끝나지 않았기 때문에 이벤트루프는 Task2를 call stack에 집어넣지 않습니다. Task1이 `console.log('B')`를 출력하고 종료되면 Task2를 call stack에 집어넣고 실행하겠죠. 

따라서 수행 결과는 
```bash
B
A
```
가 됩니다. 이렇게 현재 수행중인 태스크가 완료되고 콜백함수를 실행시키고 싶다면 (즉, 비동기적으로 코드를 실행시킬 때) `setTimeout(~,0)`을 사용합니다.

## 코드 해석

다시 처음으로 돌아와서 코드를 해석해봅시다.
```js
<head>
    <script>
        var cssRule= "font-size:2em;"
        var cssLogo1 ="color:#da6c37;" +"font-size: 60px;" +"font-weight: bold;" +"letter-space:-1px;" +"font-family:Tahoma,Arial,sans-serif";
        if(window.console!=undefined){
            setTimeout(console.log.bind(console,"%cTISTORY", cssLogo1),0);
            setTimeout(console.log.bind(console,"%c 나를 표현하는 블로그",cssRule),0);
        }
    </script>
</head>
```
먼저 `if(window.console!=undefined)`는 window에 console객체가 있는지 확인하고 있습니다. 낮은 버전의 IE의 경우 console 객체를 지원하지 않는 경우가 있어 window에 console 객체가 있는지 확인하는 것 같습니다.

다음으로 `console.log.bind(console)`은 큰 의미는 없고, `console.log("%cTISTORY",cssLogo1)`을 실행하는 함수를 만드는 코드인 것 같습니다.

```js
setTimeout(()=>{
    console.log("%cTISTORY", cssLogo1);
},0);
```
위 코드와 같은 의미가 아닌가 싶네요.

마지막으로 setTimeout을 쓰는 이유는 랜더링이 끝난 뒤에 콘솔창에 문구를 띄우기 위함인 것 같습니다. head에 들어가는 코드는 dom 렌더링이 끝나기 전에 실행되기 때문에 console.log가 리소스를 잡아먹지 않게 렌더링이 끝나고 실행되도록 한 것 같네요.

### 참고한 사이트
https://developer.mozilla.org/ko/docs/Web/API/Console/log  
https://webmini.tistory.com/m/996  
https://stackoverflow.com/questions/28668759/what-does-this-statement-do-console-log-bindconsole