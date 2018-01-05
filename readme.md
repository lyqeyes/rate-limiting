#### 0 概述
适用于需要控制资源加载耗时的场景:
* 模拟某资源加载时间很长对功能可用性的影响
* 模拟多个资源按照不同顺序加载. 让A先于B or 让B先于A
* ...... 

代理本地资源会自动识别格式并添加content-type等Response Header信息。
<br/>
<br/>
代理线上资源会**透传原url的Response Header**。


#### 1 启动
*notice: 依赖node*

```

git clone git@github.com:lyqeyes/rate-limiting.git

cd rate-limiting

npm run i

npm start

```

#### 2 在线文件代理
notice: 必须是decoded的url.

```

 代理地址path  /online/:url/:delay
 
 参数url: urlencoded url

 参数delay: 期望的延迟加载的时间(ms)
 
 示例, 2s后加载某cdn脚本:
 
 http://127.0.0.1:8080/online/https%3A%2F%2Fcdn.bootcss.com%2Freact%2F16.2.0%2Fcjs%2Freact.development.js/2000

```


#### 3 本地文件代理
用法, **需将本地文件放置在/public目录下**, 例如/public下已经有的demo.js文件, 然后按照如下说明使用.

```

 代理地址path  /local/:file/:delay
 
 参数file: /public目录下的文件名, 比如 demo.js

 参数delay: 期望的延迟加载的时间(ms)
 
 示例, 1s后加载本地demo.js文件(/public目录下):
 
 http://127.0.0.1:8080/local/demo.js/1000

```

#### 4 效果图
![示例图](https://github.com/lyqeyes/images/blob/master/rate-limiting/timing.png?raw=true)
上图Timing信息显示, 该js文件在2.01s后开始加载.
