'use strict';
var http = require('http');
var https = require('https');

let loadSource = (url)=>{
    return new Promise(resolve => {
        //http跟https要分开处理
        (url.startsWith('https') ? https : http).get(url,res=>{
            resolve(res);
        })
    });
};

var sleep = (time) => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve('9527');
        },time);
    });
};

//代理本地资源, 将资源置于/public目录下即可.
var localResource = function* () {
    this.params.url = `http://${this.get('host')}/${this.params.file}`;
    yield onlineResource.apply(this);
};

//代理在线资源, 比如cdn上的脚本.
var onlineResource = function* () {
    let {url, delay} = this.params;  //url会自动decode

    let source = (yield [loadSource(url), sleep(delay || 1000)])[0];

    this.set(source.headers);

    return this.body = source;
};

module.exports.register = function (router) {
    router.get('/local/:file/:delay', localResource);
    router.get('/online/:url/:delay', onlineResource);
};