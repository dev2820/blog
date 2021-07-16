+++
title= "nodejs의 자식프로세스"
date= 2021-07-13T10:50:23+09:00
categories= ["study"]
subcategories = ["web"]
tags= ["study","컴퓨터 기술","공부정리","web","nodejs","process"]
cover= ""
icon = "study/computer_science_icon.png"
draft= true
+++

nodejs 자식프로세스 생성에 관한 글로 {{<a_blank href="https://nodejs.org/api/child_process.html">}}Node.js v16.4.2 documentation - child process{{</a_blank>}}의 글을 바탕으로 작성됐습니다. 사설이 좀 붙지만 그냥 거의 번역글이에요.

## 자식 프로세스

CS시간은 아니니 프로세스의 개념을 자세히 설명하진 않을 것이고, nodejs에서 프로세스가 어떤 의미인지만 간단하게 살펴봅시다.

실행가능한 파일을 **프로그램**, 실행해서 메모리에 올라간 프로그램을 **프로세스**라고 하지요. 프로세스 안에서도 프로세스를 생성할 수 있는데, A 프로세스에서 B 프로세스를 생성하면 A는 **부모프로세스**, B는 **자식프로세스**가 됩니다. 

그런데, nodejs는 싱글스레드 이벤트 루프를 가지죠. 따라서 2가지 방식으로 자식프로세스를 생성할 수 있습니다. 

- 비동기 : 자식프로세스가 비동기적으로 동작해 이벤트 루프를 block하지 않습니다. 
- 동기 : 자식프로세스가 동기적으로 동작해 자식프로세스가 종료 또는 종료당하기까지 이벤트 루프를 block합니다.

다음으로 자식프로세스를 생성하는 방법을 알아봅시다.

## spawn

```js
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```
{{<comment>}}spawn 기본 예제{{</comment>}}
자식 프로세스 생성 관련 모듈은 `child_process` 내에 정의되어 있습니다.

spawn은 '(알을)낳다' 라는 뜻인데 nodejs에서는 자식프로세스를 생성하는 함수입니다.

위 예제 코드는 spawn으로 생성된 자식프로세스에서 `ls -lh /usr`를 수행한 결과가 이벤트로 발생하고 stdout,stderr에서 각각 이벤트를 대기했다 출력하는 코드입니다. 

{{<figure-img src="images/spawn 실행결과.png" alt="nodejs spawn">}}
실행 결과
{{</figure-img>}}

spawn으로 생성된 자식프로세스도 stdin,stdout,stderr 파이프를 가집니다. 부모프로세스에서 이 파이프들에 데이터가 들어오는 것을 감지해 callback함수를 통해 데이터를 읽고 사용합니다. 또한 프로세스가 종료시 `close` 이벤트가 발생하는 것을 확인할 수 있습니다.

child_process.spawn 함수로 생성한 자식프로세스는 비동기적으로 작동합니다. 만약 동기적으로 작동하는 자식프로세스가 필요하다면 child_process.spawnSync를 사용해야합니다.

nodejs에선 자식프로세스의 생성은 기본적으로 `spawn`을 통해 이루어지고, exec,fork등의 편의 함수도 내부적으론 `spawn`을 사용합니다.

### spawn 명세
`spawn` 함수의 명세부터 봅시다.

> child_process.spawn(command[,args][,options])

- command: string,실행할 명령입니다.
- args: string[], argument 배열입니다.
- options: object, 옵션이 들어있는 객체입니다.

spawn함수는 실행결과 `ChildProcess` 클래스 인스턴스를 반환합니다. `ChildProcess`클래스는 `EventEmitter`를 상속합니다. 자세한 내용은 글 후반에 다루겠습니다.

### spawn 옵션

옵션들을 알아봅시다. window os관련 옵션은 포함하지 않았으니 원본 문서를 참고하시길 바랍니다.

