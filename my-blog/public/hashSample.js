// self 就是 window
self.importScripts('./spark-md5.min.js'); // 导入脚本

// 生成文件 hash

self.onmessage = (e) => {
  const file = e.data;

  const spark = new self.SparkMD5.ArrayBuffer();
  const reader = new FileReader();
  const size = file.size;
  const offset = 2 * 1024 * 1024;
  let cur = offset;
  const fileChunkList = [];
  // 读取第一块完整的切片内容
  fileChunkList.push(file.slice(0, cur));
  console.log('res=>',file, )
  console.log('wowowow', file,new Date().getTime())

  while (cur < size) {
    if (cur + offset >= size) {
      fileChunkList.push(file.slice(cur, size));
    } else {
      const mid = cur + offset / 2;
      const end = cur + offset;
      fileChunkList.push(file.slice(cur, cur + 2));
      fileChunkList.push(file.slice(mid, mid + 2));
      fileChunkList.push(file.slice(end - 2, end));
      self.postMessage({ percentage: (cur / size) * 100 });
    }
    cur += offset;
  }
  // 拼接

  // spark.append(file);
  // self.postMessage({
  //   percentage: 100,
  //   hash: spark.end(), // 结束 ArrayBuffer 流，获取计算后的文件 md5
  // });
  reader.readAsArrayBuffer(new Blob(fileChunkList));
  reader.onload = (e) => {
    console.log('eeeee', e.target.result)

    spark.append(e.target.result);
    self.postMessage({
      percentage: 100,
      hash: spark.end(), // 结束 ArrayBuffer 流，获取计算后的文件 md5
    });
    self.close(); // 关闭 worker 线程，线程如果不关闭，则会一直在后台运行着，
  };
};
