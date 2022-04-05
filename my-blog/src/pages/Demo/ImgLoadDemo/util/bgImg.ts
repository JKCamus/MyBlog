export const validateImageUrl = (url: string) => {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(url);
    };
    img.onerror = (e: string | Event) => {
      reject(e);
    };
    // promise的状态不可变性，使用setTimeout模拟超时
    const timer = setTimeout(() => {
      clearTimeout(timer);
      reject(new Error('Image Load Timeout'));
    }, 10000);
    img.src = url;
  });
};
