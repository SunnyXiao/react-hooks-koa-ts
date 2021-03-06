// 对于项目中常用到的接口数据对象，在types/目录下定义好其结构化类型声明
declare namespace nFang {
  interface IhouseData {
    _id: string;
    __v?: number;
    area: string;
    beginTime: string;
    endTime: string;
    name: string;
    number: number;
    status: string;
  }

  interface Ianalytics {
    routerName: string;
    createdTime?: Date;
  }

  // 和client constants 目录保持一致
  interface IareaHouse {
    区域: string;
    房源数: number;
  }

  interface IareaBuilder {
    区域: string;
    楼盘数: number;
  }

  interface IcircleItem {
    date: string;
    item: string;
    number: number;
    percent: number;
  }

  interface IuserItem {
    _id: string;
    name: string,
    password: string,
    pin: number,
    status: number,
    lastLoginAt: Date,
    createdAt: Date
  }
}