|옵션|타입|설명|
|--|--|--|
|cwd|string,URL|자식프로세스의 현재 작업 디렉토리를 결정합니다. default로 부모의 현재 작업 디렉토리를 상속받습니다. 만약 설정한 경로가 존재하지 않는다면 자식프로세스로부터 `ENOENT` 에러가 발생하고 즉시 종료됩니다. `ENOENT`는 command가 존재하지 않는 경우에도 발생합니다.| 
|env|Object|환경변수가 담긴 객체입니다. process.env를 default로 사용합니다.|
|argv0|string|argv[0]을 명시적으로 지정할 수 있습니다. 지정하지 않는다면 command가 argv[0]가 됩니다|
|stdio|Array,string|자식프로세스의 stdio에 대한 설정입니다.|
|detached|boolean|부모와 독립적으로 자식프로세스가 실행되도록 합니다|
|uid|number|자식프로세스의 uid를 설정합니다|
|gid|number|자식프로세스의 gid를 설정합니다|
|serialization|string|프로세스간 메세지 전달에 사용할 직렬화 방식을 선택합니다. `json`과 `advanced`를 사용할 수 있습니다. default는 `json`입니다.|
|shell|boolean,string|옵션값을 `true`로 준다면 쉘 위에서 command를 수행합니다. unix계열 os에선 `/bin/sh`를, window계열 os에선 `process.env.ComSpec`를 사용합니다. default는 false입니다.
|signal|AbortSignal|AbortSignal을 통한 자식프로세스 강제종료를 허용합니다.|
|timeout|number|자식프로세스에 밀리세컨드단위로 timeout을 설정할 수 있습니다. default는 undefined입니다.|
|killSignal|string,integer|자식프로세스가 timeout이나 abort로인해 종료될 경우 발생할 시그널을 설정합니다. default는 `SIGTERM`입니다|

#### argv0
macOS,Linux의 경우 `argv[0]`를 command로 사용하지만, Windows,SunOS의 경우 `command` 인자를 command로 사용합니다. nodejs에서 `argv[0]`은 자식프로세스의 시작과 동시에 process.execPath로 덮어 씌어집니다. 따라서 `argv0` 옵션의 값과 `process.argv[0]`은 일치하지 않습니다. 따라서 `argv0`를 사용하려면 `process.argv0`값을 사용해야합니다.

#### signal
`signal`옵션을 설정한 경우 `AbortController`를 통해 자식프로세스에 시그널을 전달할 수 있습니다. 

```js
const { spawn } = require('child_process');
const controller = new AbortController();
const { signal } = controller;
const grep = spawn('grep', ['ssh'], { signal });
grep.on('error', (err) => {
  // This will be called with err being an AbortError if the controller aborts
});
controller.abort(); // Stops the child process
```
{{<comment>}}signal 예제{{</comment>}}

위 예제와 같이 자식 프로세스를 abort시킬 수 있습니다.

#### detached
`detached` 옵션이 `true`로 설정된 경우 window와 window가 아닌 OS에서 동작이 다른데, window의 경우 부모프로세스가 종료되어도 자식프로세스가 종료되지 않고, 자식프로세스 자체 console창을 갖게 됩니다.

window가 아닌 경우(macOS,Linux등) 자식프로세스가 새 프로세스 그룹과 새 세션의 리더가 됩니다. 따라서 부모프로세스가 종료되어도 자식프로세스는 계속 실행될 수 있습니다. 

default로 부모프로세스는 detached된 자식프로세스가 종료되기를 기다립니다. 부모프로세스가 자식프로세스의 종료를 기다리지 않고 종료하게 만들기 위해선 자식프로세스에서 `unref()`함수를 사용합니다.(`subprocess.unref()`) `unref`함수는 부모프로세스의 event loop에 서 자식프로세스를 제외시킵니다. 따라서 부모-자식간 IPC 채널(파이프 등)이 존재하지 않는다면 부모는 자식의 종료여부와 상관없이 종료할 수 있습니다.

만약 부모프로세스의 종료와 별개로 자식프로세스가 계속 background에서 동작하게 하려면 부모프로세스와 stdio가 연결되어선 안됩니다. 따라서 자식프로세스가 부모프로세스의 stdio 파일 디스크립터를 상속하지 않게 `stdio`옵션을 설정해줘야합니다. 아래는 부모프로세스의 종료와 별개로 동작하는 자식프로세스를 생성하는 예제입니다.

