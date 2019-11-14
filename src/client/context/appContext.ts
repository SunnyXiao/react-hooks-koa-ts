/**
 * When to Use Context
 * Context is designed to share data that can be considered “global” for a tree of React components,
 * such as the current authenticated user, theme, or preferred language.
 */
import * as React from 'react';

export interface IappContext {
  allData: nFang.IhouseData[];
  activityKey: string;
  selectedYear: number;
  isLoading: boolean;
  userName: string;
  changeUserName (name: string): void;
  changeData(data: nFang.IhouseData[]): void;
  changeActivityKey(key: string): void;
  changeSelectedYear(key: number): void;
  changeLoading(isLoading: boolean): void;
}

// 初始化 context，具体的方法在 provider 中实现
export const globalData: IappContext = {
  allData: [],
  activityKey: '天府新区',
  selectedYear: 0,
  isLoading: false,
  userName: '',
  changeUserName (){},
  changeData() {},
  changeActivityKey() {},
  changeSelectedYear() {},
  changeLoading() {}
};

export const AppContext = React.createContext<IappContext>(globalData);
