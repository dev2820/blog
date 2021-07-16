+++
title= "nodejs의 Cluster"
date= 2021-07-16T13:18:33+09:00
categories= ["study"]
subcategories = ["web"]
tags= ["study","컴퓨터 기술","공부정리","web","cluster","nodejs"]
cover= ""
icon = "study/computer_science_icon.png"
draft= true
+++

https://nodejs.org/api/cluster.html
위 링크를 바탕으로 제작한 글입니다. 번역 위주이지만 사설들도 섞여있습니다. 잘못된 부분/오타는 지적부탁드립니다.

16.5.0 버전을 기준으로 작성되었습니다.

## 햇갈릴까봐 미리 설명하는 내용

컴퓨터를 살때 CPU 스펙을보면 4코어 4스레드, 8코어 16스레드 등등 코어와 스레드 수가 적혀있습니다. CPU는 공장, 코어는 노동자, 스레드는 동시에 실행할 수 있는 명령의 수 라고 생각하면 됩니다. 즉, 8코어 16스레드 CPU는 공장에 8명의 노동자(코어)가 있고, 동시에 최대 16개의 작업을 할 수 있다는 뜻입니다.   

## nodejs는 싱글스레드
nodejs 프로그램은 싱글스레드로 동작합니다. 정확히는 이벤트 루프가 싱글스레드이죠. nodejs로 웹서버를 만들었다고 합시다. 서버는 8코어 16스레드라고 가정하죠. 이 경우 웹서버가 싱글스레드로 돌아가서 7코어는 놀아버립니다. 일하는 1코어는 다른 7코어가 밉고, 서버의 주인인 우리도 16개의 작업을 할 수 있는데 1개의 작업만 하는게 썩 마음에 들지 않습니다. 그래서 여러개의 프로세스를 만들어 각각 이벤트 루프가 돌아가도록 만들고 싶어 합니다. 그럴때 필요한 것이 **cluster**입니다. cluster는 쉽게 멀티프로세스를 생성해주는 모듈입니다. worker라고 하는 자식프로세스를 만들고 자식프로세스를 감독합니다. 일종의 공장 관리인인 샘이죠.

## child_process 와 cluster
이전글로 nodejs의 'child_process' 모듈에 대해 다뤘는데, child_process도 마찬가지로 자식프로세스를 생성하는 모듈입니다. 그럼 cluster와는 어떤 차이가 있을까요. 

사실 cluster는 내부적으로 child_process를 이용합니다. cluster.fork는 최종적으로 child_process.fork를 호출하죠. 한가지, 중요한 특징으로 cluster는 같은 포트를 공유한다는 점입니다. 

아래는 cluster의 간단한 예시입니다.

## 용도
위에서 예시를 든 것처럼 보통 서버를 생성할 때 노는 코어를 줄여 효율성을 높이기 위해 사용합니다. 

```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const process = require('process');

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```
{{<comment>}}cluster 예제{{</comment>}}
만약 16.5.0 버전 이전의 nodejs를 사용하시는 분은 `isPrimary`가 존재하지 않아 정상적으로 작동하지 않을 겁니다. isMaster가 isPrimary로 바뀌었거든요. 16.5.0 이전 버전 유저라면 isPrimary를 isMaster로 바꿔주면 작동합니다.

위 예제는 컴퓨터의 cpu수 만큼(6코어 12스레드라면 12개 만큼) 자식프로세스를 생성하고 각 자식프로세스는 8000번 포트를 사용하는 웹서버를 실행하는 예제입니다. 

fork를 실행하는 부모프로세스를 primary(또는 master), 자식프로세스를 worker라고 합니다. primary는 worker와 IPC로 연결됩니다.

주의할 점은, cluster.fork는 POSIX의 system call인 fork처럼 `fork()`가 실행된 순간을 기점으로 자식프로세스가 분기되는 것이 아닙니다. fork가 실행되면 자식프로세스가 생성되고, 자식프로세스는 **프로그램의 맨 처음부터 다시실행됩니다.** `child_process.fork`를 이용하기 때문에 그런 결과가 나오는 것이겠죠. 따라서 위 예제에서도 모듈을 import 하고 바로 `if`문으로 감싸주고 있습니다. 

