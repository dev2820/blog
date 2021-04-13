+++
title= "CSS 선택자"
date= 2021-04-13T00:15:14+09:00
categories= ["study"]
subcategories = ["CSS"]
tags= ["study","컴퓨터 기술","공부정리","CSS","web"]
cover= ""
icon = "study/computer_science_icon.png"
draft= false
+++

CSS 선택자가 뭔지는 설명 안하겠습니다. 

## CSS 선택자

### `*` 선택자

모든 태그를 선택하는 선택자 입니다.
```css
* {
    //css code
}
```
### Tag 선택자

주어진 이름의 태그를 선택하는 선택자입니다.
```css
body {
    /*body css code*/
}

header {
    /*header css code*/
}
```

### class 선택자

주어진 이름의 클래스를 선택하는 선택자입니다. `.`을 붙여 클래스임을 구분지어 줍니다.
```css
.name {
    /*name class css*/
}
```

### id 선택자

주어진 이름의 아이디를 선택한느 선택자입니다. `#`을 붙여 아이디임을 구분지어 줍니다.
```css
#title {
    /*title id css*/
}
```

### 속성 선택자
태그에 붙은 속성도 선택자로 사용할 수 있습니다.

```html
<a href="http://www.google.com">google</a>
<input type="file">
```
위와 같은 태그가 있다면

```css

a[href="http://www.google.com"] {
    /*href 속성값이 http://www.google.com 인 a 태그*/
}
input[type="password"] {
    /*input*/
}
```
위와 같이 선택할 수 있습니다. 단순히 속성이 붙어있거나 속성 중에도 특정 값을 가지는 요소를 선택할 때 사용합니다. 
~로 끝나는 속성을 가진 태그, ~를 속성값으로 포함하는 태그 등 다양한 활용이 가능합니다.

```css
a[href] {
    /*href 속성을 지닌 모든 a 태그*/
}
a[href*="https://"] {
    /*href 속성값이 http://www.google.com 인 a 태그*/
}
img[src$=".png"] {
    /*src 속성값이 .png로 끝나는 img 태그*/
}
```

저는 주로 아이디input과 패스워드input을 구분지을 때 사용하거나 링크를 다른색으로 만들 때 이런 선택자를 용합니다.

더 많은 예제는 여기를 참고하세요
{{<a_blank href="https://developer.mozilla.org/ko/docs/Web/CSS/Attribute_selectors">}}MDN 특성 선택자{{</a_blank>}}

## 의사 클래스(Pseudo class) 선택자
가상 클래스라고도 합니다.

실제 요소에 붙은 class명은 아니지만 특정 조건에서 마치 그 class가 붙어있는 것처럼 사용하는 선택자 입니다. 쓸 수 있는 의사 클래스가 정해져있고 `:`를 붙여 사용합니다.

```css
a:link {
    /*방문하지 않은 a 태그*/
}
a:visited {
    /*방문한 a 태그*/
}
div:hover {
    /*커서가 올라가 있는 div 요소*/
}
input:focus {
    /*포커싱 되어있는 input 태그*/
}
button:active {
    /*활성화한 button 태그*/
}
```
활성화는 mousedown 상태에서 mouseup 되기 전까지의 상태입니다. 위가 보통 많이 쓰는 가상 클래스고 자주 안써서 있는지도 몰랐던 가상 클래스들도 있습니다.

```html
<form>
    <input type="text">
</form>
```
```css
form:focus-within {
    /*form 태그 내부에 focus된 요소가 있으면 선택자가 적용됩니다.*/
    background-color:red;
}
```
위와 같이 html과 css가 있으면 input에 focus가 돼도 form의 배경색이 red로 바뀝니다. 

말고 input전용 의사 클래스인 `:disabled`,`:autofill`, 등등 많아서 다는 못적겠고 아래 링크를 달테니 참고하시면 되겠습니다.

아 이건 자주쓰는거라 기술해야겠네요(못참겠음)
```css
input:invalid {
    /*내용이 빈 input태그*/
}
input:valid {
    /*내용이 있는 input태그*/
}
```
`invalid`,`valid` 가상클래스로 반드시 작성해야하는 form이 채워져 있는지 채워져있지 않은지 css로 표현해줄 수 있습니다.

