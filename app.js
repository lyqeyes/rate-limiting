/**
 * @Creator: eyes
 * @Date: 1/5/18
 */
'use strict';
const path = require('path');
const koa = require('koa');
const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const controller = require('./router');

const app = koa();

app.use(bodyParser());
app.use(serve(path.join(__dirname, 'public')));
app.use(compress());
app.use(logger());

controller.register(app);

app.listen(8080,()=>{
    console.log('listening on port 8080');
});