{{<figure-img src="images/클러스터예제1.png" alt="nodejs cluster">}}
내 컴퓨터로 실행한 예제 결과
{{</figure-img>}}

제 컴퓨터는 12스레드라 12개의 worker가 생성되었네요. 

## Worker 클래스

`cluster.fork()`시 생성되는 Worker 객체입니다.(cluster.fork()의 반환값) EventEmitter를 상속하며 primary 프로세스에선 `cluster.workers`를 통해, worker 프로세스에선 `cluster.worker`를 통해 접근할 수 있습니다.

#### worker.disconnect() 메소드
해당 worker에 `close` 이벤트를 기다리는 모든 서버를 닫고 primary와의 IPC를 닫습니다. `.exitedAfterDisconnect`가 설정됩니다. worker 내부에서 process.disconnect를 실행하는 것과는 다릅니다. (물론 process.disconnect를 실행해도 `disconnect`이벤트는 발생합니다)

#### worker.exitedAfterDisconnect 프로퍼티
worker가 `.kill()`, `.disconnect()` 함수를 통해 종료되는 경우 worker 클래스의 인스턴스 `exitedAfterDisconnect`가 `true`로 설정됩니다. 다른 이유로 worker가 종료되면 `false`로 설정됩니다. 대충 정상종료하면 true로 설정되는 거죠. 

#### worker.id 프로퍼티
생성된 worker들엔 유니크한 아이디가 붙는데, `id` property에 그 아이디가 저장됩니다. 이 아이디를 통해 primary에서 cluster.workers[id]로 특정 worker에 접근할 수 있습니다.

#### worker.isConnected() 메소드
특정 work의 IPC 채널이 연결되어 있다면 `true`를 반환하고 연결되어있지 않은 경우 `false`를 반환합니다. `worker.disconnect()`를 실행하면 `isConnected()`는 false를 반환합니다.

#### worker.isDead() 메소드
worker가 종료되었다면 `true`를 반환합니다.

#### worker.kill([signal]) 메소드
worker 프로세스에 signal을 전달하고 worker를 종료시킵니다. default는 `'SIGTERM'`을 전달합니다. `process.kill()`과는 다릅니다. `process.kill`은 signal을 전달하는거고, `worker.kill`은 시그널을 전달하고 worker를 종료시킵니다.

#### worker.process 프로퍼티
worker 프로세스가 들어있습니다. child_process.fork()실행 결과 생성된 프로세스가 worker.process에 들어있습니다.

#### worker.send() 메소드
worker에게 메세지를 전달할 수 있습니다. 자식프로세스에 IPC 연결이 되어있기 때문에 가능한데, child_process에 내용을 정리해놔서 여기서는 설명은 패스하고 예제만 놓고 넘어가겠습니다.

```js
if (cluster.isPrimary) {
  const worker = cluster.fork();
  worker.send('hi there');

} else if (cluster.isWorker) {
  process.on('message', (msg) => {
    process.send(msg);
  });
}
```
## cluster 

#### cluster.disconnect([callback]) 메소드
cluster.workers의 모든 worker에서 disconnect를 호출합니다. 모든 worker가 disconnected되면 callback을 실행합니다. 이 메소드는 primary에서만 호출할 수 있습니다.

#### cluster.fork([env])
worker를 생성합니다. env는 자식프로세스의 환경변수입니다. 

#### cluster.isPrimary 프로퍼티
현재 프로세스가 primary인지 판별하는 프로퍼티입니다. 현재 프로세스가 primary이면 true 입니다. 원래 isMaster로 판별했는데... 아마 github에서 master branch를 main branch로 바꾼 것과 같은 이유로 isPrimary로 바꾼 것 같습니다. isMaster 프로퍼티도 여전히 존재하지만, Deprecated alias라고 설명이 붙은걸 봐서 추후 사라지지 않을까 싶네요. 그니까 isPrimary 쓰세요

#### cluster.isWorker 프로퍼티
현재 프로세스가 worker이면 true입니다.