### 구조 선택자
DOM tree 구조상 요소가 어디에 위치했는지에 따라 적용되는 선택자 입니다.
```css
:root {
    /*DOM tree의 root 요소를 가리킵니다. HTML이면 html 태그를 가리킵니다. */
    /*보통 전역 CSS 변수를 저장할때 사용되는데 이건 다른 글에서 다루겠습니다.*/
}
:empty {
    /*요소 중 자식이 없는 요소를 가리킵니다.(안에 아무 요소도 없음) */
}
```

요소들 중 첫번째 요소, 짝수번 요소 등등 일부 요소만 선택할 때 사용하는 선택자들도 있습니다.
```css
:nth-child() {
    /*()안에 들어있는 수식을 기반으로 요소를 선택합니다. */
    /*예를 들어 p:nth-child(2) 라면 2번째 자식인 p를 선택합니다. */
    /*n을 이용한 간단한 수식을 사용할 수 있습니다.*/
    /*p:nth-child(3n+2) 라면 3n+2번째 자식인 p를 선택합니다.(2,5,8...) */
    /*:nth-child(odd),:nth-child(even) 같은 특수 수식도 이용 가능한데, odd는 홀수, even은 짝수 요소를 선택합니다.*/
}

:nth-last-child() {
    /*nth-child랑 같은데 뒤에서부터 샙니다.*/
    /*예를 들어 p:nth-last-child(2) 라면 끝에서 2번째 자식인 p를 선택합니다. */
}

:first-child {
    /*첫번째 자식인 요소를 선택합니다. :nth-child(1)과 같습니다.*/
}

:last-child {
    /*마지막째 자식인 요소를 선택합니다. :nth-last-child(1)과 같습니다.*/
}

:only-child {
    /*sibling이 없는 요소를 선택합니다.*/
}

:nth-of-type() {
    /*:nth-child처럼 ()안에 선택자를 집어넣어서 씁니다.*/
    /*nth-child와 달리 특정 태그에 대해서 count를 진행합니다.*/
    /*말이 어렵네요 아래에 차이점을 기술하겠습니다.*/
}

:nth-last-of-type() { /*nth-last-child의 nth-of-type버전*/}

:first-of-type() { /*first-child의 nth-of-type버전*/}

:last-of-type { /*last-child의 nth-of-type버전*/}

:only-of-type { /*only-child의 nth-of-type버전*/}
```
### `nth-child`와 `nth-of-type`의 차이점
바로 예시부터 들어보겠습니다.
```html
<div>
    <div id="a"><div>
    <p id="b"></p>
    <p id="c"></p>
</div>
```
```css
p:nth-child(2) { }
p:nth-of-type(2) { }
```

위와 같이 html과 css가 있다면 `:nth-child(2)`는 `<p id="b"></p>`를 선택하고
`:nth-of-type(2)`는 `<p id="c"></p>`를 선택합니다.

`nth-child`는 sibling중 type이 다른 요소들도 counting에 포함합니다. 2번째 자식인 p는 `<p id="b"></p>`입니다. 만약 `p:nth-child(1)`이었다면 아무 요소도 선택되지 않았을 겁니다.

반면에 `nth-of-type`은 sibling중 다른 요소는 counting에서 배제합니다. 즉 `<div id="a"><div>`가 count되지 않기 때문에 `p:nth-of-type(1)`은 `<p id="b"></p>`, `p:nth-of-type(2)`은  `<p id="c"></p>` 입니다.

### 부정 선택자
`:not()`으로 사용하는 부정 선택자는 ~가 아닌 요소를 선택합니다. 괄호안에는 css 선택자가 들어갈 수 있습니다.
```css
h1:not(.title) {
    /*h1태그 중 .title 클래스가 붙지 않은 태그를 선택합니다.*/
}
``` 

## 가상 요소(Pseudo element)
가상 요소는 실제 존재하지 않는 요소를 만들어줍니다. 아주 유용한 문법인데, 활용도가 무궁무진합니다. 좀 멋있는 css는 죄다 이 가상요소를 이용해 만듦니다. 

