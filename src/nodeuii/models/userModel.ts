import log4js from 'log4js';
import DbHelper from '../utils/dbHelper';
const bcrypt=require('bcrypt')

const mongoose = DbHelper.connect();
const logger = log4js.getLogger('globallog');
const ObjectId = DbHelper.ObjectId

// 创建数据库
const UserSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    unique:true
  },
  name: {
    type: String,
    unique:true,
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
  status: {
    type: Number,
    default: 1
  },
  // 上一次登录时间
  lastLoginAt: {
    type: Date,
    default: Date.now()
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.pre('save', function(next) {
  let user = this
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err)
    }
    user.password=hash
    console.log('user:', user)
		next()
  })
})

// 创建表
const UserCol = mongoose.model('user', UserSchema);

const userModel = {
  /**
   * 新增用户
   * @param user
   */
  async add (user: nFang.IuserItem): Promise<object | nFang.IuserItem> {
    let result: object | nFang.IuserItem = user
    const findUser = await this.find({name: user.name})
    if (findUser.length > 0) {
      result = {code: 400, msg: '用户已存在'}
      throw new Error('用户已存在')
    } else {
      const nUser = new UserCol(user)
      nUser._id = ObjectId()
      result = await new Promise((resolve, reject) => {
        nUser.save((err, data) => {
          if(err) {
            logger.error(JSON.stringify(err));
            reject( {code: 500, msg: '数据错误'});
            throw new Error(JSON.stringify(err))
          } else {
            resolve(data)
          }
        })
      })
    }
    return result;
  },

  find(query?: object): nFang.IuserItem[] {
    return (UserCol.find(query, err => {
      if (err) {
        logger.error(JSON.stringify(err));
      }
    }) as unknown) as nFang.IuserItem[];
  }
}

export default userModel
