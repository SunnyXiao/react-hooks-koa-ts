import * as request from 'superagent';
import * as cheerio from 'cheerio';
import * as util from './index';
import houseModel from '../models/houseModel';
import config from '../config';

interface Ipage {
  successArray: nFang.IhouseData[];
  allLength: number;
}

export const createRequestPromise = (
  pageNo: number
): Promise<nFang.IhouseData[]> => {
  return new Promise(
    (resolve): void => {
      request
        .post(
          `${config.spiderDomain}/lottery/accept/projectList?pageNo=${pageNo}`
        )
        .end(
          (err, result): void => {
            if (err) {
              return;
            }
            const $ = cheerio.load(result.text);
            const trList: string[][] = [];
            $('#_projectInfo>tr').each(
              (i, tr): void => {
                const tdList: string[] = [];
                $(tr)
                  .find('td')
                  .each(
                    (j, td): void => {
                      tdList.push($(td).text());
                    }
                  );
                trList.push(tdList);
              }
            );
            resolve(util.transformArray(trList));
          }
        );
    }
  );
};

const initspider = async (pageStart: number, pageEnd: number) => {
  const allPromises = [];
  for (let i = pageStart; i <= pageEnd; i += 1) {
    allPromises.push(createRequestPromise(i));
  }

  const result = await Promise.all(allPromises).then(
    (posts: nFang.IhouseData[][]): nFang.IhouseData[] => {
      houseModel.addMany(posts[0]);
      return posts[0];
    }
  );
  return result;
};

const spiderPage = async (pageNo: number = 1): Promise<Ipage> => {
  const page: nFang.IhouseData[] = await createRequestPromise(pageNo);
  const promises = page.map(
    (item): Promise<nFang.IhouseData | boolean> =>
      new Promise(
        (resolve): void => {
          resolve(houseModel.add(item));
        }
      )
  );
  const successArray = await Promise.all(promises)
    .then(
      posts => posts.filter((item): boolean => !!item) as nFang.IhouseData[]
    )
    .catch(() => []);
  return {
    successArray,
    allLength: page.length
  };
};

export default {
  initspider,
  spiderPage
};
