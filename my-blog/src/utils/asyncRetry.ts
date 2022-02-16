/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2022-01-20 08:54:43
 * @LastEditors: camus
 * @LastEditTime: 2022-02-09 18:38:30
 */
import { message } from "antd";

interface RetryConfig {
  delay?: number;
  retryTimes?: number;
  errorMessage?: string;
}

type AsyncRetryType = (asyncRequest: () => Promise<void>, retryConfig?: RetryConfig) => void;

const sleep = (delay: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay);
  });
};

const asyncRetry: AsyncRetryType = async (
  asyncRequest,
  { retryTimes = 3, delay = 300, errorMessage }
) => {
  let retryNum = retryTimes;
  try {
    return await asyncRequest();
  } catch (error) {
    if (--retryNum) {
      await sleep(delay);
      return await asyncRetry(asyncRequest, { retryTimes: retryNum, delay, errorMessage });
    } else {
      errorMessage && message.error(errorMessage);
      throw error;
    }
  }
};

export { asyncRetry };
