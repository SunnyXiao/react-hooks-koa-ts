import log4js from 'log4js';
import DbHelper from '../utils/dbHelper';

const mongoose = DbHelper.connect();
const logger = log4js.getLogger('globallog');

// 创建数据库
const UserSchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    require: [true, '必须提供用户名'],
    min: [6, '用户名必须有6个字符以上'],
    max: [50, '用户名不能超过50个字符'],
    trim: true
  },
  password: {
    type: String,
    required: [true, '必须提供密码'],
    min: [6, '密码必须有6个字符以上'],
    trim: true
  },
  pin: {
    type: Number,
    required: [true, '必须提供pin'],
    trim: true
  },
  // 上一次登录时间
  lastLoginAt: {
    type: Date
  }
});

// 创建表
const userCol = mongoose.model('user', UserSchema);