```js
const { spawn } = require('child_process');

const subprocess = spawn(process.argv[0], ['child_program.js'], {
  detached: true,
  stdio: 'ignore'
});

subprocess.unref();
```
{{<comment>}}부모가 종료되어도 동작하는 자식프로세스 만들기{{</comment>}}

또는 자식프로세스의 stdio를 다른 파일 디스크립터로 설정해 동일한 효과를 낼 수 있습니다.
```js
const fs = require('fs');
const { spawn } = require('child_process');
const out = fs.openSync('./out.log', 'a');
const err = fs.openSync('./out.log', 'a');

const subprocess = spawn('prg', [], {
  detached: true,
  stdio: [ 'ignore', out, err ]
});

subprocess.unref();
```
{{<comment>}}부모가 종료되어도 동작하는 자식프로세스 만들기2{{</comment>}}

#### stdio
stdio옵션은 프로세스의 stdio 디스크립터를 설정해주는 옵션입니다. stdio는 default로 `['pipe','pipe','pipe']` 값을 가지는데, 이는 subprocess.stdin, subprocess.stdout, subprocess.stderr에 자식프로세스의 stdin,stdout,stderr를 pipe로 연결한다는 뜻입니다. (따라서 부모프로세스에서 subprocess.stdin.on 등의 방식으로 데이터를 받을 수 있습니다.) 

stdio 배열에 들어갈 수 있는 값은 다음이 있습니다.
1. `pipe` 자식프로세스와 부모프로세스간에 pipe를 생성합니다. 생성된 파이프는 `subprocess.stdio[fd]`를 통해 접근하거나 `subprocess.stdin`,`subprocess.stdout`,`subprocess.stderr`를 통해 접근할 수 있습니다.

2. `overlapped`: windowOS의 경우 FILE_FLAG_OVERLAPPED 플레그가 설정된 `pipe`와 같다고 하는데, 저는 winAPI를 잘 몰라서 넘어가겠습니다. windowOS가 아닌 다른 OS의 경우 그냥 `pipe`를 쓴 것과 같다고하네요. 

3. `ipc`: 부모 자식간에 IPC 채널을 생성합니다. `subprocess.send()`메소드를 통해 자식프로세스에 `message`이벤트를 발생시키거나 `subprocess.disconnect()`를 통해 IPC연결을 끊을 수 있고 자식프로세스에선 `process.send()`,`process.disconnect()`를 통해 같은 방식으로 IPC를 사용할 수 있습니다. ipc외에 다른 방법으로 IPC 채널 디스크립터에 접근할 수 없습니다. 

4. `ignore`: 파일 디스크립터를 `/dev/null`에 연결합니다. 즉, 입력을 무시합니다. `['ignore','ignore','ignore']`는 stdin,stdout,stderr를 모두 무시하겠다는 뜻이 되겠죠.

5. `inherit`: 부모의 stdin,stdout,stderr를 상속합니다. 즉 부모의 파일 디스크립터 0,1,2를 그대로 상속합니다. `['inherit','inherit','inherit']`는 `[process.stdin,process.stdout,process.stderr]`와 같은 뜻입니다.

6. Stream object : 스트림을 직접 전달할 수도 있습니다. 예를 들어, `stdin.txt`라는 파일을 열어 stdin으로 전달하면 자식프로세스의 stdin은 `stdin.txt`파일이 되는겁니다.

7. 양의 정수: 파일 디스크립터 수를 직접 전달할 수 있습니다. 0을 전달하면 부모프로세스의 stdin을 전달하는 것과 같은 의미가 되겠죠.

8. `null`,`undefined`: default값을 사용합니다. 0,1,2에 해당하는 파일디스크립터는 `pipe`로 생성될 것이고, 3 이상부터는 `ignore`로 설정됩니다.

배열의 길이는 꼭 3일 필요는 없습니다. 배열 인자가 5개라면 0~4까지의 자식프로세스 파일 디스크립터가 설정되는 것입니다.

stdio값은 배열 말고도 편의를 위해 string을 받을 수 있습니다.
- `pipe`: `['pipe','pipe','pipe']`와 같습니다.
- `overlapped`: `['overlapped','overlapped','overlapped']`와 같습니다.
- `ignore`: `['ignore','ignore','ignore']`와 같습니다.
- `inherit`: `['inherit','inherit','inherit']` 또는 `[0,1,2]`와 같습니다.

