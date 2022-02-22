// 生成抽样hash 异步，废除

import SparkMD5 from "spark-md5";
export const calculateHashSample = async (file) => {
  return new Promise((resolve) => {
    const spark = new SparkMD5.ArrayBuffer();
    const reader = new FileReader();
    // 文件大小
    const size = file.size;
    const offset = 2 * 1024 * 1024;
    const chunks = [file.slice(0, offset)];
    // 前面100K
    let cur = offset;
    while (cur < size) {
      // 最后一块全部加进来
      if (cur + offset >= size) {
        chunks.push(file.slice(cur, cur + offset));
      } else {
        // 中间的 前中后去两个字节
        const mid = cur + offset / 2;
        const end = cur + offset;
        chunks.push(file.slice(cur, cur + 2));
        chunks.push(file.slice(mid, mid + 2));
        chunks.push(file.slice(end - 2, end));
        const percentage = (cur / size) * 100;
        // setTimeout(() => {
        //   setHashPercentage(Math.ceil(percentage));
        // }, 0);
      }
      // 前取两个字节
      cur += offset;
    }
    // 拼接
    reader.readAsArrayBuffer(new Blob(chunks));
    reader.onload = (e) => {
      spark.append(e.target.result);
      resolve(spark.end());
    };
  });
};