#### cluster.schedulingPolicy 프로퍼티
cluster는 기본적으로 round-robin(시분할) 방식으로 worker를 실행합니다. 다만 window의 경우 libuv가 

#### cluster.settings 프로퍼티
.setupPrimary 함수를 실행할 때 이 settings가 변경되는데 이 settings의 프로퍼티를 통해 worker가 설정됩니다. 설정할 수 있는 내용은 많은데 귀찮아요 직접확인하세요.

https://nodejs.org/api/cluster.html#cluster_cluster_isprimary

#### cluster.setupPrimary([settings]) 메소드
얘도 setupMaster에서 setupPrimary로 이름이 바뀌었습니다.
settings를 바꿔주는 메소드입니다.


예제를 보면 이해가 빠를 것 같아서 예제만 올립니다.

```js
const cluster = require('cluster');

cluster.setupPrimary({
  exec: 'worker.js',
  args: ['--use', 'https'],
  silent: true
});
cluster.fork(); // https worker
cluster.setupPrimary({
  exec: 'worker.js',
  args: ['--use', 'http']
});
cluster.fork(); // http worker
```

#### cluster.worker 프로퍼티
worker 프로세스의 경우 cluster.worker를 통해 현재 실행중인 worker에 접근할 수 있습니다. primary에선 사용할 수 없습니다.

#### cluster.workers 프로퍼티
primary에선 모든 worker에 접근할 수 있는 workers 객체가 있습니다. id로 각 worker에 접근할 수 있습니다. worker에선 접근할 수 없습니다.

## Worker 클래스와 Cluster의 이벤트
자식프로세스에서 이벤트가 발생하면 worker 인스턴스에서 이벤트를 감지하거나 Cluster 인스턴스에서 이벤트를 감지할 수 있습니다. 아래 `disconnect` 이벤트를 살펴보면서 자세히 알아봅시다.
#### `disconnect` 이벤트와 이벤트 리스너
worker의 IPC 연결이 끊어지면 `disconnect`이벤트가 발생합니다. `disconnect`이벤트는 `worker.disconnect()`를 사용한 경우, worker가 정상종료하거나 비정상종료한 경우 발생합니다.

이전 예제를 조금 변형해보죠.

```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const process = require('process');

if (cluster.isMaster) {
  console.log(`Primary ${process.pid} is running`);
  for (let i = 0; i < 2; i++) { //2개의 worker 생성
    cluster.fork();
  }
  cluster.on('disconnect',(worker)=>{//연결이 끊어진 worker 전달
    console.log('disconnected: ',worker.process.pid)
  })
} else {
  process.disconnect();//worker에서 disconnect
  console.log(`Worker ${process.pid} started`);
}
```
위 예제는 primary에서 특정 worker의 `disconnect`를 감지하는 예제입니다. 발생한 `disconnect`이벤트를 cluster에서 이벤트리스너를 통해 처리해주고 있습니다. cluster에서 이벤트 리스너가 실행되는 경우 worker 파라미터를 전달받는데, `disconnect`가 발생한 worker 클래스 인스턴스가 전달됩니다. 

실행 결과 입니다.
```bash
$ node node_example1.js 
Primary 10896 is running
Worker 7828 started
disconnected:  7828
Worker 12188 started
disconnected:  12188
```

특정 worker를 대상으로 이벤트 리스너를 달아줄 수도 있습니다.
```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const process = require('process');

if (cluster.isMaster) {
  console.log(`Primary ${process.pid} is running`);
  for (let i = 0; i < 2; i++) { //2개의 worker 생성
    cluster.fork().on('disconnect',()=>{//각 worker에 이벤트 리스너 등록
        console.log('disconnected: ',process.pid)
    });
  }
} else {
  process.disconnect();//worker에서 disconnect
  console.log(`Worker ${process.pid} started`);
}
```

worker가 종료될 때 `disconnect`이벤트가 발생하고 `exit` 이벤트가 발생하는데 `disconnect`만 발생하고 `exit`가 발생하지 않는다면 자식프로세스 종료에 문제가 생겼음을 알 수 있습니다.

`cluster.worker`를 통해 worker 내부에서도 worker에 접근할 수 있기 때문에 worker 내부에서 이벤트 리스너를 달아줄 수 있습니다. 