## exec
spawn으로 shell을 생성하고 지정한 명령을 shell을 통해 실행합니다. 주의할점은 POSIX system call의 `exec`처럼 부모 프로세스를 대체하는 자식프로세스를 생성하는 것이 아닙니다.
```js
const { exec } = require('child_process');

exec('"/path/to/test file/test.sh" arg1 arg2');
// Double quotes are used so that the space in the path is not interpreted as
// a delimiter of multiple arguments.

exec('echo "The \\$HOME variable is $HOME"');
// The $HOME variable is escaped in the first instance, but not in the second.
```
{{<comment>}}exec 예제{{</comment>}}
위는 간단한 exec 예제입니다. 

### exec 명세
> child_process.exec(command[, options][, callback])

- command: string, 실행할 명령입니다.
- options: Object, exec에 설정할 옵션들이 들어있는 객체입니다.
- callback: exec로 생성된 자식프로세스가 종료되면 실행할 callback함수입니다. (error,stdout,stderr)를 파라미터로 갖습니다.

exec는 실행 결과 spawn과 마찬가지로 ChildProcess를 반환합니다.

### exec 옵션

옵션은 spawn과 거의 유사합니다. 마찬가지로 windowOS관련 옵션은 뺐습니다.

|옵션|타입|설명|
|--|--|--|
|cwd|string,URL|자식프로세스의 현재 작업 디렉토리를 설정해줍니다. default는 process.cwd()와 같습니다.|
|env|Object|자식프로세스의 환경변수가 들어있는 객체입니다. default는 process.env와 같습니다.|
|encoding|string|stdout,stderr 출력값의 인코딩방식입니다. default는 utf8입니다.|
|shell|string|실행할 쉘을 지정합니다. default가 Unix계열에선 '/bin/sh'이고 window에선 process.env.ComSpec입니다.|
|signal|AbortSignal|자식프로세스를 강제종료(abort)할 때 사용할 AbortSignal 객체입니다.|
|timeout|number|자식프로세스의 실행시간이 timeout을 넘어가면 종료하도록 설정합니다. 단위는 millisecond이며 default는 0입니다.|
|maxBuffer|number|stdout,stderr의 버퍼 크기입니다. stdout,stderr에 버퍼크기를 초과하는 입력이 들어오면 자식프로세스가 종료되며 버퍼를 초과하는 부분이 잘립니다. default는 1024*1024byte입니다.|
|killSignal|string,integer|timeout,abort로 인해 종료될 때 발생시킬 signal입니다. default는 `SIGTERM`입니다.|
|uid|number|자식프로세스의 uid를 설정합니다.|
|gid|number|자식프로세스의 gid를 설정합니다.|

#### encoding
callback에 인자로 넘겨줄 stdout,stderr를 어떤방식으로 인코딩할지 결정하는 옵션입니다. utf8,base64등의 설정말고도 `'buffer'`값으로 설정할 수 있는데, 이 경우 stdout,stderr값이 string이 아닌 Buffer 객체가 됩니다.

#### timeout
timeout은 0보다 큰 값이 설정된 경우 timeout시간이 넘어가면 killSignal 옵션에 설정된 signal을 발생시킵니다.

#### signal
부모프로세스로부터 abort를 발생시킬 때 사용하는 옵션으로 사용법은 spawn과 같습니다.
```js
const { exec } = require('child_process');
const controller = new AbortController();
const { signal } = controller;
const child = exec('grep ssh', { signal }, (error) => {
  console.log(error); // an AbortError
});
controller.abort();
```

## execFile
execFile은 exec와 거의 유사합니다. 차이점은 default로 shell을 실행하지 않는다는 점입니다. shell이 필요하지 않다면 더 효율적인 선택지가 될 것입니다. 
```js
const { execFile } = require('child_process');
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
```
{{<comment>}}execFile 예제{{</comment>}}

### exec 명세
> child_process.execFile(file[, args][, options][, callback])

