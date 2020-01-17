import config from './config/index'
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const log4js = require('log4js')
var cors = require('koa2-cors');


import api from './api/index';

const app = new Koa()


app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}))
