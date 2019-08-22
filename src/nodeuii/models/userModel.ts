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

// 创建表
const UserCol = mongoose.model('user', UserSchema);

const userModel = {
  /**
   * 新增用户
   * @param user
   */
  async add (user: nFang.IuserItem): Promise<boolean | nFang.IuserItem> {
    let result: boolean | nFang.IuserItem = user
    const findUser = await this.find({name: user.name})
    if (findUser.length > 0) {
      result = false
    } else {
      const nUser = new UserCol(user)
      result = await new Promise(resolve => {
        nUser.save(err => {
          if(err) {
            logger.error(JSON.stringify(err));
            resolve(false);
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