- file: string, 실행할 파일 이름입니다.
- args: string[], 전달할 arguments 배열입니다.
- options: Object, execFile에 설정할 옵션들이 들어있는 객체입니다.
- callback: execFile로 생성된 자식프로세스가 종료되면 실행할 callback함수입니다. (error,stdout,stderr)를 파라미터로 갖습니다.

execFile는 실행 결과 ChildProcess를 반환합니다.

### execFile 옵션

옵션은 execFile과 거의 유사합니다. exec와 겹치는 옵션은 빼고 달라지는 부분만 봅시다.

|옵션|타입|설명|
|--|--|--|
|shell|boolean,string|실행할 쉘을 지정합니다. default는 `false`이고, 쉘을 사용하지 않습니다. `true`로 설정된 경우 Unix는 '/bin/sh'를, window는 process.env.ComSpec를 shell로 지정합니다.|

#### execFile async 예제
util.promisify를 통해 async/await 문법을 사용할 수 있습니다.
```js
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
async function getVersion() {
  const { stdout } = await execFile('node', ['--version']);
  console.log(stdout);
}
getVersion();
```

## fork

```js
if (process.argv[2] === 'child') {
  setTimeout(() => {
    console.log(`Hello from ${process.argv[2]}!`);
  }, 1_000);
} else {
  const { fork } = require('child_process');
  const controller = new AbortController();
  const { signal } = controller;
  const child = fork(__filename, ['child'], { signal });
  child.on('error', (err) => {
    // This will be called with err being an AbortError if the controller aborts
  });
  controller.abort(); // Stops the child process
}
```
{{<comment>}}자기 자신의 클론을 생성하는 fork 예제{{</comment>}}
대망의 fork입니다. 다른 exec, spawn과 달리 nodejs 프로세스를 생성할 때 사용하며 부모프로세스와 IPC 채널이 자동으로 생성됩니다. 따라서 option설정 없이 `process.send`, `process.on('message',callback)`을 사용할 수 있습니다.  

POSIX system call의 fork와 달리 현재 프로세스의 클론을 생성하지 않습니다. 물론 modulePath를 `__filename`으로 설정하면 같은 프로그램이 실행됩니다. 다만, POSIX의 fork는 자식프로세스의 entry point가 fork가 실행된 위치라면, child_process.fork는 entry point가 맨 처음입니다.

spawn과 달리 shell을 설정할 수 없습니다.

### fork 명세

> child_process.fork(modulePath[, args][, options])

- modulePath: string, 자식프로세스로 실행할 모듈경로 입니다.
- args: string[], arguments 배열입니다.
- options: 옵션이 들어있는 객체

반환값은 ChildProcess입니다.
### fork 옵션

|옵션|타입|설명|
|--|--|--|
|cwd|string,URL|자식프로세스의 현재 작업 디렉토리를 설정합니다.|
|detached|boolean|부모프로세스와 별개로 작동하게 하려면 true로 설정합니다.|
|env|Object|자식프로세스의 환경변수가 들어있는 객체입니다.|
|execPath|string|자식프로세스 생성에 사용된 파일 경로입니다.|
|execArgv|string[]|자식프로세스 생성에 사용된 arguments들입니다. `--harmony`등이 있겠죠|
|gid|number|프로세스의 그룹아이디를 설정합니다.|
|uid|number|uid를 설정합니다.|
|serialization|string|프로세스간 message 전송에 사용할 직렬화 방식을 설정합니다. `json`과 `advanced`를 사용할 수 있으며, default는 `json`입니다.|
|signal|AbortSignal|자식프로세스를 강제종료 시킬때 사용하는 AbortSignal을 설정합니다.|
|killSignal|string,integer|timeout 또는 abort로 종료될 때 사용할 signal을 설정합니다. default는 `SIGTERM`입니다.|
|silent|boolean|`true`로 설정되면 자식프로세스의 stdin,stdout,stderr를 부모프로세스의 `pipe`로 연결합니다. 나머지 파일 디스크립터는 부모로부터 `inherit`(상속)됩니다. default는 false입니다.|
|stdio|Array,string|자식프로세스의 파일 디스크립터를 설정합니다. stdio가 설정되면 slient 옵션을 덮어씁니다. 한 개의 `'ipc'` 값이 포함되어야 하며, 그렇지 않으면 에러가 발생합니다. 예를 들어 stdio를 `[0,1,2,'ipc']`로 설정할 수 있습니다.|
|timeout|number|설정한 시간이 지나면 프로세스를 종료시킵니다. default는 `undefined`입니다.|

