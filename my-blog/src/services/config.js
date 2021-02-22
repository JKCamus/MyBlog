// target:"http://192.168.1.102:8000",
// const devBaseURL = "http://192.168.1.102:8000";
// const devBaseURL = "http://192.168.202.219:8000";
// 192.168.194.246

const devBaseURL = "http://47.102.211.145:8086";
// const devBaseURL = "http://192.168.194.246:8000";
const proBaseURL = "http://47.102.211.145:8086";
export const BASE_URL =
  process.env.NODE_ENV === "development" ? devBaseURL : proBaseURL;

export const TIMEOUT = 5000;
