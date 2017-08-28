# F2B node web server

F2B 기술과제 

# Pre Configuration
```
* node version >= 4.x
nodejs, express, handlebars(server), bootstrap
--> package.json dependency 확인
```

## Installation & StratUp

```
> git clone git@github.com:EdenMellon/F2B.server.git f2b
> cd f2b/
> npm install

> node bin/www
(nodemon 혹은 pm2 사용가능)
```
## meellon-request install error 발생할
> 에러 처리 방법
```
1. 원인:
 - custom module 인 meellon-request 가 npm install 시 ssh-key 문제로 인하여
 git+ssh install 불가함
2. 수동빌드:
 > git clone git@github.com:EdenMellon/node_module.request.git meellon-request
 > node_modules/meellon-request 연결(copy 혹은 symbolic link)
```

## Configuration
```
### Port
* Default port: 3030
* Port 변경: ./config/default.json

***
config@1.26.2 module 사용
NODE_ENV 설정으로 ***.json 매핑 사용 가능 
***
```

## TODO
```
node version 6.11.2 사용
ES6로 컨버팅
meellon-request 고도화 (현재 header설정을 할수 없음)
```