### 동기 방식의 자식프로세스는 다루지 않았습니다.
execFileSync,execSync,spawnSync라는 동기방식의 자식프로세스를 만드는 함수도 있지만, 여기선 다루지 않겠습니다. 동기방식으로 프로세스를 생성하는건 nodejs의 방향과 어긋난다고 봅니다. 필요하다면 원본글을 직접 참고해주세요.

## ChildProcess 클래스
spawn, exec, fork 등의 자식프로세스 생성 함수들이 실행시 반환하는 객체입니다. `EventEmitter`를 상속하며 따라서 자식프로세스가 발생시키는 이벤트에 대응할 수 있습니다.

```js
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
});

ls.on('exit', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

### `close` 이벤트

#### callback 파라미터 
- code : number, 자식프로세스의 종료 코드
- signal : string, 종료 시그널

자식프로세스가 `exit` 이벤트를 발생시키고 종료하게되면 `close`이벤트가 발생합니다.

### `disconnect` 이벤트
부모프로세스에서 `subprocess.disconnect()` 또는 자식프로세스에서 `process.disconnect()`가 발생하게되면 `disconnect` 이벤트가 발생합니다. 이 이벤트가 발생하고 나면 더이상 프로세스간 메세지를 주고 받을 수 없으며 `subprocess.connected`가 `false`로 바뀝니다.

### `error` 이벤트
다음의 경우 `error`이벤트가 발생합니다.

1. 자식프로세스 생성에 실패한 경우
2. 프로세스에 signal을 보내는데 실패한 경우
3. 자식프로세스에게 message를 보내는데 실패한 경우

`error`이벤트가 발생한 후엔 `exit`이벤트가 발생할 수도 발생하지 않을 수도 있습니다.

### `exit` 이벤트

#### callback 파라미터 
- code : number, 자식프로세스의 종료 코드
- signal : string, 종료 시그널

`exit`이벤트가 발생했을 때도 child process의 stdio stream은 열려있습니다. 

### `message` 이벤트

#### callback 파라미터 
- message : Object, 전달받은 JSON 객체
- sendHandle : Handle, net.Socket 또는 net.Server 객체 또는 undefined

`message`이벤트는 자식프로세스가 `process.send()`를 통해 메세지를 보낸 경우 발생합니다. 메세지는 직렬화(serialization) 되고 parsing되어 전달됩니다. 만약 serialization 옵션을 `'advanced'`로 줬다면 message는 JSON으로 표현 불가능한 데이터도 담을 수 있습니다.

### `spawn` 이벤트

`spawn`이벤트는 자식프로세스가 성공적으로 생성되었을 때 딱 한번 발생합니다. 자식프로세스 생성에 실패한다면 `spawn`이 아니라 `error`이벤트가 발생합니다. `spawn` 이벤트는 자식프로세스가 생성되기만 하면 발생하기 때문에 만약 `bash some-command`를 실행하는 자식프로세스를 생성했다면 `some-command`실행에 실패하더라도 `spawn`은 발생합니다.

### subprocess.channel 속성
subprocess.channel은 자식프로세스와 이어지는 IPC 파이프를 가리키는 객체입니다. 만약 IPC 연결이 없다면 channel은 `undefined`일 것입니다.

#### subprocess.channel.ref()
`.unref()`를 앞서 실행한 경우 다시 IPC 채널이 부모 프로세스의 이벤트 루프를 유지하도록 만들어줍니다.

#### subprocess.channel.unref()
IPC 채널이 부모 프로세스의 이벤트 루프를 유지하지 않게 만듦니다. 이 경우 채널이 열려있든 말든 부모 프로세스가 종료될 때가 되면 부모프로세스가 종료됩니다.

### subprocess.connected 속성
자식프로세스와의 연결이 유지되고 있는지 나타내는 속성입니다. `subprocess.disconnect()`를 실행하면 `false`가 됩니다.

### subprocess.disconnect 메소드
자식프로세스와의 IPC 연결을 끊습니다.

### subprocess.exitCode 속성
정수값으로, 자식프로세스의 종료 코드를 저장합니다. 자식프로세스가 종료되지 않았다면 null값을 가집니다.

### subprocess.kill([signal]) 메소드

시그널을 발생시킵니다. number(시그널 번호)또는 string(시그널 이름)을 인자로 전달할 수 있고 signal 전달 성공여부를 반환합니다. arguments를 주지 않는다면 `SIGTERM` 시그널이 발생됩니다. 

```js
const { spawn } = require('child_process');
const grep = spawn('grep', ['ssh']);

