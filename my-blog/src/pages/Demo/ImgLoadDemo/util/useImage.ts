/*
 * @Description:经过协作版本改良后
 * @version:
 * @Author: camus
 * @Date: 2021-11-13 10:11:47
 * @LastEditors: camus
 * @LastEditTime: 2021-12-15 14:50:14
 */
import { useSafeState } from 'ahooks';
import React, { useEffect, useLayoutEffect, useState } from 'react';

const imgPromise = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve();
    i.onerror = reject;
    i.src = src;
  });
};

const promiseFind = (sourceList: string[], imgPromise: (src: string) => Promise<void>): Promise<string> => {
  let done = false;
  return new Promise((resolve, reject) => {
    const queueNext = (src: string) => {
      return imgPromise(src).then(() => {
        done = true;
        resolve(src);
      });
    };

    const firstPromise = queueNext(sourceList.shift() || '');

    sourceList
      .reduce((p, src) => {
        return p.catch(() => {
          if (!done) return queueNext(src);
          return;
        });
      }, firstPromise)
      .catch(reject);
  });
};

const removeBlankArrayElements = (a: string[]) => a.filter((x) => x);

const stringToArray = (x: string | string[]) => (Array.isArray(x) ? x : [x]);

const cache: {
  [key: string]: Promise<string>;
} = {};

export interface useImageParams {
  loadImg?: (src: string) => Promise<void>;
  srcList: string | string[];
}

const useImage = ({
  loadImg = imgPromise,
  srcList,
}: useImageParams): { src: string | undefined; loading: boolean; error: any } => {
  // 此处用到useSafeState 为了防止在数据未到进行渲染，引起warning。
  const [loading, setLoading] = useSafeState(true);
  const [error, setError] = useSafeState(null);
  const [value, setValue] = useSafeState<string | undefined>(undefined);

  const sourceList = removeBlankArrayElements(stringToArray(srcList));
  const sourceKey = sourceList.join('');

  // 此处由原来的useEffect改为useLayoutEffect，原因： 避免虚拟列表中图片或者图片列表加载时的闪动
  useLayoutEffect(() => {
    if (!cache[sourceKey]) {
      cache[sourceKey] = promiseFind(sourceList, loadImg);
    }
    cache[sourceKey]
      .then((src) => {
        setLoading(false);
        setValue(src);
        setError(null);
      })
      .catch((error) => {
        setLoading(false);
        setValue('');
        setError(error);
      });
  }, [sourceKey]);

  return { loading: loading, src: value, error: error };
};
export default useImage;