```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const process = require('process');

if (cluster.isMaster) {
  console.log(`Primary ${process.pid} is running`);
  for (let i = 0; i < 2; i++) { //2개의 worker 생성
    cluster.fork();
  }
  
} else {
  cluster.worker.on('disconnect',(worker)=>{
    console.log(worker.process.pid);
  })
  cluster.worker.disconnect();
}
```

#### `error` 이벤트

worker 생성 실패 또는 worker에 시그널 전달을 실패한경우, 메세지 전송에 실패한 경우 `error` 이벤트가 발생합니다.

#### `exit` 이벤트
worker가 종료되면 발생합니다. 2개의 파라미터가 이벤트 리스너에 전달되는데, 하나는 `code`,하나는 `signal`입니다. `code`는 종료코드, `signal`은 프로세스 종료 signal이 존재한다면 `signal`을 전달합니다.
```js
const cluster = require('cluster');

const worker = cluster.fork();
worker.on('exit', (code, signal) => {
  if (signal) {
    console.log(`worker was killed by signal: ${signal}`);
  } else if (code !== 0) {
    console.log(`worker exited with error code: ${code}`);
  } else {
    console.log('worker success!');
  }
});
```
`cluster.on('exit',(worker,code,signal)=>{})`을 통해 worker가 종료되면 다시 실행하는 용도로도 사용합니다.

```js
cluster.on('exit', (worker, code, signal) => {
  console.log('worker %d died (%s). restarting...',
              worker.process.pid, signal || code);
  cluster.fork();
});
```

공식문서에 나와있는 예제코드 입니다. `disconnect`예시에서 그러했듯, `cluster.on('exit',(worker,code,signal)=>{})`를 사용할 수도 있습니다.

#### `listening` 이벤트

worker에서 `listen()`함수를 실행하면 발생하는 이벤트입니다. (ex. http.Server.listen()) `cluster.on('listening',(worker,address)=>{})` 를 이용할 수도 있지만 특정 worker를 지정해 리스너를 달아줄 수도 있습니다.

`address` 파라미터를 이벤트 리스너에 전달하는데, 이 파라미터는 객체로 address(listen중인 주소), port(listen중인 포트), addressType(TCPv6 라면 6)을 property로 가집니다.
```js
const cluster = require('cluster');
cluster.fork().on('listening',(address)=>{
    //
})
```

#### `message` 이벤트
worker에서 `process.send()`를 통해 primary에 메세지를 전달할 때 발생하는 이벤트입니다. 마찬가지로 특정 worker를 지정해 리스너를 달아줄 수 있습니다.

```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const process = require('process');

if (cluster.isMaster) {
  console.log(`Primary ${process.pid} is running`);
  for (let i = 0; i < 2; i++) { //2개의 worker 생성
    cluster.fork().on('message',(msg,handle)=>{//각 worker에 이벤트 리스너 등록
        console.log('message: ',msg)
    });
  }
} else {
  process.send('message from worker');
}
```

실행결과
```bash
$ node node_example1.js
Primary 1292 is running
message:  message from worker
message:  message from worker
```

handle 파라미터는 worker에서 생성된 net.Socket, net.Server 등을 전달할 때 사용합니다.

#### `fork` 이벤트
새 worker가 생성되면 발생하는 이벤트입니다. `cluster.fork()`를 실행하면 `fork`이벤트가 발생합니다. 이 이벤트는 worker에선 감지할 수 없습니다. 

#### `online` 이벤트
새 worker를 생성되어 동작할때 발생하는 이벤트입니다. `fork`와 `online`의 차이점은 `fork`이벤트는 primary에서 fork()를 실행할 때 발생하고, `online`이벤트는 fork()로 생성된 worker가 동작할 때 발생하는 이벤트입니다.

#### `setup` 이벤트
`cluster.setupPrimary()`를 실행하면 발생하는 이벤트입니다. 

## 마치며
또 많이 기네요. 아마 다음엔 os 모듈을 정리하는 글이 되지 않을까 싶습니다. 이런 긴거 한번 하면 피곤해서 담엔 짧은거 할라구요...