grep.on('close', (code, signal) => {
  console.log(
    `child process terminated due to receipt of signal ${signal}`);
});

// Send SIGHUP to process.
grep.kill('SIGHUP');
```

{{<comment>}}시그널 발생 예제{{</comment>}}

### subprocess.killed 속성
자식프로세스가 시그널을 성공적으로 전달받았는지 여부가 저장됩니다.

### subprocess.pid 속성
자식프로세스의 pid가 저장됩니다. 자식프로세스 생성에 실패했다면 undefined가 저장됩니다.

### subprocess.unref() 메소드
부모프로세스는 자식프로세스가 종료되기를 기다립니다. 만약 자식프로세스에서 `unref()`를 실행한다면 부모프로세스는 자식프로세스의 종료를 기다리지 않습니다.

### subprocess.ref() 메소드
만약 `unref()`를 실행해 부모가 자식프로세스의 종료를 기다리지 않게된 상황이라면 다시 부모가 자식프로세스의 종료를 기다리도록 만듦니다. 

### subprocess.send(message[,sendHandle[,options]][,callback])

#### 파라미터
- message : Object, 전달할 메세지 객체
- sendHandle : Handle, 전달할 TCP 객체
- options: Object, sendHandle을 설정한 경우 keepOpen 옵션을 설정해줄 수 있는데 keepOpen은 true로 설정된 경우 자식프로세스에게 소켓을 전달하는 경우 net.Socket의 연결을 유지합니다.
- callback: Function, 콜백함수
반환값은 전달 성공 여부(boolean)입니다.

부모-자식 간의 IPC 채널이 존재한다면 사용할 수 있습니다. 자식프로세스에게 메세지를 보냅니다. 자식프로세스에선 `message`이벤트가 발생합니다.

sendHandle은 자식프로세스에게 TCP 서버 또는 소켓 객체를 전달할 때 사용됩니다. 자식 프로세스는 sendHandle로 전달된 객체를 `message` 이벤트의 콜백함수의 두 번째 파라미터로 전달받습니다. message는 직렬화되어 전달되기 때문에 자식프로세스에게 tcp 서버 또는 소켓 객체를 직렬화하지 않고 전달하기 위해 사용합니다. sendHandle을 통해 부모와 자식이 같은 TCP 서버, 소켓 객체를 공유할 수 있습니다. 

### subprocess.signalCode 속성
자식프로세스에서 시그널이 발생한 경우 시그널 번호가 signalCode로 설정됩니다. 발생한 시그널이 없다면 null입니다.

### subprocess.spawnargs 속성
자식프로세스 실행에 사용된 command-line arguments 배열입니다.

### subprocess.spawnfile 속성
자식프로세스 실행에 사용된 실행 파일 이름입니다. 

### subprocess.stderr 속성
streamm.Readable, 자식프로세스의 stderr와 연결된 스트림입니다. subprocess.stdio[2]와 같습니다.

### subprocess.stdin 속성
streamm.Readable, 자식프로세스의 stdin와 연결된 스트림입니다. subprocess.stdio[0]와 같습니다.

### subprocess.stdout 속성
streamm.Readable, 자식프로세스의 stdout와 연결된 스트림입니다. subprocess.stdio[1]와 같습니다.

### subprocess.stdio 속성
`'pipe'`로 설정된 자식프로세스의 파일 디스크립터 배열입니다.

### 마치며

정리하고보니 몹시 길군요. 다음글은 cluster나 process객체에 대해 다루지 싶습니다.

## 참고한 사이트
https://nodejs.org/api/child_process.html