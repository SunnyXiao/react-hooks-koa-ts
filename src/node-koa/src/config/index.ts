const mongoDBHost =
  process.env.BUILD_ENV === 'docker'
    ? 'mongodb://database/test'
    : 'mongodb://localhost/test';

export default {
  spiderDomain: 'http://zw.cdzj.chengdu.gov.cn',
  serverPort: 6068,
  // 和 docker-compose 里的 mongo 容器相对应
  databaseUrl: mongoDBHost,
  /** json web token */
  jwt: {
    /** 加密密钥 */
    secret: '0b3882c9-eede-45aa-afa7-bfca422f4afc',
    /** 过期时间 */
    expressIn: 24 * 60 * 1000
  },
  /** 客户端相关 */
  client: {
    /** 客户端 key */
    appkey: '7dac0dda-b089-46ed-80b2-160a6c9a7aad',
    /** 客户端 token */
    token: '21d700e0-4c58-488d-933d-3a2a61b1a192'
  },
  // 跨域资源共享配置
  cors: {
    // 允许的域名
    allowOrigins: [
      'http://localhost:6067'
    ]
  },
  // 路径配置
  PATH:{
    UPLOAD_PATH:"public/upload"
  }
};
