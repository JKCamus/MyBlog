// worker 中也是不允许访问 dom 的，但它提供了importScripts 函数用于导入外部脚本，通过它导入 spark-md5
self.importScripts('./spark-md5.min.js'); // 导入脚本

// 生成文件 hash
self.onmessage = (e) => {
  const { chunkList } = e.data;
  const spark = new self.SparkMD5.ArrayBuffer();
  let percentage = 0;
  let count = 0;
  const loadNext = (index) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(chunkList[index].file);
    reader.onload = (e) => {
      count++;
      spark.append(e.target.result);
      if (count === chunkList.length) {
        self.postMessage({
          percentage: 100,
          hash: spark.end(),
        });
        self.close();
      } else {
        percentage += 100 / chunkList.length;
        self.postMessage({
          percentage,
        });
        loadNext(count);
      }
    };
  };
  loadNext(0);
};