`::`를 붙여서 사용합니다.

자주쓰는 가상요소 3개만 알아봅시다.
### `::after`
`:after`로 사용하는 것도 가능합니다. 둘다 맞는 문법입니다. 
```css
p::after {
    content: "abcde";
    color:green;
}
```
가상 요소를 사용하면 Dom tree에  `::after`가 추가된 것을 볼 수 있습니다.  p 요소 바로 오른쪽에 가상의 요소가 생깁니다. `content`내용이 적힌 요소가 생성되는데 `content`를 써주지 않으면 css가 작동하지 않습니다. 필수임.

### `::before`
`:before`로 사용하는 것도 가능합니다.
```css
p::before {
    content: "fghij";
    color:blue;
}
```
`::after`와 같은 가상 요소 이지만 부모 요소의 왼쪽에 생깁니다.

보통 `content:"";`로 비어있는 `div`처럼 사용합니다. 

### `::selection`
드래그한 영역 가상요소입니다. 글을 드래그하면 파랗게 변하잖아요. 그게 selection 가상요소입니다. 
```css
::selection {
    background-color:black;
    color:white;
}
```
가끔 블로그중에 드래그하면 다른 색이 나오는 블로그들이 있는데 그런 블로그가 이 css를 적용했다고 보면 됩니다. 

## CSS 결합자

선택자 간의 관계로 선택자를 정의할 수 있습니다. (~안의 요소, ~의 옆에 있는 요소)

### 자식 결합자
선택자 요소의 자식 요소(DOM tree 바로 아래 요소)를 선택하는 선택자 입니다.

```html
<ul class="list">
    <li class="a"></li>
    <li class="b"></li>
    <li class="c"></li>
</ul>
```
```css
ul.list > li {
     /*ul 태그 자식 요소인 모든 li를 선택*/
     background-color:green;
}
```
위 코드는 `<li class="a"></li>`,`<li class="b"></li>`,`<li class="c"></li>`의 배경색을 모두 초록색으로 바꿉니다.

### 하위 결합자
선택자 요소의 하위 요소(DOM tree 아래 모든 요소)를 선택하는 선택자 입니다.

```html
<div class="box">
    <div class="box2">
        box in a box
        <div class="box3">box in a box in a box</div>
    </div>
</div>
```
```css
div.box div {
    /*ul 태그 하위 요소인 모든 li를 선택*/
    color:red;
}
```
위 코드는 `<div class="box">`태그 안의 모든 div의 color를 빨간색으로 바꿉니다.

자식 결합자는 바로 아래 태그(자식)만 선택하지만 하위 결합자는 해당 요소를 조상으로 가지는 모든 요소를 선택합니다.

### 인접 형제 결합자
해당 요소의 형제 요소(sibling)중 바로 옆(아래) 요소를 선택하는 선택자입니다.
```html
<ul class="list">
    <li class="a">a</li>
    <li class="b">b</li>
    <li class="c">c</li>
</ul>
```
```css
li.a + li {
    /*a 클래스를 가지는 li 바로 옆(아래) 요소*/
    color:red;
}
```
위 코드는 `<li class="b">b</li>`를 선택합니다.


### 일반 형제 결합자
해당 요소의 모든 형제 요소를 선택하는 선택자입니다.
```html
<ul class="list">
    <li class="a">a</li>
    <li class="b">b</li>
    <p>???</p>
    <li class="c">c</li>
    <li class="d">d</li>
    <li class="e">e</li>
</ul>
```
```css
li.b + li {
    /*b 클래스를 가지는 li 아래 모든 sibling 요소*/
    color:red;
}
```
위 코드는 `<li class="c">c</li>`,`<li class="d">d</li>`,`<li class="e">e</li>` 태그를 선택합니다.

## 마치며
css는 직접 보이는게 있어야 이해가 빨라서 codepen같은 걸로 결과물을 보여주면 좋았겠지만... 시험기간이라 여유가 없어서... 나중에 여유가 생기면 글을 보충하겠습니다.